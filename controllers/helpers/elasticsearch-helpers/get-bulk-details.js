const { esClient } = require('./../../../conf/elastic-conf');


const getBulkDetails = (docs) =>{

    
    if(docs.length == 0) {
        return [];
    };


    return new Promise((resolve, reject)=>{
        esClient.mget({
            body:{
                docs: docs
            }
        }).then(data=>{
            resolve(data);
        }).catch((e)=>{
            console.log(e);
            return [];
        })
        
    });
    

}


const getBulkUsers = (userIds) =>{
    
    if(userIds.length == 0) {
        return [];
    }

    return new Promise((resolve, reject)=>{
        esClient.mget({
            index: 'user',
            body:{
                ids: userIds
            }
        }).then(data=>{
            resolve(data);
        }).catch((e)=>{
            console.log(e);
            return [];
        })
        
    });
    
};

const getBulkPosts = async (postIds) =>{

    if(postIds.length == 0) {
        return [];
    }

    return new Promise((resolve, reject)=>{
        esClient.mget({
            index: 'post',
            body:{
                ids: postIds
            }
        }).then(data=>{
            resolve(data);
        }).catch((e)=>{
            console.log(e);
            return [];
        })
        
    });

};

const getBulkProducts= async (productIds) =>{
    if(productIds.length == 0) {
        return [];
    }

    return new Promise((resolve, reject)=>{
        esClient.mget({
            index: 'product',
            body:{
                ids: productIds
            }
        }).then(data=>{
            resolve(data);
        }).catch((e)=>{
            console.log(e);
            return [];
        })
        
    });

};


module.exports = { getBulkUsers,  getBulkPosts, getBulkProducts, getBulkDetails };