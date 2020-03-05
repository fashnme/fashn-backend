const sendOtpMSG91 = require('sendotp');
const { esClient } = require('./../../../conf/elastic-conf');
const { createJWT } = require('../../../controllers/create-decode-jwt')

const verifyUserOTP = (req, res) => {


	const SendOtpInstance = new sendOtpMSG91(process.env.MSG_KEY, 'Your One time verification Code is {{otp}} ');

	let phoneNo = req.body.phoneNo;
	let otpToVerify = req.body.otp;

	//Node-MSG91 Client 
	SendOtpInstance.verify(phoneNo, otpToVerify, function (err, response) {

		// Use only response object as it contains response type and message
		if (response.type == 'error') {
			return res.status(400).send(response.message)
		} else {
			// Searching User Phone No in DB to send user Object
			// console.log(phoneNo)
			esClient.search({
				index: 'user',
				body: {
					"query": {
						"term": {
							"phoneNo": phoneNo
						}
					}
				}
			}).then((userData) => {

				let jwt;
				let user;

				//If User Exists with the Phone No {login case}, and thus generate uniqueId with existing ID
				if (userData.hits.hits.length > 0) {

					esClient.update({
						index: 'user',
						id: userData.hits.hits[0]._id,
						body: {
							"doc": {
								"registrationToken": req.body.registrationToken || ''
							}
						}
					}).then(() => {

						jwt = createJWT(userData.hits.hits[0]._id);
						user = { ...userData.hits.hits[0]._source, _id: userData.hits.hits[0]._id };

						return res.status(200).json({ user, jwt });


					}).catch(e => {
						return res.status(500);
					})
				} else {
					//Create Dynamic JWT based on phoneNo for user to just create Account 
					jwt = createJWT(phoneNo);
					user = null;
					
					return res.status(200).json({ user, jwt });
				}
				

			}).catch(e => {
				console.log(e);
				res.status(400).end();
			})
		}
	})

}

module.exports = { verifyUserOTP }