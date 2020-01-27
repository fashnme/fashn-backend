const { esClient } = require('./../../conf/elastic-conf');
const { postDefaultAdditionalSchema } = require('./../../schemas/post-default-schema');

const createPost = (req, res) => {

    // postInfo fetched from request body
    let postInfo = {
        caption: req.body.caption,
        uploadUrl: req.body.uploadUrl,
        userId: req._id,
        mediaType: req.body.mediaType,
        timestamp: new Date()
    }
    
    // Creating body for putting this doc in ES post index
    let postBody = {
        ...postInfo,
        ...postDefaultAdditionalSchema,
    }

    // putting doc in post index
    esClient.index({
        index: 'post',
        body:postBody
    }).then(resp => {

        return res.status(200).json({ ...postBody, _id: resp._id });

    }).catch(err => {
        console.log("error in creating post",err);
        return res.status(401).end();
    })

}
module.exports={
    createPost
}