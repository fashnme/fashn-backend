// Memory Cache
const mcache = require('memory-cache');


//Import Middlewares
const { authPhoneNoMiddleware } = require('./controllers/middlewares/auth-phoneno');
const { authUniqueIdMiddleware } = require('./controllers/middlewares/auth-unique-id');

//Import Auth Routes sendOTP & resendOTP
const { sendOTP } = require('./routes/auth/send-otp');
const { resendOTP } = require('./routes/auth/resend-otp');

// Import User Auth Routes
const { verifyUserOTP } = require('./routes/auth/user/verify-otp');
const { createUser } = require('./routes/auth/user/create-user');

//User Actions
const { createPost } = require('./routes/user/create-post');
const { likePost } = require('./routes/user/like-post');
const { deletePost } = require('./routes/user/delete-post');
const { unlikePost } = require('./routes/user/unlike-post');
const { dislikePost } = require('./routes/user/dislike-post');
const { undislikePost } = require('./routes/user/undislike-post');
const { commentPost } = require('./routes/user/comment-post');
const { deleteCommentPost } = require('./routes/user/delete-comment-post');

// User Notification
const { getUserNotifications } = require('./routes/notification/get-user-notifications');



//Get Product Routes
const { fetchProduct } = require('./routes/products/fetch-product');
const { fetchProducts } = require('./routes/products/fetch-products');
const { getUpdatedPriceAndSize } = require('./routes/products/get-updated-price-and-size');
const { Search } = require('./routes/search/search');
const { fetchPinCodeDetails } = require('./routes/search/fetch-pin-code-details');

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

//User checkout related routes 
const { generateCartCheckoutLink } = require('./routes/payments/generate-cart-checkout-link');
const { checkoutCart } = require('./routes/payments/checkout-cart');


//User Specific Routes
const { getUserProfile } = require('./routes/user/get-user-profile');
const { getUserCart } = require('./routes/user/get-user-cart');
const { getUserPosts } = require('./routes/user/get-user-posts');
const { getUserLikedPosts } = require('./routes/user/get-user-liked-posts');
const { fetchUserColdStart } = require('./routes/user/fetch-user-coldstart');
const { editUserProfile } = require('./routes/user/edit-user-profile');
const { getUserStory } = require('./routes/user/get-user-story');
const { getUserStories } = require('./routes/user/get-user-stories');
const { getOrders } = require('./routes/user/get-orders');
const { getRewardsList } = require('./routes/user/get-rewards-list')
const { updateDeliveryDetails } = require('./routes/user/update-delivery-details')


//Get Feed Routes
const { getGeneralFeed } = require('./routes/feed/get-general-feed');
const { getForYouFeed } = require('./routes/feed/get-foryou-feed');
const { getFollowingFeed } = require('./routes/feed/get-following-feed');


// Bidding routes imports
const { createBid } = require('./routes/bid/create-bid');
const { getBidsByMe } = require('./routes/bid/get-bids-by-me');
const { getBidsForMe } = require('./routes/bid/get-bids-for-me');
const { editBid } = require('./routes/bid/edit-bid');
const { acceptBid } = require('./routes/bid/accept-bid');
const { rejectBid } = require('./routes/bid/reject-bid');
const { cancelBid } = require('./routes/bid/cancel-bid');






//Admin Routes
const { fetchPostForProductTagging } = require('./routes/admin/fetch-post-for-product-tagging')
const { fetchPostsForProductTagging } = require('./routes/admin/fetch-posts-for-product-tagging')
const { getActiveOrdersAdmin } = require('./routes/admin/get-active-orders');
const { getOrderDetailsAdmin } = require('./routes/admin/get-order-details');
const { updateOrderStatus } = require('./routes/admin/update-order-status');
const { getVisuallySimilarProducts } = require('./routes/admin/get-visually-similar-products')
const { updateTaggedProductsArray } = require('./routes/admin/update-tagged-products-array')
const {updateProductDeliveryId}=require('./routes/admin/update-product-delivery-id')


//Seller Routes
// Import User Auth Routes
const { verifySellerOTP } = require('./routes/auth/seller/verify-otp');
const { createSeller } = require('./routes/auth/seller/create-seller');

const { getActiveOrders } = require('./routes/seller/get-active-orders');
const { getDashboardData } = require('./routes/seller/get-dashboard-data')

const { getSellerProfile } = require('./routes/seller/get-seller-profile');
const { editSellerProfile } = require('./routes/seller/edit-seller-profile');

// Orders Routes
const { getOrderDetails } = require('./routes/seller/get-order-details')
const { getInventory } = require('./routes/seller/get-inventory')

// create and update Product
const { createProduct } = require('./routes/seller/create-product')
const { editProductDetails } = require('./routes/seller/edit-product-details')


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

  // Auth Routes
  app.post(`/auth/send-otp`, sendOTP);
  app.post(`/auth/resend-otp`, resendOTP);

  // Auth User Routes
  app.post(`/auth/user/verify-otp`, verifyUserOTP);
  app.post(`/auth/user/create-user`, authPhoneNoMiddleware, createUser);

  // User Profile
  app.post('/user/get-user-profile', authUniqueIdMiddleware, getUserProfile);
  app.post(`/user/edit-user-profile`, authUniqueIdMiddleware, editUserProfile);
  app.get('/user/fetch-user-coldstart', authUniqueIdMiddleware, fetchUserColdStart);


  app.post('/user/get-user-posts', authUniqueIdMiddleware, getUserPosts);
  app.post('/user/get-user-liked-posts', authUniqueIdMiddleware, getUserLikedPosts);
  app.get('/user/get-user-cart', authUniqueIdMiddleware, getUserCart);
  app.get('/user/get-user-wishlist', authUniqueIdMiddleware, getWishlistProduct);

  //Product
  app.get('/product/fetch-product', fetchProduct);
  app.post('/product/fetch-products', fetchProducts);
  app.post('/product/get-updated-price-and-size', getUpdatedPriceAndSize);

  //Search
  app.get('/search', Search);
  app.get('/search/fetch-pin-code-details', fetchPinCodeDetails);

  // User Action Routes
  app.post(`/user/create-post`, authUniqueIdMiddleware, createPost);
  app.post(`/user/delete-post`, authUniqueIdMiddleware, deletePost);
  app.post(`/user/like-post`, authUniqueIdMiddleware, likePost);
  app.post(`/user/comment-post`, authUniqueIdMiddleware, commentPost);
  app.post(`/user/delete-comment-post`, authUniqueIdMiddleware, deleteCommentPost);
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
  app.post(`/user/get-user-story`, authUniqueIdMiddleware, getUserStory);
  app.post(`/user/get-user-stories`, authUniqueIdMiddleware, getUserStories);
  app.get(`/user/get-orders`, authUniqueIdMiddleware, getOrders);
  app.get(`/user/get-rewards-list`, authUniqueIdMiddleware, getRewardsList);
  app.post(`/user/update-delivery-details`, authUniqueIdMiddleware, updateDeliveryDetails);

  // Notification Routes
  app.get(`/notification/get-user-notifications`, authUniqueIdMiddleware, getUserNotifications);
  



  // Payments related route from user
  app.post(`/payments/generate-cart-checkout-link`, authUniqueIdMiddleware, generateCartCheckoutLink);
  app.post(`/payments/checkout-cart`, authUniqueIdMiddleware, checkoutCart);


  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  commentPost);
  // app.get(`/user/myprofile`,authUniqueIdMiddleware,  myProfile);
  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  createStory);
  // app.post(`/user/comment-post`, authUniqueIdMiddleware ,  likeProduct);

  //Feed Routes
  app.get('/feed/get-general-feed', getGeneralFeed);
  app.get('/feed/get-following-feed', authUniqueIdMiddleware, getFollowingFeed);
  app.get('/feed/get-foryou-feed', authUniqueIdMiddleware, getForYouFeed);


  // Bidding Route

  app.post('/bid/create-bid', authUniqueIdMiddleware, createBid);
  app.post('/bid/edit-bid', authUniqueIdMiddleware, editBid);
  app.get('/bid/cancel-bid', authUniqueIdMiddleware, cancelBid);
  app.post('/bid/accept-bid', authUniqueIdMiddleware, acceptBid);
  app.post('/bid/reject-bid', authUniqueIdMiddleware, rejectBid);
  app.get('/bid/get-bids-by-me', authUniqueIdMiddleware, getBidsByMe);
  app.get('/bid/get-bids-for-me', authUniqueIdMiddleware, getBidsForMe);








  // All Routes For Seller
  // Seller Auth Routes
  app.post(`/auth/seller/verify-otp`, verifySellerOTP);
  app.post(`/auth/seller/create-user`, authPhoneNoMiddleware, createSeller);

  app.get(`/seller/get-active-orders`, authUniqueIdMiddleware, getActiveOrders);
  app.get(`/seller/get-dashboard-data`, authUniqueIdMiddleware, getDashboardData);

  // Seller Profile
  app.get('/seller/get-seller-profile', authUniqueIdMiddleware, getSellerProfile);
  app.post(`/seller/edit-seller-profile`, authUniqueIdMiddleware, editSellerProfile);

  // create and update Product
  app.post('/seller/create-product', authUniqueIdMiddleware, createProduct);
  app.post('/seller/edit-product-details', authUniqueIdMiddleware, editProductDetails);
  // Orders routes
  app.post('/seller/get-order-details', authUniqueIdMiddleware, getOrderDetails);
  app.get('/seller/get-inventory', authUniqueIdMiddleware, getInventory)
  


  // All Routes For Admin
  app.post('/admin/fetch-post-for-product-tagging', fetchPostForProductTagging);
  app.post('/admin/fetch-posts-for-product-tagging', fetchPostsForProductTagging);
  app.get('/admin/get-active-orders', getActiveOrdersAdmin);
  app.post('/admin/get-order-details', getOrderDetailsAdmin);
  app.post('/admin/update-order-status', updateOrderStatus);
  app.post('/admin/get-visually-similar-products', getVisuallySimilarProducts)
  app.post('/admin/update-tagged-products-array', updateTaggedProductsArray)
  app.post('/admin/update-product-delivery-id',updateProductDeliveryId)

}
