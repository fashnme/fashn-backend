const { esClient } = require('../../conf/elastic-conf');

const getActiveOrders = (req, res) => {
    
    const pageResultSize = 30;
    let offset = 0;
    if (req.query.hasOwnProperty("page"))
        offset = pageResultSize * (req.query.page-1);

    esClient.search({
        index: 'orders',
        from: offset,
        size: pageResultSize,
        body: {
            query: {
                match: {
                    completed: false
                }
            }
        }
    }).then((data) => {

        if (data.hits.total.value == 0) {
            return res.status(200).json({
                activeOrders: {
                    count: 0,
                    ordersInfo: [],
                    ordersAmount: 0
                }
            })
        }

        let ordersAmount = 0;

        let orders = data.hits.hits.map((order) => {

            ordersAmount += order._source.orderAmount;
            ordersAmount += order._source.deliveryAmount;

            return { orderId: order._id, ...order._source };
        })

        return res.status(200).json({
            activeOrders: {
                count: orders.length,
                ordersInfo: orders,
                ordersAmount: ordersAmount
            }
        })
    });
}

module.exports = {
    getActiveOrders
}