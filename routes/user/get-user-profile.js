const { esClient } = require('./../../conf/elastic-conf');


const getUserProfile = (req, res) => {

    esClient.search({
    index:'user',  
    body:{
        query:{
            match:{
                id:req._id
            }
        }
    }
    }).then((data)=>{

        //   using this approach - can be optimised for cleaner code
        let coreProfileData={};
        coreProfileData.firstName=data.hits.hits[0]._source.firstName
        coreProfileData.lastName=data.hits.hits[0]._source.lastName
        coreProfileData.gender=data.hits.hits[0]._source.gender
        coreProfileData.userName=data.hits.hits[0]._source.userName
        coreProfileData.profilePic=data.hits.hits[0]._source.profilePic
        
        res.json(coreProfileData)
        
    }).catch(e=>{
        res.status(404).end()
    })


}
module.exports={
    getUserProfile
}