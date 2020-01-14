const { esClient } = require('../../conf/elastic-conf');

const addToCart = (req, res) => {

    // collectionInfo fetched from request body
    let cartInfo = {
        quantity: req.body.quantity || 1,
        productId: req.body.productId,
        userId: req._id,
        timeStamp: new Date()
    }

    // putting doc in cart index
    esClient.create({
        index: 'cart',
        id:`${req._id}.${req.body.productId}`,
        body:cartInfo
    }).then(resp => {

        return res.status(200).json({ _id: resp._id, ...cartInfo });

    }).catch(err => {
        console.log("error in creating cart",err)
        return res.status(401).end();
    })

}
module.exports={
    addToCart
}