// Memory Cache
const mcache = require('memory-cache');

//Imports 
const {sendOTP} = require('./routes/send-otp');
const {resendOTP} = require('./routes/resend-otp');
const {verifyOTP} = require('./routes/verify-otp');


var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
       res.setHeader('content-type', 'application/json');
      res.send(JSON.parse(cachedBody))
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, JSON.stringify(body), duration * 1000);
        res.setHeader('content-type', 'application/json');

        res.sendResponse(body)
      }
      next()
    }
  }
}

module.exports = function(app){
  app.post(`/send-otp`,sendOTP);
  app.post(`/resend-otp`,resendOTP);
  app.post(`/verify-otp`,verifyOTP);
}
