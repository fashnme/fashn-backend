const { esClient } = require('../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const unfollowUser = (req, res) => {

    esClient.delete({
        index: 'follow',
        id: `${req._id}.${req.body.userId}`
    })
        .then(entry => {

            let toDump = {
                timestamp: new Date(),
                follower: req._id,
                following: req.body.userId
            }

            esClient.bulk({
                body: [
                    { "update": { "_index": "user", "_id": req._id } },
                    {
                        "script": {
                            "source": "ctx._source.followingCount--",
                            "lang": "painless"
                        }
                    },

                    { "update": { "_index": "user", "_id": req.body.userId } },
                    {
                        "script": {
                            "source": "ctx._source.followersCount--",
                            "lang": "painless"
                        }
                    }
                ]
            }).then(data => {
                res.status(200).end()
                return loggingMiddleware('unfollow_user', toDump)
            })
                .catch(e => {
                    // Error in updating
                    console.log(e, undefined, 2);
                    res.status(401).end();
                    // implement rollback here in later versions
                })
        })
        .catch(e => {
            //entry not present in follow index
            console.log(e, undefined, 2);
            res.status(404).end();
        })
}

module.exports = {
    unfollowUser
}