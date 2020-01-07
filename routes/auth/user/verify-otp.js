const sendOtpMSG91 = require('sendotp');
const { esClient } = require('./../../../conf/elastic-conf');
const {createJWT } = require('../../../controllers/create-decode-jwt')

const verifyOTP = async (req, res) => {


	const SendOtpInstance = new sendOtpMSG91(process.env.MSG_KEY, 'Your One time verification Code is {{otp}} ');

	let phoneNo = req.body.phoneNo;
	let otpToVerify = req.body.otp;

	//Node-MSG91 Client 
	SendOtpInstance.verify(phoneNo, otpToVerify, async function (err, response) {

		// Use only response object as it contains response type and message
		if (response.type == 'error') {
			return res.status(400).send(response.message)
		} else {
		// Searching User Phone No in DB to send user Object
			esClient.search({
				index: 'user',
				body:{
					"query":{
						"term":{
							"phoneNo": phoneNo
						}
					}
				}
			}).then(data=>{

				let jwt;
				let user;
				
				//If User Exists with the Phone No then login case and thus generate uniqueId with 
				if(data.hits.hits.length>0){
					jwt = createJWT(data.hits.hits[0]._id);	
					user = { ...data.hits.hits[0]._source, _id: data.hits.hits[0]._id };
				}else{
				//Create Dynamic JWT based on phoneNo for user to just create Account 
					jwt = createJWT(phoneNo);
					user = null;
				}


				
				return res.status(200).json({user, jwt});
				
			});
		}
	})

}

module.exports = { verifyOTP }