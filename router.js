// Memory Cache
const mcache = require('memory-cache');


//Import Middlewares
const { authPhoneNoMiddleware } = require('./controllers/middlewares/auth-phoneno');
const { authUniqueIdMiddleware } = require('./controllers/middlewares/auth-unique-id');

//Import Route Files
const { sendOTP } = require('./routes/auth/user/send-otp');
const { resendOTP } = require('./routes/auth/user/resend-otp');
const { verifyOTP } = require('./routes/auth/user/verify-otp');
const { createUser } = require('./routes/auth/user/create-user');
const { createPost } = require('./routes/user/create-post');
const { likePost } = require('./routes/user/like-post');
const {deletePost} = require('./routes/user/delete-post');
const { unlikePost } = require('./routes/user/unlike-post');
const { getGeneralFeed } = require('./routes/user/get-general-feed');

const { followUser } = require('./routes/user/follow-user');
const { unfollowUser } = require('./routes/user/unfollow-user');
const { createStory } = require('./routes/user/create-story');
const {deleteStory} = require('./routes/user/delete-story');

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

module.exports = function (app) {

  app.get('/test',(req,res)=>{console.log(req.connection.remoteAddress); return res.status(200);})
  // Auth User Routes
  app.post(`/auth/user/send-otp`, sendOTP);
  app.post(`/auth/user/resend-otp`, resendOTP);
  app.post(`/auth/user/verify-otp`, verifyOTP);
  app.post(`/auth/user/create-user`, authPhoneNoMiddleware, createUser);

  // User Action Routes TODO
  app.post(`/user/create-post`, authUniqueIdMiddleware, createPost);
  app.post(`/user/delete-post`, authUniqueIdMiddleware, deletePost);
  app.post(`/user/like-post`, authUniqueIdMiddleware, likePost);
  app.post(`/user/unlike-post`, authUniqueIdMiddleware, unlikePost);


  //Feed Routes
  app.get('/user/get-general-feed', getGeneralFeed);

  app.post(`/user/follow-user`, authUniqueIdMiddleware, followUser);
  app.post(`/user/unfollow-user`, authUniqueIdMiddleware, unfollowUser);
  app.post(`/user/create-story`, authUniqueIdMiddleware, createStory);
  app.post(`/user/delete-story`, authUniqueIdMiddleware, deleteStory);
  


  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  commentPost);
  // app.post(`/user/edit-profile`, authUniqueIdMiddleware ,  editProfile);
  // app.get(`/user/myprofile`,authUniqueIdMiddleware,  myProfile);
  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  createStory);
  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  likeProduct);

}
