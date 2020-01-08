const { esClient } = require('../../../conf/elastic-conf');
const { userDefaultAdditionalSchema } = require('../../../schemas/user-default-schema');
const { createJWT } = require('../../../controllers/create-decode-jwt');

const createUser = (req, res) => {

    // UserInfo fetched from request body
    let userInfo = {
        firstName: req.body.fullName.split(" ")[0],
        lastName: req.body.fullName.split(" ")[1] || "",
        gender: req.body.gender,
        userName: req.body.userName,
        profilePic: req.body.profilePic || ""
    }

    // Phone No fetched from authMiddleware next callback
    let phoneNo = req.phoneNo;

    // Creating body for ES indexing
    let body = {
        ...userInfo,
        ...userDefaultAdditionalSchema,
        phoneNo
    }

    // Indexing the user
    esClient.index({
        index: 'user',
        body
    }).then(resp => {

        // adding _id to our existing body we PUT in ES index
        body._id=resp._id 

        // Creating JWT based on unique Id for all subsequent requests
        let jwt = createJWT(body._id);
        return res.status(200).json({ body, jwt });

    }).catch(err => {
        console.log(err)
        return res.status(401).end();
    })
}

module.exports = { createUser }