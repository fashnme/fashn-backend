const { esClient } = require('../../../conf/elastic-conf');
const { postDefaultAdditionalSchema } = require('../../../schemas/post-default-schema');

module.exports={
    
    createPost(req,res){

        // postInfo fetched from request body
        let postInfo = {
            caption: req.body.caption,
            postURL: req.body.postURL,
            userId: req._id
        }

        // Creating body for putting this doc in ES post index
        let postBody = {
            ...postInfo,
            ...postDefaultAdditionalSchema,
        }

        // putting doc in post index
        esClient.index({
            index: 'post',
            postBody
        }).then(resp => {

            return res.status(200).json({ postBody });

        }).catch(err => {
            console.log(err)
            return res.status(401).end();
        })

    }
}