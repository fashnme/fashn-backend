const { esClient } = require('../../conf/elastic-conf');


const getRewardsList = (req, res) => {


console.log(req._id);
    esClient.search({
        index:'referral',
        body: {
            "query": {
              "multi_match" : {
                "query": req._id,
                "fields": [ "referrerId", "referreredId" ] 
              }
            }
          }
    })
    .then(data => {
        console.log(req._id)
        console.log(data.hits.hits)
        res.end();

    })
    .catch(err => {
        console.log('error getting user rewards list', err)
        res.status(400).end()
    })

}

module.exports = {
    getRewardsList
}