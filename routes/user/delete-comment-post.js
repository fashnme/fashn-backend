const { esClient } = require('./../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const deleteCommentPost = (req, res) => {

    // removing doc from like index by querying
    let postId = req.body.postId;
    let userId = req._id;
    let commentId = req.body.commentId;

    esClient.delete({
        index: 'comment',
        id: commentId
    }).then((data) => {
        // Then updating totalComment value in post index
        let toDump = {
            timeStamp: new Date(),
            postId,
            commentId,
            userId
        };

        esClient.bulk({
            body: [
                { "update": { "_index": "post", "_id": postId } },
                {
                    "script": {
                        "source": "ctx._source.totalComments--",
                        "lang": "painless"
                    }
                }
            ]
        })
            .then(data => {
                res.status(200).end()
                return loggingMiddleware('delete_comment_post', toDump)
            }).catch(e => {
                res.status(401).end()
                // implement rollback here in later versions
            })

    }).catch(e => {
        // CommentId not present
        console.log(e);
        res.status(404).end();
    })

}
module.exports = {
    deleteCommentPost
}