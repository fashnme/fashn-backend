const { esClient } = require('../../conf/elastic-conf');


const fetchUserColdStart = (req, res) => {
    
    
    esClient.search({
        index: ['follow','like', 'wishlist','cart'],
        size:1000,
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
                    // Liked Posts, Wishlist Products, Cart Products
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

        let userFollowingMap = {}, userLikedPostsMap = {}, userWishlistMap = {} , userCartMap = {};
        

        data.hits.hits.forEach((ele)=>{
            
            if(ele._index == 'follow'){
                // If the element is from follow
                userFollowingMap[ele._source.follower] = 1;;
            }else if(ele._index == 'like'){
                // If the element is from like
                userLikedPostsMap[ele._source.postId] = 1;
            }else if(ele._index == 'wishlist'){
                // If the element is from wishlist
                userWishlistMap[ele._source.productId] = {productId: ele._source.productId,...ele._source};
            }else if(ele._index == 'cart'){
                // If the element is from cart
                userCartMap[ele._source.productId] =  {productId: ele._source.productId,...ele._source};
            }
        })

        return res.status(200).json({
            userFollowingMap, userLikedPostsMap, userWishlistMap, userCartMap
        });
    }).catch(err=>{
        return res.status(500).send('Server Error');
    });

}

module.exports = {
    fetchUserColdStart
}
