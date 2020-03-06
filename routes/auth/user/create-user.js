const { esClient } = require('./../../../conf/elastic-conf');
const { userDefaultAdditionalSchema } = require('./../../../schemas/user-default-schema');
const { rewardsDefaultSchema } = require('./../../../schemas/rewards-default-schema');
const { createJWT } = require('./../../../controllers/create-decode-jwt');
const { generateRandom } = require('./../../../controllers/helpers/generate-random');
const { signupRewardsReferral } = require('./../../../controllers/helpers/elasticsearch-helpers/signup-rewards-referral');
const { validateUserName } = require('../../../controllers/helpers/validate-user-name');

const createUser = async (req, res) => {

    let validateUserNameMessage = validateUserName(req.body.userName);
    
    // Check whether username is valid or not with invalidationmessage as a response
    if(validateUserNameMessage !== true){
        return res.status(400).send(validateUserNameMessage);
    }

    // Generate UserId/ReferrerId
    let userId = generateRandom();

    // UserInfo fetched from request body
    let userInfo = {
        fullName: req.body.fullName,
        firstName: req.body.fullName.split(" ")[0],
        lastName: req.body.fullName.split(" ")[1] || "",
        gender: req.body.gender,
        userName: req.body.userName,
        profilePic: req.body.profilePic || "",
        registrationToken:req.body.registrationToken,
        createdOn: new Date()
    };

    if(req.body.gender == 'male'){
        userInfo.profilePic = 'https://image.flaticon.com/icons/svg/702/702023.svg';
    }else if(req.body.gender == 'female'){
        userInfo.profilePic = 'https://image.flaticon.com/icons/svg/145/145866.svg';
    }else{
        userInfo.profilePic = 'https://image.flaticon.com/icons/png/128/747/747545.png';
    };
    
    // Phone No fetched from authMiddleware next callback
    let phoneNo = req.phoneNo;

    
    // Creating body for ES Document Creating
    let body = {
        ...userDefaultAdditionalSchema,
        ...rewardsDefaultSchema,
        ...userInfo,
        phoneNo
    };
    
    // Creating the user
    esClient.create({
        index: 'user',
        id:userId,
        body
    }).then(async (data) => {
        

        // Creating JWT based on unique Id for all subsequent requests
        let jwt = createJWT(userId);


        if(req.body.referralCode){
            await signupRewardsReferral(req.body.referralCode||"organic", userId);
        }
        
        return res.status(200).json({ body, jwt });

    }).catch(err => {
        console.log(err)
        return res.status(401).end();
    })
}

module.exports = { createUser }