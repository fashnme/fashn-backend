const joi = require('@hapi/joi')


collectionSchema = joi.object({

    collectionName: joi.string().max(20).required(),
    postId:joi.string().required(),
    userId: joi.string().required(),
    timeStamp: joi.date().timestamp().required()

})

module.exports = { collectionSchema }