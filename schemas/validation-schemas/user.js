const joi = require('@hapi/joi')


userSchema = joi.object({

    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20),
    gender: joi.string().valid('male','female'),
    userName: joi.string().alphanum().min(3).max(20).required(),
    profilePic: joi.string().uri().empty('').default(''), // default avatar url to set here
    totalLikes: joi.number().min(0),
    totalPosts: joi.number().min(0),
    topPosts: joi.array(),
    followersCount: joi.number().min(0),
    followingCount: joi.number().min(0)

})

module.exports = { userSchema }