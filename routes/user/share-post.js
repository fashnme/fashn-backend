const { esClient } = require('../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

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
        let saveShareInDump={ _id: resp._id, ...sharePostInfo }
        
        res.status(200).json(saveShareInDump);
        return loggingMiddleware('share_post',saveShareInDump)
    }).catch(err => {
        console.log("error in creating entry in share",err)
        return res.status(401).end();
    })

}
module.exports={
    sharePost
}