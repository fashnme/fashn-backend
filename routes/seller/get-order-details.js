const { esClient } = require('../../conf/elastic-conf');

const getOrderDetails = (req, res) => {
    
    // expects Order Id in body
    esClient.get({
        index: 'orders',
        id: req.body.orderId
    }).then((data) => {

        res.json({orderDetails:data._source})
    }).catch(e=>{
        console.log("error while fetching order details",e)
        res.status(404).end();
    })
}

module.exports = {
    getOrderDetails
}