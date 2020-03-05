const { esClient } = require('./../../conf/elastic-conf');

const getFollowingFeed = (req, res) => {

    return esClient.get({
        index: 'feed',
        id: req._id,
        _source: ['followingPosts']
    }).then((posts) => {
        
        if (!posts._source.followingPosts) {
        // In case followingPosts is not present on user
            return res.status(200).send({ posts: [] });
        }else if(posts._source.followingPosts.length == 0){
        // In case followingPoints length == 0
            return res.status(200).send({ posts: [] });
        }
        return res.status(200).send({posts: posts._source.followingPosts})
        
    }).catch(e => {
        // console.log(e);
        esClient.get({
            index: 'feed',
            id: 'general-feed'
        }).then(data=>{
            return res.status(200).send({ posts: data._source.posts});

        }).catch(e=>{
            return res.status(200).send({ posts: [] });

        })
    });


}

module.exports = { getFollowingFeed }