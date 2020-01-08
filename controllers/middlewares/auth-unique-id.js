const jwt = require('jsonwebtoken');
const { decodeJWT } = require('../create-decode-jwt');

const authUniqueIdMiddleware = (req, res, next) => {
    try {
        // Splitting Token from bearer <token>
        const token = req.headers.authorization.split(' ')[1];

        //Decoding JWT Token
        const decodedToken = decodeJWT(token);

        esClient.get({
            index: 'user',
            _id:decodedToken
        }).then(data => {
            if (data.hits.count > 0) {
                req._id = decodedToken;
                next();
            } else {
                return res.status(401);
            }
        })
    } catch(e){
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}

module.exports = { authUniqueIdMiddleware }