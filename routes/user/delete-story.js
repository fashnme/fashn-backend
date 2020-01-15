const { esClient } = require('./../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const deleteStory = (req, res) => {

    esClient.get({
        index: 'story',
        id: req.body.storyId
    })
        .then(entry => {

            let saveStoryInDump=entry._source
            
            if (entry._source.userId === req._id) {
                esClient.delete({
                    index: 'story',
                    id: req.body.storyId
                })
                    .then(data => { 
                        res.status(200).end() 
                        return loggingMiddleware('delete_story',saveStoryInDump)
                    })
                    .catch(err => { console.log(err); res.status(500).end() })
            }
        })
        .catch(error => console.log("error in deleting story", error))
}

module.exports = {
    deleteStory
}