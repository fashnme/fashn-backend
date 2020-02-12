const { esClient } = require('../../conf/elastic-conf');
const { loggingMiddleware } = require('../../controllers/helpers/logging-middleware');

const commentPost = (req, res) => {

    // commentInfo fetched from request body
    let commentInfo = {
        timeStamp: new Date(),
        postId: req.body.postId,
        userId: req._id,
        commentText: req.body.commentText,
        commentImage: req.body.commentImage,
        repliedTo: req.body.repliedComment
    }


    // putting doc in like index 
    esClient.index({
        index: 'comment',
        body: commentInfo
    }).then((data) => {
        
        
        esClient.bulk({
            body: [
                { "update": { "_index": "post", "_id": commentInfo.postId } },
                {
                    "script": {
                        "source": "ctx._source.totalComments++",
                        "lang": "painless"
                    }
                }
            ]
        }).then((data) => {
                res.status(200).end();
                return loggingMiddleware('comment_post', commentInfo);

            }).catch(e => {
                // Error in updating likeCounter
                res.status(401).end();
                // implement rollback here in later versions

            })
    }).catch(error => {
        //Like Already Exists
        console.log(error);
        return res.status(422).end();
    })

}
module.exports = {
    commentPost
}
