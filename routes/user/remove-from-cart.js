const { esClient } = require('../../conf/elastic-conf');

const removeFromCart = (req, res) => {

    let toDump={
        productId: req.body.productId,
        userId: req._id,
        timeStamp: new Date()
    }
    
    esClient.delete({
        index: 'cart',
        id
    }).then(resp => {
        res.status(200).end()
        return loggingMiddleware('remove_from_cart', toDump);

    }).catch(e => {
        console.log("error in deleting from cart", e)
        res.status(400).end()
    })

}
module.exports = {
    removeFromCart
}