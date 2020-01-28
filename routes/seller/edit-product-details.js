const { esClient } = require('./../../conf/elastic-conf')

const editProductDetails = (req, res) => {


    return esClient.update({
        index: 'product',
        id: req.body.productId,
        body: {
            "doc": req.body.newProductDetails
        }
    }).then((data) => {
        res.json({success:"true"});
    }).catch(e => {
        console.log("error in updating product details",e)
        res.status(404).end()
    })


}
module.exports = {
    editProductDetails
}