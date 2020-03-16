const { esClient } = require('../../conf/elastic-conf');

const getUserNotifications = (req,res) => {

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
            },
            sort:{
                timeStamp:{
                    order: 'desc'
                }
            }
        }
    }).then(data=>{
        let notifications = data.hits.hits.map((notification)=>{
            return {
                ...notification._source, notificationId: notification._id
            }

        });

        return res.status(200).send({
            notifications
        })
    }).catch(err=>{
        return res.status(500);
    });
};


module.exports = {
    getUserNotifications
};