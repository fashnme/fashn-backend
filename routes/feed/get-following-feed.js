const { esClient } = require('./../../conf/elastic-conf');

const getFollowingFeed = (req, res) => {

    return esClient.get({
        index: 'user',
        id: req._id,
        _source: ['followingPosts']
    }).then((user) => {
        esClient.mget({
            index: 'post',
            body: { ids: ['hkh'] }
        }).then((data) => {
            let posts = data.docs.map(post => { return { postId: post._id, ...post._source } });
            esClient.mget({
                index: 'user',
                body: { ids: data.docs.map(post => post._source.userId) }
            }).then((data) => {
                data.docs.forEach((user, index) => {
                    posts[index]["userPic"] = user["_source"]["profilePic"];
                    posts[index]["userName"] = user["_source"]["userName"];
                });
                return res.status(200).json({ posts });
            }).catch((e) => {
                console.log('error', e);
                return res.status(200).send({ posts: [] });
            });
        }).catch(e => {
            return res.status(500).end();
        });
    }).catch(e => {
        return res.status(400).end();
    });


}

module.exports = { getFollowingFeed }