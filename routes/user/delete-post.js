const { esClient } = require('../../conf/elastic-conf');

const deletePost = (req, res) => {

    esClient.get({
        index: 'post',
        id: req.body.postId
    })
        .then(entry => {
            console.log(entry)
            if (entry._source.userId === req._id) {
                esClient.delete({
                    index: 'post',
                    id: req.body.postId
                })
                    .then(data => res.status(200).end())
                    .catch(err => { console.log(err); res.status(500).end() })
            }
        })
        .catch(error => console.log("error in deleting post", error))
}

module.exports = {
    deletePost
}