const { esClient } = require('./../../../conf/elastic-conf');
const { signupReferralIncomeAmount } = require('./../../../conf/rewards-conf');

const signupRewardsReferral = (referrerId, userId) => {

    console.log(referrerId, userId);

    if(referrerId == 'organic') {
        return ;
    }

    // Body of Referral
    let referralBody = {
        timeStamp: new Date(),
        userId,
        referrerId,
        referralType: 'signup',
        referralAmount: signupReferralIncomeAmount,
        referredUserId: userId
    };

    // Update referrerIncome
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
    }).then(() => {


        // Create Referral Document
        return esClient.create({
            index: 'referral',
            id: `${referrerId}.${userId}`,
            body: referralBody
        }).then(() => {
            
            
            //Now Updating newUser referral Rewards
            esClient.update({
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
                return;
            }).catch((err) => {
                return err;
            });
        }).catch((err) => {
            return err;
        });
    }).catch((err)=>{
        // Error in creation of user
        return err;
    });
};

module.exports = {
    signupRewardsReferral
};

