const { esClient } = require('./../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const likePost = (req, res) => {

    // likeInfo fetched from request body
    let likeInfo = {
        timestamp: new Date(),
        postId: req.body.postId,
        userId: req._id,
        posterId: req.body.posterId
    }


    // putting doc in like index 
    esClient.create({
        index: 'like',
        id: `${likeInfo.userId}.${likeInfo.postId}`,
        body: likeInfo
    }).then((data) => {
      
        esClient.bulk({
            body: [
                { "update": { "_index": "post", "_id": likeInfo.postId } },
                {
                    "script": {
                        "source": "ctx._source.totalLikes++",
                        "lang": "painless"
                    }
                },

                { "update": { "_index": "user", "_id": likeInfo.posterId } },
                {
                    "script": {
                        "source": "ctx._source.totalLikes++",
                        "lang": "painless"
                    }
                }
            ]
        })
            .then((data) => {
                res.status(200).end();
                return loggingMiddleware('like_post', likeInfo);

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
    likePost
}