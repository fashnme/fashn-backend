const { esClient } = require('./../../conf/elastic-conf');

const unlikePost = (req, res) => {

    // removing doc from like index by querying
    let postId = req.body.postId;
    let userId = req._id;

    esClient.update({
        index: 'like',
        id: `${userId}.${postId}`,
        body: {
            "doc": {
                "active": false,
                "timestamp": new Date()
            }
        }
    }).then(data => {
        // Then updating totalLikes value in post index
        if (data.result === "updated") {
            esClient.update({
                index: 'post',
                id: postId,
                body: {
                    "script": {
                        "source": "ctx._source.totalLikes--",
                        "lang": "painless"
                    }
                }
            }).then(data => {
                res.status(200).end()
            }).catch(e => {
                res.status(401).end()
                // implement rollback here in later versions
            })
        }

    }).catch(e => {
        // Like not present
        res.status(404).end()
    })

}
module.exports = {
    unlikePost
}