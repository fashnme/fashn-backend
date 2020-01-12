const { esClient } = require('./../../conf/elastic-conf');

const deleteStory = (req, res) => {

    esClient.delete({
        index: "story",
        id: req.body.storyId
    })
        .then((data) => res.status(200).end())
        .catch(error => console.log("error in deleting story", error))
}

module.exports = {
    deleteStory
}