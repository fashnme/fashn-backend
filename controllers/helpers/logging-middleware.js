const log4js = require('log4js');

const loggingMiddleware = (action, logData) => {

    const body = {
        action: action,
        payload: { ...logData, date: new Date() }
    }

    // Logger configuration
    log4js.configure({
        appenders: { fileAppender: { type: 'file', filename: './../../logs/test.log' } },
        categories: { default: { appenders: ['fileAppender'], level: 'info' } }
    });

    // Create the logger
    const logger = log4js.getLogger();

    // Log a message
    logger.info(JSON.stringify(body));

}