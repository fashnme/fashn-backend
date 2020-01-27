const { decodeJWT } = require('./../create-decode-jwt');

const authUniqueIdMiddleware = (req, res, next) => {
    
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized');
    }

    // Splitting Token from bearer <token>
    const token = req.headers.authorization.split(' ')[1];

    //Decoding JWT Token
    const decodedToken = decodeJWT(token);

    if (decodedToken) {
        req._id = decodedToken;
        next();
    } else {
        return res.status(401).end();

    }


}

module.exports = { authUniqueIdMiddleware }