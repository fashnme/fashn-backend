const fs = require('fs');
const path = require('path');
const writeStream = fs.createWriteStream(path.join(__dirname, './../../logs.json'), { 'flags': 'a' });

const loggingMiddleware = (activityType, payload) => {

    const lineToLog = {
        activityType,
        ...payload
    };

    writeStream.write(`{ "create" : { } }\n${JSON.stringify(lineToLog)}\n`);
}

module.exports = {
    loggingMiddleware
}

