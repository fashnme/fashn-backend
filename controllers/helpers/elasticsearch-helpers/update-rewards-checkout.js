const { esClient } = require('./../../../conf/elastic-conf');
const { postInfluencerIncomePercentage, productSharingReferralPercentage } = require('./../../../conf/rewards-conf');

const updateRewardsCheckout = (orderId, orderedProducts) => {

    // This body will contain data to add to referral schema from ordered products
    let body = [];
    
    orderedProducts.forEach((product) => {

        let referralType = product.referrerPost ? 'post' : 'product';
        let referralAmount = (product.referrerPost ? (product.productId) * (postInfluencerIncomePercentage) : (product.productId) * (productSharingReferralPercentage));


        body.push({ index: { _index: 'referral' } });
        body.push({
            orderId: orderId,
            productId: product.productId,
            productPrice: product.price,
            referrerId: product.referrerId,
            referrerPost: product.referrerPost,
            referralType: referralType,
            timeStamp: new Date(),
            referralAmount: referralAmount,
            status: 'received'
        });
    });
    // Pushing all products referrals in referral schema using bulk
    esClient.bulk({ body })
        .then(() => {

            let bodyForUserRewardsUpdation = [];
            orderedProducts.forEach((product) => {
                bodyForUserRewardsUpdation.push({ update: { _index: 'user', _id: product.referrerId } });

                if (product.referrerPost) {
                    bodyForUserRewardsUpdation.push({
                        "script": {
                            "source": "ctx._source.rewards.postReferral.pending += params.increment",
                            "lang": "painless",

                            "params": {
                                "increment": (product.price) * postInfluencerIncomePercentage
                            }
                        }
                    });
                } else {
                    bodyForUserRewardsUpdation.push({
                        "script": {
                            "source": "ctx._source.rewards.productReferral.pending += params.increment",
                            "lang": "painless",
                            "params": {
                                "increment": (product.price) * productSharingReferralPercentage
                            }
                        }
                    });
                }


            });

            esClient.bulk({ body: bodyForUserRewardsUpdation })
                .then((data) => { })
                .catch((e) => { });

        });
}

module.exports = {
    updateRewardsCheckout
};

