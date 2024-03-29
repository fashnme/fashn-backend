const { esClient } = require('./../../../conf/elastic-conf');
const { sellerDefaultAdditionalSchema } = require('./../../../schemas/seller-default-schema');
const { createJWT } = require('./../../../controllers/create-decode-jwt');

const createSeller = (req, res) => {

    // sellerInfo fetched from request body

    // remember: ecommerce key is used as id of seller here
    let sellerInfo = {
        firstName: req.body.fullName.split(" ")[0],
        lastName: req.body.fullName.split(" ")[1] || "",
        ecommerce:req.body.ecommerce,
        gender: req.body.gender,
        createdOn: new Date(),
        registrationToken:req.body.registrationToken,
        logoUrl:req.body.logoUrl || "",
        email:req.body.email || ""
    }

    // Phone No fetched from authMiddleware next callback
    let phoneNo = req.phoneNo;

    // Creating body for ES indexing
    let body = {
        ...sellerInfo,
        ...sellerDefaultAdditionalSchema,
        phoneNo
    }

    // creating the seller
    esClient.create({
        index: 'seller',
        id:req.body.ecommerce,
        body: body
    }).then((data) => {

        // adding _id to our existing body we PUT in ES index
        body._id=req.body.ecommerce

        // Creating JWT based on unique Id for all subsequent requests
        let jwt = createJWT(body._id);
        return res.status(200).json({ body, jwt });

    }).catch(err => {
        console.log(err)
        return res.status(401).end();
    })
}

module.exports = { createSeller };
