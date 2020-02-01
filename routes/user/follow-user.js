const { esClient } = require('../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const followUser = (req, res) => {

    if(req._id == req.body.userId){
        return res.status(400).send({error:'cannot follow self'});
    }

    //userId fetched from req body
    let followInfo = {
        timestamp: new Date(),
        follower: req._id,
        following: req.body.userId,
    }

    esClient.create({
        index: 'follow',
        id: `${req._id}.${req.body.userId}`,
        body: followInfo
    })
        .then((data) => {
            //updating totalFollowers in ${following} doc in user index

            esClient.bulk({
                body: [
                    { "update": { "_index": "user", "_id": followInfo.follower } },
                    {
                        "script": {
                            "source": "ctx._source.followingCount++",
                            "lang": "painless"
                        }
                    },

                    { "update": { "_index": "user", "_id": followInfo.following } },
                    {
                        "script": {
                            "source": "ctx._source.followersCount++",
                            "lang": "painless"
                        }
                    }
                ]
            })
                .then(data => {
                    res.status(200).end()
                    return loggingMiddleware('follow_user',followInfo)
                })
                .catch(e => {
                    // Error in updating totalFollowers
                    console.log(e);
                    res.status(401).end();
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