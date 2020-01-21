const { esClient } = require('./../../conf/elastic-conf')
const { bulkLoggingMiddleware } = require('../../controllers/helpers/bulk-logging-middleware');

const viewedPosts = (req, res) => {

    let body = []

    req.body.viewedPostArray.forEach(ele => {
        ele.userId=req._id
        body.push({create: { _id: `${ele.userId}.${ele.postId}`}})
        body.push({...ele})
    })

    esClient.bulk({
        index:'viewed',
        body
      }).then((data)=>{
        res.status(200).end();
        return bulkLoggingMiddleware('viewed_post',body)
      }).catch(e=>{
          console.log('error',e);
      })

}
module.exports = {
    viewedPosts
}