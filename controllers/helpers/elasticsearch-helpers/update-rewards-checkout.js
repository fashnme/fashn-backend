const { esClient } = require('./../../../conf/elastic-conf');
const { postInfluencerIncomePercentage, productSharingReferralPercentage } = require('./../../../conf/rewards-conf');

const updateRewardsCheckout = (orderId, orderedProducts) => {

    let body = [];

    orderedProducts.forEach((product) => {

        let referralType = product.referrerPost ? 'product' : 'post';

        body.push({ index: { _index: 'referral' } });
        body.push({
            orderId: orderId,
            productId: product.productId,
            productPrice: product.price,
            referrerId: product.referrerId,
            referrerPost: product.referrerPost,
            referralType: referralType,
            timeStamp: new Date(),
            status: 'received'
        });
    });
    // Pushing all products referrals in referral schema using bulk
    esClient.bulk({ body })
        .then(() => {
            
            let bodyForUserRewardsUpdation = [];
            

            orderedProducts.forEach((product) => {
                bodyForUserRewardsUpdation.push({update: { _index: 'user', _id: product.referrerId } });

                if(product.referrerPost){
                    bodyForUserRewardsUpdation.push({
                        "script": {
                            "source": "ctx._source.rewards.postReferral.pending += params.increment",
                            "lang": "painless",
                            "params": {
                                "increment": (product.price)*postInfluencerIncomePercentage
                            }
                        }
                    });
                }else{
                    bodyForUserRewardsUpdation.push({
                        "script": {
                            "source": "ctx._source.rewards.productReferral.pending += params.increment",
                            "lang": "painless",
                            "params": {
                                "increment": (product.price)*productSharingReferralPercentage
                            }
                        }
                    });
                }
                
            });

        });
}

module.exports = {
    updateRewardsCheckout
};

