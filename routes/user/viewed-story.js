const { esClient } = require('./../../conf/elastic-conf')
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const viewedStory = (req, res) => {

    // viewedStoryInfo fetched from request body
    let viewedStoryInfo = {
        userId: req._id,
        storyId: req.body.storyId,
        timestamp: new Date()
    }

    esClient.create({
        index: 'viewed',
        id: `${viewedStoryInfo.userId}.${viewedStoryInfo.storyId}`,
        body: viewedStoryInfo
    }).then(resp => {
        res.status(200).end();
        return loggingMiddleware('viewed_story', viewedStoryInfo)
    }).catch(e => {
        return res.status(422).end();
    })

}
module.exports = {
    viewedStory
}