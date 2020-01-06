var http = require("https");
const sendOtpMSG91 = require('sendotp');

const sendOTP = async (req, res) => {


	const SendOtpInstance = new sendOtpMSG91(process.env.MSG_KEY, 'Your One time verification Code is {{otp}} ');

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