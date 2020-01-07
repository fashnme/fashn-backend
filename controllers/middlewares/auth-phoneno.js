const jwt = require('jsonwebtoken');
const { decodeJWT } = require('../create-decode-jwt');
const { esClient } = require('./../../conf/elastic-conf');

// Used only once for a new account creation it requires jwt 
const authPhoneNoMiddleware = (req, res, next) => {
    try {
        // Splitting Token from bearer <token>
        const token = req.headers.authorization.split(' ')[1];

        //Decoding JWT Token
        const decodedToken = decodeJWT(token);

        esClient.count({
            index: 'user',
            body: {
                "query": {
                    "term": {
                        "phoneNo": decodedToken
                    }
                }
            }
        }).then(data => {
            if (data.count == 0) {
                req.phoneNo = decodedToken;
                next();
            }else{
                console.log('User Already Exists');
                return res.status(422).send('User Already Exists');
            }
        }).catch(e => {
            return res.status(401);
        })
    } catch (e) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}

module.exports = { authPhoneNoMiddleware }