const { esClient } = require('../../conf/elastic-conf');


const getUserLikedPosts = (req, res) => {

    let from = Number(req.body.page - 1) * 18 || 0;
    let userId = req.body.userId;

    if (!userId) {
        return res.status(400).end()
    }

    esClient.search({
        index: 'like',
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
        .then((data) => {
            
            let likedPostIds = data.hits.hits.map(post => post._source.postId);
            

            if(likedPostIds.length === 0){
                return res.status(200).json({posts: []});
            }
            
            esClient.mget({
                index: 'post',
                body: {
                    ids: likedPostIds
                }
            }).then((data) => {
                let posts = data.docs.map((post)=>{
                    return { postId: post._id, ...post._source}
                })

                return res.status(200).json({ posts })
            }).catch((err)=>{
                return res.status(200).json({posts: []});
            })
        })
        .catch((err) => {
            console.log('error getting user posts', err)
            res.status(500).send()
        })

}

module.exports = {
    getUserLikedPosts
}