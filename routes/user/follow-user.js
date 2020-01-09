const { esClient } = require('../../conf/elastic-conf');

const followUser = (req, res) => {

    //userId fetched from req body
    let followInfo = {
        timestamp: Date.now(),
        follower: req._id,
        following: req.body.userId
    }

    esClient.index({
        index: 'follow',
        id: `${followInfo.follower}.${followInfo.following}`,
        body: followInfo
    })
        .then(resp => {
            //updating totalFollowers in ${following} doc in user index
            esClient.update({
                index: 'user',
                id: followInfo.follower,
                body: {
                    "script": {
                        "source": "ctx._source.totalFollowing++",
                        "lang": "painless"
                    }
                }
            }, {
                index: 'user',
                id: followInfo.following,
                body: {
                    "script": {
                        "source": "ctx._source.totalFollowers++",
                        "lang": "painless"
                    }
                }
            })
                .then(data => res.status(200).end())
                .catch(e => {
                    // Error in updating totalFollowers
                    console.log(e);
                    res.status(401).end()
                    // implement rollback here in later versions
                })
        })
        .catch(e => {
            //This follow entry already exists
            console.log(e);
            res.status(422).json("user already exists");
        })
}

module.exports = {
    followUser
}