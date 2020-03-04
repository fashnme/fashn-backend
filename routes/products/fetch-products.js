const { esClient } = require('../../conf/elastic-conf');

const fetchProducts = (req, res) => {

    esClient.mget({
        index: 'product',
        body: { ids: req.body.productIdArray }
    })
        .then(data => {
            // console.log(data)
            const products = data.docs.map((product, index) => {
                return {
                    productId: req.body.productIdArray[index],
                    ...product._source
                }
            })
            res.status(200).json({ products });
        })
        .catch(err => {
            res.status(400).end();
        })
}

module.exports = {
    fetchProducts
}