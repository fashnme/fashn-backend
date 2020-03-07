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

        let indexToSearch = req.body.type || 'user';

        esClient.count({
            index: indexToSearch,
            body: {
                "query": {
                    "bool": {
                        "should": [
                            {
                                "term": {
                                    "phoneNo": decodedToken
                                }
                            },
                            {
                                "term": {
                                    "userName": req.body.userName.toLowerCase()
                                }
                            }
                        ]

                    }

                }
            }
        }).then(data => {
            if (data.count == 0) {
                req.phoneNo = decodedToken;
                next();
            } else {
                ;
                return res.status(422).send(`${indexToSearch} already exists`);
            }
        }).catch(e => {
            return res.status(401).send('Error in User Auth');
        })
    } catch (e) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}

module.exports = { authPhoneNoMiddleware }