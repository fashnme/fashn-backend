const { esClient } = require('./../../conf/elastic-conf')

const updateDeliveryDetails = (req, res) => {

    // deliveryInfo fetched from request body
    /**
     * expects addressId{optional}, label, address object in req.body
     */

    let deliveryInfo = {
        label: req.body.label,
        address: { ...req.body.address },
        addressId: req.body.adressId || `${new Date().getTime()}`
    }

    esClient.update({
        index: 'user',
        id: req._id,
        source:['deliveryDetails'],
        body: {
            "script": {
                "source": "ctx._source.deliveryDetails[params.timeStamp] = params.deliveryInfo",
                "lang": "painless",
                "params": {
                    "addressId": deliveryInfo.addressId,
                    "deliveryInfo": deliveryInfo
                }
            }
        }
    }).then((data) => {
        
        let deliveryDetailsArray = Object.values(data._source.deliveryDetails);
        return res.status(200).json({deliveryDetailsArray});
        
    }).catch(e => {
        console.log("error in updating address ", e)
        res.status(400).end();
    })

}
module.exports = {
    updateDeliveryDetails
}