const Razorpay = require('razorpay');

const razorPayInstance = new Razorpay({
    key_id: process.env.R_PAY_KEY,
    key_secret: process.env.R_PAY_SECRET
  });

module.exports = {
    razorPayInstance
}