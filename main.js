const csv = require('csvtojson')
const writeJsonFile = require('write-json-file');

const statesFilePath = './csv/us-states.csv'
const countiesFilePath = './csv/us-counties.csv'

function main() {

    let timeSeriesFilePath = './docs/timeseries.json';
    let timeSeriesCountiesFilePath = './docs/timeseries-counties.json';

    csv().fromFile(statesFilePath)
        .then((jsonObj) => {
            writeJsonFile(timeSeriesFilePath, mapToJSON(convertStatesToMap(jsonObj)));
            console.log("Successfully written JSON to", timeSeriesFilePath, "! :D");
        })

    csv().fromFile(countiesFilePath)
        .then((jsonObj) => {
            writeJsonFile(timeSeriesCountiesFilePath, countyDataMapToJSON(convertCountiesToMap(jsonObj)));
            console.log("Successfully written JSON to", timeSeriesCountiesFilePath, "! :O");
        })
}

function convertStatesToMap(jsonObj) {
    let dataMap = new Map();

    for (let obj of jsonObj) {
        let state = obj.state.toString();

        if (!dataMap.get(state)) {
            dataMap.set(state, []);
        }
        delete obj.state;
        dataMap.get(state).push(obj);
    }
    return dataMap;
}

function convertCountiesToMap(jsonObj) {
    let countyDataMap = new Map();

    for (let obj of jsonObj) {
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

function mapToJSON(map) {
    let obj = {};
    for (let [key, value] of map) {
        obj[key] = value;
    }
    return obj;
}

function countyDataMapToJSON(map) {
    let obj = {};
    for (let [stateKey, countyMap] of map) {
        let countyObj = {};
        for (let [countyKey, countyValue] of countyMap) {
            countyObj[countyKey] = countyValue;
        }
        obj[stateKey] = countyObj;
    }
    return obj;
}

main();