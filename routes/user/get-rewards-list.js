const { esClient } = require('../../conf/elastic-conf');
const { getBulkDetails } = require('./../../controllers/helpers/elasticsearch-helpers/get-bulk-details');


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
        let index = referral.referralType == 'signup' ? 'user': referral.referralType;
        idArray.push({_index: index, _id: referral.referrerPost || referral.productId || referral.userId })
      });


      const docs = await getBulkDetails(idArray);

      let finalResponseArray = referralRewardsArray.map((referral, index)=>{
        
        if (referral.referralType == 'signup') {
          let { profilePic, firstName } = docs[index]._source;
          return {...referral, image: profilePic, message: `You earned +${referral.referralAmount} Credits for referring ${firstName}`}
        } else if (referral.referralType == 'post') {
          let { uploadUrl } = docs[index]._source;
          return {...referral, image: uploadUrl, message: `You earned +${referral.referralAmount} for Post Referral`}
        } else if (referralreferralType == 'product') {
          let productImage = docs[index]._source.imagesArray[0];
          return {...referral, image: productImage, message: `You earned +${referral.referralAmount} for Product ${title} Referral`}
        }
      });

      let rewards = {};
      
      await esClient.get({
        index: 'user',
        id: req._id
      }).then((data)=>{
        rewards = data._source.rewards;
      })
      return res.json({
        rewards: rewards,
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