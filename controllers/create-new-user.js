const { esClient } = require('./../conf/elastic-conf');

const createNewUser = (userDetails) => {
        
        esClient.index({
            index: 'user',
            id:resp._id, 
            body: {...userDetails, totalLikes:0, totalPosts:0, topPosts:[], followersCount:0, followingCount: 0 }
        }).then(data => {
            console.log(data);
        }).catch(e => {
            return res.status(500);
        })
   
}

createNewUser(
    {
        userName: "nikhil007",
        firstName: "Nikhil",
        lastName: "Gupta",
        gender: "male",
        phoneNo: "8700143571"
    });