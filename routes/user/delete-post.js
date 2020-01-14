const { esClient } = require('../../conf/elastic-conf');

const deletePost = (req, res) => {

    // esClient.delete({
    //     index: "post",
    //     id: req.body.postId
    // })
    //     .then((data) => res.status(200).end())
    //     .catch(error => console.log("error in deleting post", error))
}

module.exports = {
    deletePost
}