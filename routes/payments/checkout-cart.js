const { esClient } = require('./../../conf/elastic-conf');
const { razorPayInstance } = require('./../../conf/razorpay-conf');
const { updateRewardsCheckout } = require('./../../controllers/helpers/elasticsearch-helpers/update-rewards-checkout');

const checkoutCart = (req, res) => {

    let orderId = req.body.orderId;

    let orderBody = {
        ...req.body,
        status: 'received',
        completed:false
    };

    if (req.body.paymentMode == 'cod') {
        // Yes Order Was Successfully Placed Creating order in orders index
        esClient.index({
            index: 'orders',
            body: orderBody
        }).then((data) => {

            // Updating referral Reward in user based on referralType
            // i) A product is added in cart from someone sharing product link => referrerId
            // ii) A product is added in cart from a post => referrerPost (This is by default)
            updateRewardsCheckout(data._id, req.body.products);

            return res.status(200).send('Order Created');

        }).catch((err) => {
            console.log('Err', err)
        });

    } else {

        razorPayInstance
            .orders
            .fetch(req.body.orderId)
            .then(() => {

                // Yes Order Was Successfully Placed Creating order in orders index
                esClient.create({
                    id: orderId,
                    index: 'orders',
                    body: orderBody
                }).then(() => {

                    // Updating referral Reward in user based on referralType
                    // i) A product is added in cart from someone sharing product link => referrerId
                    // ii) A product is added in cart from a post => referrerPost (This is by default)


                    updateRewardsCheckout(req.body.orderId, req.body.products);

                    return res.status(200).send('Order Created');

                }).catch((err) => {
                    console.log('Err', err)
                });
            })

    }


}

module.exports = {
    checkoutCart
}