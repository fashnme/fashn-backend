const { esClient } = require('../../conf/elastic-conf');
const { loggingMiddleware } = require('./../../controllers/helpers/logging-middleware');

const addToWishlist = (req, res) => {

    // wishlistInfo fetched from request body
    let wishlistInfo = {
        productId: req.body.productId,
        userId: req._id,
        referrerPost:req.body.referrerPost || "",
        referrerId:req.body.referrerId || "",
        timeStamp: new Date()
    }

    // putting doc in wishlist index
    esClient.create({
        index: 'wishlist',
        id: `${req._id}.${req.body.productId}`,
        body: wishlistInfo
    }).then(resp => {
        res.status(200).json({ _id: resp._id, ...wishlistInfo });
        return loggingMiddleware('add_to_wishlist', wishlistInfo);

    }).catch(err => {
        console.log("error in creating wishlist", err)
        return res.status(401).end();
    })

}
module.exports = {
    addToWishlist
}