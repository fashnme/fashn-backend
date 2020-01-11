const { esClient } = require('./../../conf/elastic-conf');

const likePost = (req, res) => {

    // likeInfo fetched from request body
    let likeInfo = {
        likeTimestamp: new Date(),
        postId: req.body.postId,
        userId: req._id,
        active: false
    }


    // putting doc in like index 
    esClient.update({
        index: 'like',
        id: `${likeInfo.userId}.${likeInfo.postId}`,
        body: {
            "script" : {
                "source": "if (ctx._source.active==false) { ctx.timeStamp = params.likeInfo.likeTimeStamp }",
                "lang": "painless",
                "params" : {
                    "likeInfo" : likeInfo
                }
            },
            "upsert" : likeInfo
        }
    }).then(data => {
        // Then updating totalLikes value in post index 
        console.log(data)
        if (data.result === 'updated' ||  data.result === 'created') {
            esClient.update({
                index: 'user',
                id: likeInfo.userId,
                body: {
                    "script": {
                        "source": "ctx._source.totalLikes++",
                        "lang": "painless"
                    }
                }
            }).then(data => {
                console.log("data", data)
                res.status(200).end()
            }).catch(e => {
                console.log("eortt",e)
                // Error in updating likeCounter
                res.status(401).end()
                // implement rollback here in later versions
            })
        }else{
            return res.status(422).end();
        }

    }).catch(e => {
        //Like Already Exists
        return res.status(422).end();
    })

}
module.exports = {
    likePost
}