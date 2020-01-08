const { esClient } = require('./../../conf/elastic-conf');

const unlikePost = (req, res) => {

    // removing doc from like index by querying
    let postId = req.body.postId;
    let userId = req._id;

    esClient.delete({
        index: 'like',
        id: `${userId}.${postId}`
    }).then(resp => {
        // Then updating totalLikes value in post index
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

    }).catch(e => {
        // Like not present
        res.status(404).end()
    })

}
module.exports = {
    unlikePost
}