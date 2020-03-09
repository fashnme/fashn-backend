const { esClient } = require('../../conf/elastic-conf');

const updateOrderDeliveryId = (req, res) => {

    // accepts orderId, deliveryTrackingId in body
    esClient.update({

        index: 'orders',
        id: req.body.orderId,
        body: {
            doc: {
                deliveryTrackingId: req.body.deliveryTrackingId
            }
        }
    }).then((data) => {
        res.json({ success:true })
    }).catch(e => {
        console.log("error while updating tracking id", e)
        res.status(500).end();
    })
}

module.exports = {
    updateOrderDeliveryId
}