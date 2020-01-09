const { esClient } = require('../../conf/elastic-conf');

const unfollowUser = (req, res) => {

    esClient.search({
        //i dont remember the exact search body syntax
        index: 'follow',
        body: {
            "query": {
                "term": {
                    follower: req._id,
                    following: req.body.userId
                }
            }
        }
    })
        .then(entry => {
            //move this entry to archive
        })
        .then(resp => {
            //decrementing totalFollowing from ${req._id} in user index
            esClient.update({
                index: 'user',
                id: req._id,
                body: {
                    "script": {
                        "source": "ctx._source.totalFollowing--",
                        "lang": "painless"
                    }
                }
            })
                .then(data => res.status(200).end())
                .catch(e => {
                    // Error in updating totalFollowing
                    res.status(401).end()
                    // implement rollback here in later versions
                })
        })
        .catch(e => {
            //searching failed
            res.satus(500).end()
        })

}

module.exports = {
    unfollowUser
}