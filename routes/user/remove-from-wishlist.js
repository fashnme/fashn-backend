const { esClient } = require('../../conf/elastic-conf');

const removeFromWishlist = (req, res) => {

    let toDump={
        productId: req.body.productId,
        userId: req._id,
        timeStamp: new Date()
    }
    
    esClient.delete({
        index: 'wishlist',
        id: `${req._id}.${req.body.productId}`
    }).then(resp => {
        res.status(200).end()
        return loggingMiddleware('remove_from_wishlist', toDump);

    }).catch(e => {
        console.log("error in deleting from wishlist", e)
        res.status(400).end()
    })

}
module.exports = {
    removeFromWishlist
}