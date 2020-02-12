const { esClient } = require('./../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const unlikePost = (req, res) => {

    // removing doc from like index by querying
    let postId = req.body.postId;
    let posterId = req.body.posterId;
    let userId = req._id;
    let id = `${userId}.${postId}`;

    esClient.delete({
        index: 'like',
        id
    }).then(resp => {
        // Then updating totalLikes value in post index
        let toDump = {
            timeStamp: new Date(),
            postId,
            posterId,
            userId
        }
        // esClient.update({
        //     index: 'post',
        //     id: postId,
        //     body: {
        //         "script": {
        //             "source": "ctx._source.totalLikes--",
        //             "lang": "painless"
        //         }
        //     }
        // })
        esClient.bulk({
            body: [
                { "update": { "_index": "post", "_id": postId } },
                {
                    "script": {
                        "source": "ctx._source.totalLikes--",
                        "lang": "painless"
                    }
                },

                { "update": { "_index": "user", "_id": posterId } },
                {
                    "script": {
                        "source": "ctx._source.totalLikes--",
                        "lang": "painless"
                    }
                }
            ]
        })
            .then(data => {
                res.status(200).end()
                return loggingMiddleware('unlike_post', toDump)
            }).catch(e => {
                res.status(401).end()
                // implement rollback here in later versions
            })

    }).catch(e => {
        // Like not present
        console.log(e);
        res.status(404).end();
    })

}
module.exports = {
    unlikePost
}