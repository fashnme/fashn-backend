const { esClient } = require('../../conf/elastic-conf');

const unfollowUser = (req, res) => {

    esClient.get({
        index: 'follow',
        id: `${req._id}.${req.body.userId}`
    })
        .then(entry => {

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
                    },
                    {
                        "delete": {
                            "_index": "follow",
                            "_id": `${req._id}.${req.body.userId}`
                        }
                    }
                ]
            }).then(data => res.status(200).end())
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