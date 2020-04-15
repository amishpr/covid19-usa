// Imports
const csv = require('csvtojson');
const writeJsonFile = require('write-json-file');

// File paths
const statesFilePath = './csv/us-states.csv'
const countiesFilePath = './csv/us-counties.csv'
const timeSeriesFilePath = './docs/timeseries.json';
const timeSeriesCountiesFilePath = './docs/timeseries-counties.json';

/**
 * Main function to call other functions
 *
 * @return null
 */
async function main() {

    let stateObjects = await csv().fromFile(statesFilePath);
    writeJsonFile(timeSeriesFilePath, mapToJSON(convertStatesToMap(stateObjects)));
    console.log("Successfully written JSON to", timeSeriesFilePath, "! :D");

    let countyObjects = await csv().fromFile(countiesFilePath);
    writeJsonFile(timeSeriesCountiesFilePath, countyDataMapToJSON(convertCountiesToMap(countyObjects)));
    console.log("Successfully written JSON to", timeSeriesCountiesFilePath, "! :O");
}

/**
 * Converts stateObjects into a JavaScript Map()
 *
 * @param {Array.<{date: Date, state: string, fips: number, cases: number, deaths: number}>} stateObjects - An array of objects
 * @return {Map.<{state: string, value: Array.<{date: Date, fips: number, cases: number, deaths: number}>}>}
 */
function convertStatesToMap(stateObjects) {
    let dataMap = new Map();

    for (let obj of stateObjects) {
        let state = obj.state.toString();

        if (!dataMap.get(state)) {
            dataMap.set(state, []);
        }
        delete obj.state;
        dataMap.get(state).push(obj);
    }
    return dataMap;
}

/**
 * Converts countyObjects into a JavaScript Map()
 *
 * @param {Array.<{date: Date, county: string, state: string, fips: number, cases: number, deaths: number}>} countyObjects - An array of objects
 * @return {Map.<{state: string, value: Map.<{county: string, value: Array.<{date: Date, fips: number, cases: number, deaths: number}>}>}>}
 */
function convertCountiesToMap(countyObjects) {
    let countyDataMap = new Map();

    for (let obj of countyObjects) {
        let state = obj.state.toString();
        let county = obj.county.toString();

        if (!countyDataMap.get(state)) {
            countyDataMap.set(state, new Map().set(county, []));
        }
        if (!countyDataMap.get(state).get(county)) {
            countyDataMap.set(state, countyDataMap.get(state).set(county, []))
        }

        delete obj.state;
        delete obj.county;

        countyDataMap.get(state).get(county).push(obj);
    }
    return countyDataMap;
}

/**
 * Converts any standard JavaScript map into an Object of objects (JSON)
 *
 * @param {Map} map - Any standard JavaScript map
 * @return {Object.<{Object}>}
 */
function mapToJSON(map) {
    let obj = {};
    for (let [key, value] of map) {
        obj[key] = value;
    }
    return obj;
}

/**
 * Converts a countyDataMap into an Object of objects (JSON)
 *
 * @param {Map.<{state: string, value: Map.<{county: string, value: Array.<{date: Date, fips: number, cases: number, deaths: number}>}>}>} countyDataMap - An complex nested map
 * @return {Object.<{Object}>}
 */
function countyDataMapToJSON(countyDataMap) {
    let obj = {};
    for (let [stateKey, countyMap] of countyDataMap) {
        let countyObj = {};
        for (let [countyKey, countyValue] of countyMap) {
            countyObj[countyKey] = countyValue;
        }
        obj[stateKey] = countyObj;
    }
    return obj;
}

// Call main function
main().then(() => console.log("~ DONE!"));