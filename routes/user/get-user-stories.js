const { esClient } = require('../../conf/elastic-conf');

const getUserStories = (req, res) => {

    return esClient.search({
        index: 'story',
        body: {
            "query": {
                "match": {
                    userId: req.body.userId
                }
            }
        }
    }).then(data => {
        const stories = data.hits.hits.map(story => {
            return {
                storyId: story._id, ...story._source
            }
        })
        res.status(200).json({ stories })
    }).catch(err => {
        console.log('error getting user stories', err)
        res.status(500).end()
    })


}

module.exports = { getUserStories }