const { esClient } = require('./../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const dislikePost = (req, res) => {

    // dislikeInfo fetched from request body
    let dislikeInfo = {
        timeStamp: new Date(),
        postId: req.body.postId,
        posterId:req.body.posterId,
        userId: req._id
    }


    // putting doc in dislike index 
    esClient.create({
        index: 'dislike',
        id: `${dislikeInfo.userId}.${dislikeInfo.postId}`,
        body: dislikeInfo
    }).then(resp => {
        res.status(200).end();
        return loggingMiddleware('dislike_post', dislikeInfo);
    }).catch(e => {
        //disLike Already Exists
        return res.status(422).end();
    })

}
module.exports = {
    dislikePost
}