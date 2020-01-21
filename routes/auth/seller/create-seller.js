const { esClient } = require('./../../../conf/elastic-conf');
const { sellerDefaultAdditionalSchema } = require('./../../../schemas/seller-default-schema');
const { createJWT } = require('./../../../controllers/create-decode-jwt');

const createSeller = (req, res) => {

    // sellerInfo fetched from request body
    let sellerInfo = {
        firstName: req.body.fullName.split(" ")[0],
        lastName: req.body.fullName.split(" ")[1] || "",
        gender: req.body.gender,
        createdOn: new Date(),
        registrationToken:req.body.registrationToken
    }

    // Phone No fetched from authMiddleware next callback
    let phoneNo = req.phoneNo;

    // Creating body for ES indexing
    let body = {
        ...sellerInfo,
        ...sellerDefaultAdditionalSchema,
        phoneNo
    }

    // Indexing the seller
    esClient.index({
        index: 'seller',
        body: body
    }).then((data) => {

        // adding _id to our existing body we PUT in ES index
        body._id=data._id 

        // Creating JWT based on unique Id for all subsequent requests
        let jwt = createJWT(data._id);
        return res.status(200).json({ body, jwt });

    }).catch(err => {
        console.log(err)
        return res.status(401).end();
    })
}

module.exports = { createSeller };
