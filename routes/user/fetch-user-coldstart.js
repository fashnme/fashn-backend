const { esClient } = require('../../conf/elastic-conf');


const fetchUserColdStart = (req, res) => {
    
    
    esClient.search({
        index: ['follow','like'],
        body:{
            query:{
            bool:{
                should:[
                    // Followed User
                    {
                        match: {
                            follower: req._id
                        }
                        
                    },
                    // Liked Posts
                    {
                        match:{
                            userId: req._id
                        }
                    }
                ]
            }
            }
            
        }
    }).then((data)=>{

        let followingMap = {};
        let likedPostsMap = {};

        data.hits.hits.forEach((ele)=>{
            console.log(ele._index)
            
            if(ele._index == 'follow'){
                // If the element is from follow
                followingMap[ele._source.follower] = 1;;
            }else if(ele._index == 'like'){
                // If the element is from like
                likedPostsMap[ele._source.postId] = 1;
            }
        })

        return res.status(200).json({
            followingMap, likedPostsMap
        });
    }).catch(err=>{
        return res.status(500).send('Server Error');
    });

}

module.exports = {
    fetchUserColdStart
}
