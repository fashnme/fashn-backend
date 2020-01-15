const joi = require('@hapi/joi')


cartSchema = joi.object({

    quantity: joi.number().min(1).required(),
    productId:joi.string().required(),
    userId: joi.string().required(),
    timeStamp: joi.date().timestamp().required()

})

module.exports = { cartSchema }