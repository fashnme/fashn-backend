const { razorPayInstance } = require('./../../conf/razorpay-conf');

const checkoutCart = (req, res) =>{
    
    let orderId = req.body.orderId;

    razorPayInstance.orders.fetch(req.body.orderId)
                    .then(data=>{
                        console.log(data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
    return res.status(200);
}

module.exports = {
    checkoutCart
}