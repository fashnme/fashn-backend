const { esClient } = require('../../conf/elastic-conf');

const fetchProduct = (req, res) => {

    esClient.get({
        index: 'product',
        id: req.query.productId
    })
        .then(data => {
            const product = {
                productId: req.query.productId,
                ...data._source
            }
            res.status(200).json({ product });
        })
        .catch(err => {
            console.log("Error fetching Product", err);
            res.status(400).end();
        })
}

module.exports = {
    fetchProduct
}