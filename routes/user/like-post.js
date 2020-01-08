const { esClient } = require('../../../conf/elastic-conf');

module.exports={
    
    likePost(req,res){

        // likeInfo fetched from request body
        let likeInfo = {
            timestamp: new Date(),
            postId: req.body.postId,
            userId: req._id
        }

        // putting doc in like index 
        esClient.index({
            index: 'likes',
            likeBody
        }).then(resp => {

            esClient.update({   // and then updating totalLikes value in post index 
            index: 'post',
            id: postInfo.postId,
            body: {
                "script" : {
                    "source": "ctx._source.totalLikes += increment",
                    "lang": "painless",
                    "params" : {
                        "increment" : 1
                    }
                }
            }
            }).then(data=>{
                res.status(200).end()
            }).catch(e=>{
                res.status(401).end()
                // implement rollback here in later versions
            })

        }).catch(err => {
            return res.status(401).end();
        })

    }
}