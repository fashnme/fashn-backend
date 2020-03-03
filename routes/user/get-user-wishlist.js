const { esClient } = require('../../conf/elastic-conf');


const getWishlistProduct = (req, res) => {

    let from = Number(req.query.page-1)*18 || 0;

    esClient.search({
        index: 'wishlist',
        size: 18,
        from,
        body: {
            "query": {
                "match": {
                    userId: req._id
                }
            }
        }
    })
        .then(data => {

            if(data.hits.total.value == 0) {
                return res.status(200).json({ products });
            }

            const productData = data.hits.hits.map(item => {
                return item._source
            });
            
          
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
            console.log('error getting user wishlist', err)
            res.status(500).send();
        })

}

module.exports = {
    getWishlistProduct
}