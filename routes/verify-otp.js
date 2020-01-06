var http = require("https");
const sendOtpMSG91 = require('sendotp');


const verifyOTP = async (req,res) =>{


const SendOtpInstance = new sendOtpMSG91(process.env.MSG_KEY, 'Your One time verification Code is {{otp}} ');

let phoneNo = req.body.phoneNo;
let otpToVerify = req.body.otp;

//Node-MSG91 Client 
SendOtpInstance.verify(phoneNo, otpToVerify , async function(err,response){

	// Use only response object as it contains response type and message
		if(response.type == 'error'){
			return res.status(400).send(response.message)
		}else{
			console.log('Do')
		}
	})

}

module.exports = { verifyOTP }