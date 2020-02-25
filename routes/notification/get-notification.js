const { esClient } = require('./../../conf/elastic-conf');

const getNotification = (req,res) => {

    let size = 10;
    let from = (Number(req.query.page)-1 ) * size || 0;
    let userId = req._id;

    esClient.search({
        index:'notification',
        size,
        from,
        body:{
            query:{
                match:{
                    userId: userId
                }
            }
        }
    });
};


