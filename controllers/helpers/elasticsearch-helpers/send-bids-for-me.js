const { esClient } = require('./../../../conf/elastic-conf');

const sendBidsForMe = (posterId) =>{
    
    return esClient.search({
        index: 'bid',
        size: 18,
        from: 0,
        body: {
            "query": {
                "bool": {
                    "must": {
                        "match": {
                            posterId: userId
                        }
                    },
                    "must_not": {
                        "match": {
                            "status": "rejected"
                        }
                    }
                }
            },
            "sort": {
                "timeStamp": {
                    "order": "desc"
                }
            }
        }
    })

};

module.exports = {
    sendBidsForMe
};