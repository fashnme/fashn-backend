const { esClient } = require('../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const addToCart = (req, res) => {

    // collectionInfo fetched from request body
    let cartInfo = {
        productId: req.body.productId,
        quantity: req.body.quantity || 1,
        size: req.body.size || "",
        userId: req._id,
        timeStamp: new Date(),
        referrerPost: req.body.referrerPost || "",
        referrerId: req.body.referrerId || ""
    };

    // putting doc in cart index
    esClient.index({
        index: 'cart',
        id: `${req._id}.${req.body.productId}`,
        body: cartInfo
    }).then(resp => {
        res.status(200).json({ _id: resp._id, ...cartInfo });
        return loggingMiddleware('add_to_cart', cartInfo);

    }).catch(err => {
        console.log("error in creating cart", err)
        return res.status(401).send('Exists in Cart');
    });

}
module.exports = {
    addToCart
}