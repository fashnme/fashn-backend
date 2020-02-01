const { esClient } = require('../../conf/elastic-conf');


const getUserStory = (req, res) => {

    esClient.get({
        index: 'story',
        id:req.body.storyId
    })
    .then(data => {
        // console.log(data)
        res.json({storyId: req.body.storyId, ...data._source})

    })
    .catch(err => {
        console.log('error getting user story', err)
        res.status(500).send()
    })

}

module.exports = {
    getUserStory
}