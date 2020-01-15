const joi = require('@hapi/joi')


postSchema = joi.object({
    caption: joi.string().max(256),
    uploadUrl: joi.string().uri().required(),
    userId: joi.string().required(),
    totalLikes: joi.number().min(0),
    totalComments: joi.number().min(0),
    taggedProducts: joi.array()

})

module.exports = { postSchema }