//(self) if this works correctly , exact copy can be used to make route to update ecomAccountUsed field

const { esClient } = require('../../conf/elastic-conf');

const updateProductDeliveryId = (req, res) => {

    // accepts orderId, productId and to-be-updated deliveryTrackingId in body

    esClient.updateByQuery({
        index: 'orders',
        body: {
            query: {
                match: {
                    _id: req.body.orderId
                }
            },
            script: {
                lang: 'painless',
                source: 'for (product in ctx._source.products) {if (product["productId"] == params.productId) { product["deliveryTrackingId"] = params.delTrackId; } }',     // debug (gives script compile error)
                params:{
                    "productId": req.body.productId,
                    "delTrackId":req.body.deliveryTrackingId
                }
            }
            
        }
    }).then(resp => {
        return res.json({success:true});
    }).catch(e => {
        console.log('e', e);
        return res.status(400).end();
    })
}

module.exports = {
    updateProductDeliveryId
}