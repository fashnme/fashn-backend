const { esClient } = require('../../conf/elastic-conf');
const { razorPayInstance } = require('../../conf/razorpay-conf');

const  generateCartCheckoutLink  = (req, res) => {


    let params = {
        "type": "link",
        "amount": req.body.checkoutAmount,
        "description": 'Order ',
        "customer": {
            "name": req.body.name || ""
        }
    }
    razorPayInstance.invoices.create(params).then((data)=>{
        console.log(data);
        return res.status(200).send({paymentDetails: data});
    }).catch((err)=>{
        console.log(err);
        return res.status(401).send('Server Error');
    })





}

module.exports = {
    generateCartCheckoutLink
}