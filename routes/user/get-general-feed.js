const { esClient } = require('./../../conf/elastic-conf');

const getGeneralFeed = (req, res) => {

    return esClient.get({
        index: 'feed',
        id: 'general-feed'
    }).then((postIds) => {
        esClient.mget({
            index: 'post',
            body: { ids: postIds._source.postIds }
        }).then((data) => {
            let posts = data.docs.map(post => { return { postId: post._id, ...post._source } });

            esClient.mget({
                index: 'user',
                body: { ids: data.docs.map(post => post.userId) }
            }).then((data) => {
                posts = data.docs.map(postIds => { return { postId: post._id, ...post._source } });
            })
            return res.status(200).json({ posts })
        }).catch(e => {
            res.status(400).end();
        });
    }).catch(e => {
        console.log("error", e);
        res.status(400).end();
    });


}

module.exports = { getGeneralFeed }