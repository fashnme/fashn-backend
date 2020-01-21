const path = require('path');
const fs = require('fs');
const rl = require('readline');

const schedule = require('node-schedule');

const { esClient } = require('../../../conf/elastic-conf');

const pathName = path.join(__dirname, `./../../../logs.json`);


const logsDumpingTask = () => {
    const rule = new schedule.RecurrenceRule();

    rule.minute = new schedule.Range(0, 59, 1);

    schedule.scheduleJob(rule, function () {
        const readableStream = fs.createReadStream(pathName);

        const lineReader = rl.createInterface({
            input: readableStream
        });

        let body = [];

        lineReader.on('line', function (line) {
            body.push(JSON.parse(line));
        });

        lineReader.on('close', function () {

            if (body.length != 0) {
                esClient.bulk({ index: 'dump', body })
                    .then((data) => {
                        fs.writeFile(pathName, '', function (err, data) {
                            if (!err) {
                                //File Cleared & Ready for updation
                            }
                        });
                    })
                    .catch((err) => {
                        console.log('err', err);
                    })
            }
        });
    });
}


module.exports = {
    logsDumpingTask
}