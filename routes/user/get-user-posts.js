const { esClient } = require('../../conf/elastic-conf');


const getUserPosts = (req, res) => {

    let from = Number(req.query.page-1)*18 || 0;
    let userId = req.query.userId;

    if (!userId) {
        return res.status(400).end()
    }

    esClient.search({
        index: 'post',
        size: 18,
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