const { esClient } = require('./../../../conf/elastic-conf');
const { signupReferralIncomeAmount } = require('./../../../conf/rewards-conf');

const signupRewardsReferral = (referrerId, userId) => {

    // Body of Referral
    let referralBody = {
        timeStamp: new Date(),
        userId,
        referrerId,
        referralType: 'signup',
        referralAmount: signupReferralIncomeAmount,
        referredUserId:userId
    };

    // Create Referral Document
    return esClient.create({
        index: 'referral',
        id: `${referrerId}.${userId}`,
        body: referralBody
    }).then(() => {

        // Updating referrerUser referral Rewards
        return esClient.update({
            index: "user",
            id: referrerId,
            body: {
                "script": {
                    "source": "ctx._source.rewards.signupReferral.available += params.increment",
                    "lang": "painless",
                    "params": {
                        "increment": signupReferralIncomeAmount
                    }
                }
            }
        }).then((data) => {

            //Successfully updated rewards of referrerUser


            //Now Updating newUser referral Rewards
            return esClient.update({
                index: "user",
                id: userId,
                body: {
                    "script": {
                        "source": "ctx._source.rewards.signupReferral.available += params.increment",
                        "lang": "painless",
                        "params": {
                            "increment": signupReferralIncomeAmount
                        }
                    }
                }
            }).then((data) => {
                //Everything done
            }).catch((err) => {
                return err;
            });

        });
    });
};

module.exports = {
    signupRewardsReferral
};

