const sendOtpMSG91 = require('sendotp');

//Send OTP for Verification
const sendOTP = async (req, res) => {
	
	// Create SendOTPInstance
	let SendOtpInstance = new sendOtpMSG91(process.env.MSG_KEY, 'Your One time verification Code is {{otp}} ');
	
	// PhoneNo to Send OTP
	let phoneNo = req.body.phoneNo;
	
	SendOtpInstance.send(phoneNo, 'FASHNM', async function (err, data) {
		if (data.type != "error") {
			return res.status(200).send('Otp Sent');

		} else {
			return res.status(500).send(data.message);
		}
	});
}

module.exports = { sendOTP }