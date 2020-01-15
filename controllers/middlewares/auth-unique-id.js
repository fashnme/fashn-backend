const jwt = require('jsonwebtoken');
const { decodeJWT } = require('./../create-decode-jwt');
const { esClient } = require('./../../conf/elastic-conf');

const authUniqueIdMiddleware = (req, res, next) => {
    // Splitting Token from bearer <token>
    const token = req.headers.authorization.split(' ')[1];

    //Decoding JWT Token
    const decodedToken = decodeJWT(token);

    if (decodedToken) {
        esClient.get({
            index: 'user',
            id: decodedToken
        }).then((data) => {
            if (data.found) {
                req._id = decodedToken;
                next();
            } else {
                return res.status(401).end();
            }
        }).catch(e => {
            throw new Error('Failed in searching decoded JWT Token');
        })
    } else {
        return res.status(401).end();

    }


}

module.exports = { authUniqueIdMiddleware }