const { esClient } = require('../../conf/elastic-conf');

const getOrderDetailsAdmin = (req, res) => {
    
    // expects Order Id in body
    esClient.get({
        index: 'orders',
        id: req.body.orderId
    }).then((data) => {

        // console.log(data._source.products)
        let orderDetails = data._source;

        esClient.mget({
            index: 'product',
            body:{
                ids: orderDetails.products.map(product=>product.productId)
            }
        }).then((data)=>{
            data.docs.forEach((product, index)=>{
                orderDetails.products[index] = {...product._source,  ...orderDetails.products[index] };

            });
            return res.status(200).json({orderDetails})

        }).catch(e=>{
            console.log(e);
            return res.status('500');
        })

    }).catch(e=>{
        console.log("error while fetching order details",e);
        res.status(500).end();
    })
}

module.exports = {
    getOrderDetailsAdmin
};