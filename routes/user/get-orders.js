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
                match:{
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
        let idArray = [];

        data.hits.hits.forEach((order)=>{
            order._source.products.forEach((product)=>{
                idArray.push(product.productId);
                orderProducts.push({...product, orderId: order._id, orderCreated: order._source.orderCreated});
            })
        });

        esClient.mget({
            index:'product',
            body: { ids: idArray }
        }).then(products=>{
            products.docs.map((product,index)=>{
                orderProducts[index] = {...product._source,  ...orderProducts[index]}
            })
            return res.status(200).json({
                orderProducts
            })
        })

        
    });
}

module.exports = {
    getOrders
}