const { admin } = require('../../fcm')

const sendNotification = (registrationToken, msg) => {
    let message = {
        data: msg,
        token: registrationToken
    }
    return admin.messaging().send(message)
}

module.exports = { sendNotification }
