const { esClient } = require('../../conf/elastic-conf');


const getUserPosts = (req, res) => {

    let offset = 18
    let from = Number(req.body.page-1)*offset || 0;
    let userId = req.body.userId;

    if (!userId) {
        return res.status(400).end();
    }

    esClient.search({
        index: 'post',
        size: offset,
        from,
        body: {
            "query": {
                "match": {
                    userId
                }
            }
        }
    })
        .then(data => {
            const posts = data.hits.hits.map(post => {
                return {
                    postId: post._id, ...post._source
                }
            })
            res.status(200).json({ posts })
        })
        .catch(err => {
            console.log('error getting user posts', err)
            res.status(500).send()
        })

}

module.exports = {
    getUserPosts
}