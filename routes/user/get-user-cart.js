const { esClient } = require('../../conf/elastic-conf');


const getUserCart = (req, res) => {

    esClient.search({
        index: 'cart',
        body: {
            "query": {
                "match": {
                    userId: req._id
                }
            }
        }
    })
        .then(data => {
            const cartProducts = data.hits.hits.map(item => {
                return item._source
            })

            if(cartProducts.length == 0){
                return res.status(200).json({"products":[]});
            }
            esClient.mget({
                index: 'product',
                body: { ids: cartProducts.map(product => { return product.productId }) }
            }).then((data) => {

                const products = data.docs.map((product, index) => {
                    let { title, price, crossedPrice, discount, brandName, quantity, size, ecommerce } = product._source;
                    let image = product._source.imagesArray[0]
                    return {
                        title, price, crossedPrice, discount, image, brandName, quantity, size, ecommerce,
                        ...cartProducts[index]
                    }
                })

                return res.status(200).json({ products });
            }).catch((e) => {
                console.log('error', e);
                res.status(500).end();
            });
        })
        .catch(err => {
            console.log('error getting user cart', err)
            res.status(500).send()
        })

}

module.exports = {
    getUserCart
}