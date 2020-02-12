const { esClient } = require('./../../conf/elastic-conf');
const { storyDefaultAdditionalSchema } = require('./../../schemas/story-default-schema');

const createStory = (req, res) => {

    // storyInfo fetched from request body
    let storyInfo = {
        caption: req.body.caption,
        uploadUrl: req.body.uploadUrl,
        userId: req._id,
        timeStamp:new Date()
    }

    // Creating body for putting this doc in ES story index
    let storyBody = {
        ...storyInfo,
        ...storyDefaultAdditionalSchema,
    }

    // putting doc in story index
    esClient.index({
        index: 'story',
        body: storyBody
    }).then((data) => {
        return res.status(200).json({ ...storyBody, _id: data._id });
    }).catch(err => {
        console.log("error in creating story", err)
        return res.status(401).end();
    })

}
module.exports = {
    createStory
}