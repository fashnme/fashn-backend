const { esClient } = require('./../../conf/elastic-conf');

// add stories of this user when sending profile data...TODO

const getUserProfile = (req, res) => {

    let body = {
        sort: [{ timestamp: { "order": "desc" } }],
        query: {
            match: {
                userId: req.body.userId
            }
        }
    }

    esClient.get({
        index: 'user',
        _source: ['firstName', 'lastName', 'gender', 'profilePic', 'totalLikes', 'followersCount', 'followingCount', 'userName'],
        id: req.body.userId
    }).then((data) => {

        let userDetails = data._source;

        esClient.search({
            index: ['post'],
            size: 18,
            body
        }).then((data) => {
            
            let recentPosts = data.hits.hits.map(ele => ele._id);

            esClient.search({
                index: ['like'],
                size: 18,
                body
            }).then(data => {
                
                let recentLikedPosts = data.hits.hits.map(ele => ele._id);

                return res.status(200).json({
                    user: { ...userDetails, recentPosts, recentLikedPosts }
                })
            })
            .catch(e => {
                return res.status(500).send(`Server Error`);
            });
        })
        .catch(e=>{
            return res.status(500).send(`Server Error`);
        })
    }).catch(e=>{
        return res.status(500).send(`Server Error`);
    });






}
module.exports = {
    getUserProfile
}