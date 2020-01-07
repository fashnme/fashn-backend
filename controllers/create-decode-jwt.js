const jwt = require('jsonwebtoken');
const secretkey = require('./../config.json').dev.jwtSecret;

const decodeJWT = (token) => {
	if (token) {
		return jwt.verify(token, secretkey, function (err, decoded) {
			if (decoded) {
				return decoded.data
			} else {
				return null
			}
		});
	} else {
		return null;
	}

}

const createJWT = (dataToEncode) => {
	return jwt.sign({ data: dataToEncode }, secretkey)
}

module.exports = { decodeJWT, createJWT }