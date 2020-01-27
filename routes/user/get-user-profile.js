const { esClient } = require('./../../conf/elastic-conf');


const getUserProfile = (req, res) => {

        esClient.get({
            index: 'user',
            id: req.body.userId
        }).then(data => {
            
            if(req.body.userId ==  req._id){
                return res.json({ user: data._source });
            }else{
                let { firstName, lastName, gender, profilePic, topPosts, totalLikes, followersCount, followingCount, userName} = data._source;
                return res.json({user:{firstName, lastName, gender,profilePic, topPosts, totalLikes, followersCount, followingCount, userName}})
            }
    
        }).catch(e => {
            console.log("error in fetching user", e)
            res.status(404).end()
        })

   
    
    


}
module.exports = {
    getUserProfile
}