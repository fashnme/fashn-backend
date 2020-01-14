const { esClient } = require('../../conf/elastic-conf');

const removeFromCollection = (req, res) => {

    esClient.delete({
    index: 'collection',
    id:`${req._id}.${req.body.productId}`
  }).then(resp=>{
      res.status(200).end()
  }).catch(e=>{
      console.log("error in deleting from collection" , e)
      res.status(400).end()
  })

}
module.exports={
    removeFromCollection
}