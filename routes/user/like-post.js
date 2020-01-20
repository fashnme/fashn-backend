const { esClient } = require('./../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');
const { sendNotification } = require('./../../controllers/helpers/sendNotification')
const likePost = (req, res) => {

    // likeInfo fetched from request body
    let likeInfo = {
        timestamp: new Date(),
        postId: req.body.postId,
        posterId:req.body.posterId,
        userId: req._id
    }


    // putting doc in like index 
    esClient.create({
        index: 'like',
        id: `${likeInfo.userId}.${likeInfo.postId}`,
        body: likeInfo
    }).then(resp => {
        // Then updating totalLikes value in post index
        esClient.update({
            index: 'post',
            id: likeInfo.postId,
            body: {
                "script": {
                    "source": "ctx._source.totalLikes++",
                    "lang": "painless"
                }
            }
        }).then(data => {
            res.status(200).end();
            return loggingMiddleware('like_post', likeInfo);

        }).catch(e => {
            // Error in updating likeCounter
            res.status(401).end();
            // implement rollback here in later versions

        })
    }).catch(e => {
        //Like Already Exists
        return res.status(422).end();
    })

}
module.exports = {
    likePost
}