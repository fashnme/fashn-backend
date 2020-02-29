const { esClient } = require('../../conf/elastic-conf');


const getRewardsList = (req, res) => {

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

      let referralRewardsArray = data.hits.hits.map((referral)=>{
        return {...referral._source, rewardId: referral._id };
      });

      return res.json({
        referralRewardsArray
      });

    })
    .catch(err => {
        res.status(400).end();
    })

}

module.exports = {
    getRewardsList
};