const { esClient } = require('../../conf/elastic-conf');
const { getBulkUsers, getBulkPosts, getBulkProducts, getBulkDetails } = require('./../../controllers/helpers/elasticsearch-helpers/get-bulk-details');


const getRewardsList = (req, res) => {

  esClient.search({
    index: 'referral',
    size: 100,
    body: {
      "query": {
        "multi_match": {
          "query": req._id,
          "fields": ["referrerId", "referredUserId"]
        }
      },
      "sort": {
        "timeStamp": {
          "order": "desc"
        }
      }
    }
  })
    .then(async (data) => {

      let referralRewardsArray = data.hits.hits.map((referral) => {
        return { ...referral._source, rewardId: referral._id };
      });

      let idArray = [];

      

      referralRewardsArray.forEach((referral) => {
        if (referral.referralType == 'signup') {
          idArray.push({_index:'user', _id:referral.referrerId});
        } else if (referral.referralType == 'post') {
          idArray.push({_index:'post',_id: referral.referrerPost});
        } else if (referralreferralType == 'product') {
          idArray.push({_index:'product',_id: referral.productId});
        }
      });


      const docs = await getBulkDetails(idArray);

      let finalResponseArray = referralRewardsArray.map((referral, index)=>{
        if(docs[index]._source){
          return {...referral, image: docs[index]._source.profilePic || docs[index]._source.uploadUrl || docs[index]._source.imagesArray[0] || ''}
        }
      });
      
      return res.json({
        referralRewardsArray: finalResponseArray
      });

    })
    .catch((err) => {
      res.status(500).end();
    });

}

module.exports = {
  getRewardsList
};