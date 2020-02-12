const { esClient } = require('./../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const undislikePost = (req, res) => {

    // removing doc from dislike index by querying
    let postId = req.body.postId;
    let userId = req._id;
    let id = `${userId}.${postId}`;

    esClient.delete({
        index: 'dislike',
        id
    }).then(resp => {
        // Then updating totalLikes value in post index
        let toDump = {
            timeStamp: new Date(),
            postId: req.body.postId,
            userId: req._id
        }
        res.status(200).end()
        return loggingMiddleware('undislike_post', toDump)

    }).catch(e => {
        // disLike not present
        res.status(404).end()
    })

}
module.exports = {
    undislikePost
}