const { esClient } = require('../../conf/elastic-conf');

const getOrderDetailsAdmin = (req, res) => {
    
    // expects Order Id in body
    esClient.get({
        index: 'orders',
        id: req.body.orderId
    }).then((data) => {

        res.json({orderDetails:data._source})
    }).catch(e=>{
        console.log("error while fetching order details",e);
        res.status(500).end();
    })
}

module.exports = {
    getOrderDetailsAdmin
};