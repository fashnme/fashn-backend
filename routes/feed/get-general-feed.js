const { esClient } = require('./../../conf/elastic-conf');

const getGeneralFeed = (req, res) => {

    return esClient.get({
        index: 'feed',
        id: 'general-feed'
    }).then((data)=>{
        return res.status(200).json({
            posts: data._source.posts
        })
    }).catch(e=>{
        return res.status(500);
    });


}

module.exports = { getGeneralFeed }
