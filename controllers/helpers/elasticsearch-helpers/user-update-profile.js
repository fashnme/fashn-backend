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
        lastName: user.fullName.split(' ')[1],
        userName: user.userName,
        profilePic: user.profilePic,
        gender: user.gender,
        bio: user.bio,
        dob:user.dob,
        socialMediaLinks:{
            ...generateSocialMediaLinksFromUserName(user.socialMediaLinks)
        }
    };

    return new Promise((resolve,reject)=>{
        esClient.update({
            index: 'user',
            id: id,
            body: {
                "doc": {...userDetails}
            }
        }).then(data => {
            resolve(data);
        }).catch(e => {
            reject(e);
        })
    

    })
}

module.exports = { userUpdateProfile }