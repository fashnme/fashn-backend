const { esClient } = require('../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');


const removeFromCollection = (req, res) => {

    let toDump={
        postId: req.body.postId,  
        userId: req._id,
        timeStamp: new Date()
    }

    esClient.delete({
    index: 'collection',
    id
  }).then(resp=>{
      res.status(200).end()
      return loggingMiddleware('remove_from_collection', toDump);

  }).catch(e=>{
      console.log("error in deleting from collection" , e)
      res.status(400).end()
  })

}
module.exports={
    removeFromCollection
}