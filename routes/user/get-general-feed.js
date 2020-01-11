// const { getGeneralFeed } = require('../../controllers/helpers/elasticSearch-helpers/get-general-feed')
const { esClient } = require('./../../conf/elastic-conf');

const getGeneralFeed = (req, res) => {
    return esClient.get({
        index: 'feed',
        id: 'general-feed'
    }).then(postIds => {

            // console.log("sould be an array", postIds._source)

            esClient.mget({
                index: 'post',
                body:{
                    ids:postIds._source.postIds

                }
                

            }).then(posts => {
                console.log("fetched posts using mget" )
                return res.status(200).json({posts})
            }).catch(e=>{
                console.log("error",e);
                res.status(400).end();
            })

        }).catch(e => {
            console.log("error", e)
            res.status(400).end();
        })


}

module.exports = { getGeneralFeed }