const { esClient } = require('../../conf/elastic-conf');

const getOrders = (req, res) => {
    
    let pageResultSize = 30;

    let page = (req.query.page-1) || 0;

    esClient.search({
        index: 'orders',
        from: page*pageResultSize,
        size: pageResultSize,
        body: {
            query: {
                term:{
                    userId: req._id
                }
            },
            sort:{
                orderCreated:{
                    order: 'desc'
                }
            }
        }
    }).then((data) => {

        if (data.hits.total.value == 0) {
            return res.status(200).json({
                orderProducts: []
            })
        }
        let orderProducts = [];

        data.hits.forEach((order)=>{
            order.products.forEach((product)=>{
                orderProducts.push(product);
            })
        })

        return res.status(200).json({
            orderProducts
        })
    });
}

module.exports = {
    getOrders
}