const { esClient } = require('../../conf/elastic-conf');

const getDashboardData = (req, res) => {

    let dashboardData = {}
    esClient.search({
        index: 'orders',
        body: {
            query: {
                match: {
                    sellerId: req._id
                }
            }
        }
    }).then((data) => {



        if (data.hits.total.value == 0) {
            dashboardData.ordersCount = 0;
            dashboardData.ordersAmount = 0;

        } else {


            let ordersAmount = 0;

            let orders = data.hits.hits.map((order) => {

                ordersAmount += order._source.orderAmount;
                ordersAmount += order._source.deliveryAmount;

                return { orderId: order._id, ...order._source };
            })

            dashboardData.ordersCount = orders.length
            dashboardData.ordersAmount = ordersAmount
        }


        esClient.search({
            index: 'product',
            body: {
                query: {
                    match: {
                        ecommerce: req._id
                    }
                }
            }
        }).then((data) => {
            dashboardData.inventoryCount = data.hits.total.value
            res.json({ dashboardData })
        })



    }).catch(e => {
        console.log("error", e)
        res.status(400).end()
    })



}

module.exports = {
    getDashboardData
}