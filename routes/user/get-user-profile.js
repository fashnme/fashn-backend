const { esClient } = require('./../../conf/elastic-conf');


const getUserProfile = (req, res) => {

    console.log(req._id)

    esClient.get({
        index: 'user',
        id: req._id
    }).then(data => {

        //   using this approach - can be optimised for cleaner code
        // let coreProfileData={}

        // coreProfileData.firstName=data._source.firstName
        // coreProfileData.lastName=data._source.lastName
        // coreProfileData.gender=data._source.gender
        // coreProfileData.userName=data._source.userName
        // coreProfileData.profilePic=data._source.profilePic


        res.json({ user: data._source })

    }).catch(e => {
        console.log("error in fetching user", e)
        res.status(404).end()
    })


}
module.exports = {
    getUserProfile
}