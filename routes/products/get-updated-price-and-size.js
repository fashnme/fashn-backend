const axios = require('axios');
const { esClient } = require('./../../conf/elastic-conf');

const getUpdatedPriceAndSize = (req, res) => {

    return axios({
        method: 'post',
        url: 'http://34.74.57.130:8343/get-offers-similar-product',
        headers: {
            'Content-type': 'application/json'
        },
        data: JSON.stringify({
            priceRequired: true,
            similarRequired: false,
            productPageUrl: req.body.productPageUrl,
            productId: req.body.productId
        })
    }).then(async response => {


        if (response.data.result.offerAndUpdatedPrice) {
            let docToUpdate = {}
            if (response.data.result.offerAndUpdatedPrice.price) {
                docToUpdate["price"] = response.data.result.offerAndUpdatedPrice.price
            }
            if (response.data.result.offerAndUpdatedPrice.crossedPrice) {
                docToUpdate["crossedPrice"] = response.data.result.offerAndUpdatedPrice.crossedPrice
            }
            if (response.data.result.offerAndUpdatedPrice.discount) {
                docToUpdate["discount"] = response.data.result.offerAndUpdatedPrice.discount
            }
            docToUpdate["lastUpdated"] = new Date().getTime();
            docToUpdate["stockAvailability"] = response.data.result.offerAndUpdatedPrice.sizesAvailable.length != 0 ? true : false;

            esClient.update({
                index: 'product',
                id: req.body.productId,
                body: {
                    doc: docToUpdate
                }
            }).then((data) => {
                // Updated Price
            }).catch((err) => {
                // console.log(err);
            });

        }
        // console.log('response', response.data.result);
        res.status(200).json({ updatedPriceAndSize: response.data.result });

       


    }).catch(e => {
        console.log(e);
        return res.status(500).send(`Some Issue`);
    })
}
module.exports = { getUpdatedPriceAndSize }