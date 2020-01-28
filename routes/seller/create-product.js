const { esClient } = require('./../../conf/elastic-conf');
const { productDefaultAdditionalSchema } = require('./../../schemas/product-default-schema');

const createProduct = (req, res) => {

    let discount = Math.floor(((req.body.crossedPrice-req.body.price)/req.body.crossedPrice)*100);


    // productInfo fetched from request body
    let productInfo = {
        "title": req.body.title,
        "description": req.body.description || "",
        "discount": req.body.discount || discount,
        "brandName": req.body.brandName,
        "gender": req.body.gender,
        "crossedPrice": req.body.crossedPrice,
        "price": req.body.price,
        "ecommerce": req._id,
        "imagesArray":req.body.imagesArray,
        "quantity":req.body.quantity

    }

    // Creating body for putting this doc in ES product index
    let productBody = {
        ...productInfo,
        ...productDefaultAdditionalSchema,
    }

    // putting doc in product index
    esClient.index({
        index: 'product',
        body: productBody
    }).then(resp => {

        return res.status(200).json({ ...productBody, _id: resp._id });

    }).catch(err => {
        console.log("error in creating product", err);
        return res.status(401).end();
    })

}
module.exports = {
    createProduct
}