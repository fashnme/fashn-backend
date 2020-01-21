const { esClient } = require('./../../conf/elastic-conf');

const getForYouFeed = (req, res) => {

    return esClient.get({
        index: 'user',
        id: req._id,
        _source: ['forYouPosts']
    }).then((user) => {

        if (!user._source.forYouPosts) {
        // In case forYouPosts is not present on user
        return res.status(200).send({ posts: [] });
        }else if(user._source.forYouPosts.length == 0){
        // In case forYouPosts length == 0
        return res.status(200).send({ posts: [] });
        }

        esClient.mget({
            index: 'post',
            body: { ids: user._source.forYouPosts }
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
                return res.status(500).end();
            });
        }).catch(e => {
            return res.status(500).end();
        });
    }).catch(e => {
        return res.status(400).end();
    });


}

module.exports = { getForYouFeed }