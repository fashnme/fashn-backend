const { esClient } = require('./../../conf/elastic-conf')
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const viewedPost = (req, res) => {

    // viewedPostInfo fetched from request body
    let viewedPostInfo = {
        userId: req._id,
        postId: req.body.postId,
        referrerId: req.body.referrerId,
        timestamp: new Date()
    }

    esClient.create({
        index: 'viewed',
        id: `${likeInfo.userId}.${likeInfo.postId}`,
        body: viewedPostInfo
    }).then(resp => {
        res.status(200).end();
        return loggingMiddleware('viewed_post', viewedPostInfo)
    }).catch(e => {
        return res.status(422).end();
    })

}
module.exports = {
    viewedPost
}