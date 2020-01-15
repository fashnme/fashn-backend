const { esClient } = require('../../conf/elastic-conf');

const sharePost = (req, res) => {

    // sharePostInfo fetched from request body
    let sharePostInfo = {
        postId:req.body.postId,
        sharePlatform: req.body.sharePlatform,
        userId: req._id,
        timeStamp: new Date()
    }

    // putting doc in sharePost index
    esClient.index({
        index: 'share',
        body:sharePostInfo
    }).then(resp => {

        return res.status(200).json({ _id: resp._id, ...sharePostInfo });

    }).catch(err => {
        console.log("error in creating entry in share",err)
        return res.status(401).end();
    })

}
module.exports={
    sharePost
}