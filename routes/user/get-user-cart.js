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
            const productData = data.hits.hits.map(item => {
                return item._source
            })
            // console.log(productCollection)
            // res.status(200).json(data.hits.hits)
            esClient.mget({
                index: 'product',
                body: { ids: productData.map(product => { return product.productId }) }
            }).then((data) => {

                const products = data.docs.map((product, index) => {
                    let { title, price, crossedPrice, discount, brandName } = product._source;
                    let image = product._source.imagesArray[0]
                    return {
                        title, price, crossedPrice, discount, image, brandName,
                        ...productData[index]
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