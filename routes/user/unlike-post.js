const { esClient } = require('../../../conf/elastic-conf');

module.exports={
    
    unlikePost(req,res){

        // removing doc from like index by querying
        
        postId=req.body.postId

        esClient.deleteByQuery({
        index: 'likes',
        body:{
            "query":{
                "match":{
                    "postId":postId
                }
            }
        }
        }).then(resp=>{

            esClient.update({   // and then updating totalLikes value in post index 
            index: 'post',
            id: postId,
            body: {
                "script" : {
                    "source": "ctx._source.totalLikes -= decrement",
                    "lang": "painless",
                    "params" : {
                        "decrement" : 1
                    }
                }
            }
            }).then(data=>{
                res.status(200).end()
            }).catch(e=>{
                res.status(401).end()
                // implement rollback here in later versions
            })

        }).catch(e=>{
            
            res.status(401).end()
        })

    }
}