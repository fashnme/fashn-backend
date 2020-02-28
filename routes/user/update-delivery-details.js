const { esClient } = require('./../../conf/elastic-conf')

const updateDeliveryDetails = (req, res) => {

    // deliveryInfo fetched from request body
    /**
     * expects addressId{optional}, label, address object in req.body
     */

    let deliveryInfo = {
         ...req.body.address ,
         addressId: req.body.addressId || `${new Date().getTime()}`
    };

    esClient.update({
        index: 'user',
        id: req._id,
        source:['deliveryDetails'],
        body: {
            "script": {
                "_source": "ctx._source.deliveryDetails[params.timeStamp] = params.deliveryInfo",
                "lang": "painless",
                "params": {
                    "deliveryInfo": deliveryInfo
                }
            }
        }
    }).then((data) => {
        
        let deliveryDetails = data._source.deliveryDetails;
        return res.status(200).json({deliveryDetails});
        
    }).catch(e => {
        console.log("error in updating address ", e)
        res.status(400).end();
    })

}
module.exports = {
    updateDeliveryDetails
}