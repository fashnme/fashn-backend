const { esClient } = require('../../../conf/elastic-conf');
const { generateSocialMediaLinksFromUserName} = require('./../../helpers/generate-social-media-links-from-username');

/**
 * helper to update profile 
 * in ES index
 */

const userUpdateProfile = (id,user) => {

    let userDetails ={
        fullName: user.fullName,
        firstName: user.fullName.split(' ')[0],
        lastName: user.lastName.split(' ')[1],
        userName: user.userName,
        profilePic: req.body.profilePic,
        gender: req.body.gender,
        bio: req.body.bio,
        dob:req.body.dob,
        socialMediaLinks:{
            ...generateSocialMediaLinksFromUserName(user.socialMediaLinks)
        }
            
            
    };

    return esClient.update({
        index: 'user',
        id: id,
        body: {
            "doc": userDetails
        }
    }).then(data => {
        return data;
    }).catch(e => {
        return e;
    })

}

module.exports = { userUpdateProfile }