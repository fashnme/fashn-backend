const { esClient } = require('./../../conf/elastic-conf');

const getForYouFeed = (req, res) => {

    return esClient.get({
        index: 'feed',
        id: req._id,
        _source: ['foryouPosts']
    }).then((posts) => {

        if (!posts._source.foryouPosts) {
        // In case forYouPosts is not present on user
        return res.status(200).send({ posts: [] });
        }else if(posts._source.foryouPosts.length == 0){
        // In case forYouPosts length == 0
        return res.status(200).send({ posts: [] });
        }

        return res.status(200).send({posts: posts._source.foryouPosts})

    }).catch(e => {
        esClient.get({
            index: 'feed',
            id: 'general-feed'
        }).then(data=>{
            console.log(data);
            return res.status(200).send({ posts: data._source.posts});

        }).catch(e=>{
            console.log(e)
            return res.status(200).send({ posts: [] });

        })
    });


}

module.exports = { getForYouFeed }