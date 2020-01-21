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
const { deletePost } = require('./routes/user/delete-post');
const { unlikePost } = require('./routes/user/unlike-post');
const { getGeneralFeed } = require('./routes/user/get-general-feed');
const { dislikePost } = require('./routes/user/dislike-post');
const { undislikePost } = require('./routes/user/undislike-post');

//Get methods
const { getUserProfile } = require('./routes/user/get-user-profile');
const { getUserCart } = require('./routes/user/get-user-cart');
const { getUserPosts } = require('./routes/user/get-user-posts');
const { fetchProduct } = require('./routes/products/fetch-product');
const { fetchProducts } = require('./routes/products/fetch-products');
const { Search } = require('./routes/search/search');

const { followUser } = require('./routes/user/follow-user');
const { unfollowUser } = require('./routes/user/unfollow-user');
const { createStory } = require('./routes/user/create-story');
const { deleteStory } = require('./routes/user/delete-story');
const { addToCollection } = require('./routes/user/add-to-collection')
const { removeFromCollection } = require('./routes/user/remove-from-collection')
const { addToCart } = require('./routes/user/add-to-cart')
const { removeFromCart } = require('./routes/user/remove-from-cart');
const { addToWishlist } = require('./routes/user/add-to-wishlist');
const { removeFromWishlist } = require('./routes/user/remove-from-wishlist');
const { sharePost } = require('./routes/user/share-post');
const { getWishlistProduct } = require('./routes/user/get-user-wishlist');
const { viewedPost } = require('./routes/user/viewed-post');
const { viewedPosts } = require('./routes/user/viewed-posts');


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

        res.sendResponse(body);
      }
      next()
    }
  }
}

module.exports = function (app) {

  app.get('/test', (req, res) => { return res.status(200).send('Working'); })

  // Auth User Routes
  app.post(`/auth/user/send-otp`, sendOTP);
  app.post(`/auth/user/resend-otp`, resendOTP);
  app.post(`/auth/user/verify-otp`, verifyOTP);
  app.post(`/auth/user/create-user`, authPhoneNoMiddleware, createUser);

  // User Profile
  app.get('/user/get-user-profile', authUniqueIdMiddleware, getUserProfile);
  app.get('/user/get-user-posts', authUniqueIdMiddleware, getUserPosts);
  app.get('/user/get-user-cart', authUniqueIdMiddleware, getUserCart);
  app.get('/user/get-user-wishlist', authUniqueIdMiddleware, getWishlistProduct);

  //Product
  app.get('/product/fetch-product', fetchProduct);
  app.post('/product/fetch-products', fetchProducts);

  //Search
  app.get('/search', Search);

  // User Action Routes TODO
  app.post(`/user/create-post`, authUniqueIdMiddleware, createPost);
  app.post(`/user/delete-post`, authUniqueIdMiddleware, deletePost);
  app.post(`/user/like-post`, authUniqueIdMiddleware, likePost);
  app.post(`/user/unlike-post`, authUniqueIdMiddleware, unlikePost);
  app.post(`/user/dislike-post`, authUniqueIdMiddleware, dislikePost);
  app.post(`/user/undislike-post`, authUniqueIdMiddleware, undislikePost);
  app.post(`/user/share-post`, authUniqueIdMiddleware, sharePost);
  app.post(`/user/add-to-collection`, authUniqueIdMiddleware, addToCollection);
  app.post(`/user/remove-from-collection`, authUniqueIdMiddleware, removeFromCollection);
  app.post(`/user/add-to-cart`, authUniqueIdMiddleware, addToCart);
  app.post(`/user/remove-from-cart`, authUniqueIdMiddleware, removeFromCart);
  app.post(`/user/add-to-wishlist`, authUniqueIdMiddleware, addToWishlist);
  app.post(`/user/remove-from-wishlist`, authUniqueIdMiddleware, removeFromWishlist);
  app.post(`/user/follow-user`, authUniqueIdMiddleware, followUser);
  app.post(`/user/unfollow-user`, authUniqueIdMiddleware, unfollowUser);
  app.post(`/user/create-story`, authUniqueIdMiddleware, createStory);
  app.post(`/user/delete-story`, authUniqueIdMiddleware, deleteStory);
  app.post(`/user/viewed-post`, authUniqueIdMiddleware, viewedPost);
  app.post(`/user/viewed-posts`, authUniqueIdMiddleware, viewedPosts);

  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  commentPost);
  // app.post(`/user/edit-profile`, authUniqueIdMiddleware ,  editProfile);
  // app.get(`/user/myprofile`,authUniqueIdMiddleware,  myProfile);
  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  createStory);
  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  likeProduct);

  //Feed Routes
  app.get('/user/get-general-feed', getGeneralFeed);





}
