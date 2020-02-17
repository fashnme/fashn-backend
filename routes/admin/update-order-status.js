const { esClient } = require('../../conf/elastic-conf');

const updateOrderStatus = (req, res) => {

    // accepts orderId and status in the body
    esClient.update({

        index: 'orders',
        id: req.body.orderId,
        body: {
            doc: {
                status: req.body.status
            }
        }
    }).then((data) => {
        res.json({ success:true })
    }).catch(e => {
        console.log("error while updating order status", e)
        res.status(404).end();
    })
}

module.exports = {
    updateOrderStatus
}