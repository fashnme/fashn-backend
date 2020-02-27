const { esClient } = require('./../../conf/elastic-conf')

const updateDeliveryDetails = (req, res) => {

    // deliveryInfo fetched from request body
    /**
     * expects timeStamp{optional}, label, address object in req.body
     */

    let deliveryInfo = {
        label: req.body.label,
        address: { ...req.body.address },
        timeStamp: req.body.timeStamp || `${new Date().getTime()}`
    }

    esClient.update({
        index: 'user',
        id: req._id,
        body: {
            "script": {
                "source": "ctx._source.deliveryDetails[params.timeStamp] = params.deliveryInfo",
                "lang": "painless",
                "params": {
                    "timeStamp": deliveryInfo.timeStamp,
                    "deliveryInfo": deliveryInfo
                }
            }
        }
    }).then(resp => {
        res.status(200).end();
    }).catch(e => {
        console.log("error in updating address ", e)
        res.status(400).end();
    })

}
module.exports = {
    updateDeliveryDetails
}