const { writeStream } = require('./logging-middleware');

const bulkLoggingMiddleware = (activityType, payload) => {

    let bulkLineToLog= ``;
    for(let i=1;i<payload.length;i+=2){
        payload[i].activityType=activityType;
        bulkLineToLog+=`{"create":{}}\n${JSON.stringify({...payload[i]})}\n`;
    }

    writeStream.write(bulkLineToLog);
}

module.exports = {
    bulkLoggingMiddleware
}

