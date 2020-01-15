const joi = require('@hapi/joi')


storySchema = joi.object({
    caption: joi.string().max(256),
    uploadUrl: joi.string().uri().required(),
    userId: joi.string().required(),
    totalViews: joi.number().min(0),
    taggedProducts: joi.array()

})

module.exports = { storySchema }