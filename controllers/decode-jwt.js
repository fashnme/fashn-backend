const jwt = require('jsonwebtoken');

const decodeJWT = (token) => {
	if (token) {
		return jwt.verify(token, 'secretkey', function (err, decoded) {
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

module.exports = { decodeJWT }