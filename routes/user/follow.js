const { esClient } = require('../../conf/elastic-conf');

const follow = (req, res) => {

    //userId fetched from req body
    let followInfo = {
        timestamp: Date.now(),
        follower: req.body.userId,
        following: req._id
    }

    esClient.create({
        index: 'follow',
        id: `${followInfo.follower}.${followInfo.following}`,
        body: followInfo
    })
        .then(resp => {
            //updating totalFollowers in ${following} doc in user index
            esClient.update({
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
                    res.status(401).end()
                    // implement rollback here in later versions
                })
        })
        .then(resp => {
            //updating totalFollowing in ${followers} doc in user index
            esClient.update({
                index: 'user',
                id: followInfo.follower,
                body: {
                    "script": {
                        "source": "ctx._source.totalFollowing++",
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
        .then(resp => {
            res.send(200).json("user followed sucessfully")
        })
        .catch(e => {
            //This follow entry already exists
            return res.status(422).end();
        })
}