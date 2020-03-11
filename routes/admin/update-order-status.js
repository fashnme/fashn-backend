const { esClient } = require('../../conf/elastic-conf');

const updateOrderStatus = (req, res) => {

    // accepts orderId and status in the body
    esClient.update({

        index: 'orders',
        id: req.body.orderId,
        body: {
            "script": {
                "source": "for (product in ctx._source.products) {if (product['productId'] == params.productId) { item['status'] = params.statusToUpdate; } }",
                "lang": "painless",
                "params": {
                    "productId": req.body.productId,
                    "statusToUpdate": req.body.status
                }
            }
        }
    }).then(() => {
        return res.json({ updated: true })
    }).catch(e => {
        return res.status(500).end();
    })
}

module.exports = {
    updateOrderStatus
}