const axios = require('axios');
const { esClient } = require('./../../conf/elastic-conf');

const getUpdatedPriceAndSize = (req, res) => {

    esClient.get({
        index: 'product',
        id: req.body.productId
    }).then((data) => {


        if (data._source.lastUpdated) {
            if (new Date().getTime() + 3600000 > data._source.lastUpdated) {
                // Price need not get updation
                let { price, crossedPrice, discount, offers, sizesAvailable, stockAvailability } = data._source;

                return res.status(200).json({
                    updatedPriceAndSize: {
                        price, crossedPrice, discount, offers, sizesAvailable, stockAvailability
                    }
                });
            }
        }

        // Price needs Updation
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
        }).then((response) => {


            if (response.data.result.offerAndUpdatedPrice) {

                let docToUpdate = { "offers": [], "sizesAvailable": [] };

                if (response.data.result.offerAndUpdatedPrice.price) {
                    docToUpdate["price"] = response.data.result.offerAndUpdatedPrice.price
                }
                if (response.data.result.offerAndUpdatedPrice.crossedPrice) {
                    docToUpdate["crossedPrice"] = response.data.result.offerAndUpdatedPrice.crossedPrice
                }
                if (response.data.result.offerAndUpdatedPrice.discount) {
                    docToUpdate["discount"] = response.data.result.offerAndUpdatedPrice.discount
                }
                if (response.data.result.offerAndUpdatedPrice.offers) {
                    docToUpdate["offers"] = response.data.result.offerAndUpdatedPrice.offers
                }
                if (response.data.result.offerAndUpdatedPrice.sizesAvailable) {
                    docToUpdate["sizesAvailable"] = response.data.result.offerAndUpdatedPrice.sizesAvailable
                }

                docToUpdate["lastUpdated"] = new Date().getTime();
                docToUpdate["stockAvailability"] = response.data.result.offerAndUpdatedPrice.sizesAvailable.length != 0 ? true : false;

                res.status(200).json({ updatedPriceAndSize: response.data.result.offerAndUpdatedPrice });

                return esClient.update({
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
        }).catch(e => {
            console.log(e);
            return res.status(500).send(`Some Issue`);
        })


    });



}
module.exports = { getUpdatedPriceAndSize }