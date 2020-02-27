const { esClient } = require('./../../conf/elastic-conf');

const editBid = (req, res) => {

    esClient.get({
        index: 'bid',
        id: req.body.bidId
    }).then((data) => {

        if (!data._source) {
            // Not Present
            return res.status(400).send('Bid not present');

        } else if (data._source.userId === req._id) {
            // PosterId is wrong
            return res.status(401).send('Bid not accessible for this user');

        } else {
            
            //Whether Bid acceptance is allowed based on time delay
            let allowed = (new Date(data._source.initialDate).getTime() > new Date().getTime() + 86400000) ? true : false;

            // Bidding Acceptance is not allowed due to time acceptance
            if (!allowed) {
                return res.status(400).send('Bid Editing not Allowed due to Time Limit up');
            }
            // Bidding is not allowed due to bid already accepted or rejected
            if (data._source.status !== 'created') {
                return res.status(400).send('Bid Already Accepted Or Rejected')
            }
            else {
            // Final case where bid is to be accepted
                esClient.update({
                    index: 'bid',
                    id: req.body.bidId,
                    body: {
                        doc: {
                            amount: req.body.amount, 
                            deliveryDetails: req.body.deliveryDetails,
                            comment: req.body.comment
                        }
                    }
                }).then((data) => {
                    return res.status(200);
                }).catch((err) => {
                    return res.status(500);
                });
            }
        }
    });
};

module.exports = {
    editBid
};
