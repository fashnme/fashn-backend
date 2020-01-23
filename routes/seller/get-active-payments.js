const { esClient } = require('../../conf/elastic-conf');

const getActivePayments = (req, res) =>{
    esClient.search({
        index: 'orders',
        body:{
            query:{
                term:{
                    sellerId: req._id
                }
            }
        }
    }).then((data)=>{
        let orders = data.hits.hits.map((order)=>{return {orderId: order._id , ...order._source };})
        return res.status(200).json({activeOrders:{
            count: orders.length,
            ordersInfo: orders
        }})
    });
}

module.exports ={
    getActivePayments
}