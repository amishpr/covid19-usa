const csv = require('csvtojson')
const writeJsonFile = require('write-json-file');

const csvFilePath = './cvs/us-states.csv'

function main() {
    csv().fromFile(csvFilePath)
        .then((jsonObj) => {
            writeJsonFile('./docs/timeseries.json', mapToJSON(convertToMap(jsonObj)));
        })
}

function convertToMap(jsonObj) {
    let dataMap = new Map();

    for (let obj of jsonObj) {
        for (let [key, value] of Object.entries(obj)) {
            if (key === 'state') {
                if (!dataMap.get(value)) {
                    dataMap.set(value, []);
                }
                delete obj.state;
                dataMap.get(value).push(obj);
            }
        }
    }
    return dataMap;
}

function mapToJSON(map) {
    let obj = {};
    for (let [key, value] of map) {
        obj[key] = value;
    }
    return obj;
}

main();