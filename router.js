// Memory Cache
const mcache = require('memory-cache');


//Import Middlewares
const { authPhoneNoMiddleware } = require('./controllers/middlewares/auth-phoneno');
const { authUniqueIdMiddleware } = require('./controllers/middlewares/auth-unique-id');

//Import Route Files
const {sendOTP} = require('./routes/auth/user/send-otp');
const {resendOTP} = require('./routes/auth/user/resend-otp');
const {verifyOTP} = require('./routes/auth/user/verify-otp');
const {createUser} = require('./routes/auth/user/create-user');
const {createPost} = require('./routes/user/create-post');
const {likePost} = require('./routes/user/like-post');
const {unlikePost} = require('./routes/user/unlike-post');
const {follow} = require('./routes/user/follow');
const {unFollow} = require('./routes/user/unfollow');


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

  // Auth User Routes
  app.post(`/auth/user/send-otp`,sendOTP);
  app.post(`/auth/user/resend-otp`,resendOTP);
  app.post(`/auth/user/verify-otp`,verifyOTP);
  app.post(`/auth/user/create-user`,authPhoneNoMiddleware , createUser);

  // User Action Routes TODO
  app.post(`/user/create-post`, authUniqueIdMiddleware , createPost);
  app.post(`/user/like-post`, authUniqueIdMiddleware , likePost);
  app.post(`/user/unlike-post`, authUniqueIdMiddleware , unlikePost);
  app.post(`/user/follow`, authUniqueIdMiddleware , follow);
  app.post(`/user/unfollow`, authUniqueIdMiddleware , unFollow);
  
  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  commentPost);
  // app.post(`/user/edit-profile`, authUniqueIdMiddleware ,  editProfile);
  // app.get(`/user/myprofile`,authUniqueIdMiddleware,  myProfile);
  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  createStory);
  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  likeProduct);

}
