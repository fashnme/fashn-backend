const { esClient } = require('./../../conf/elastic-conf');

const acceptBid = (req, res) => {

    console.log(req._id);

    esClient.get({
        index: 'bid',
        id: req.body.bidId
    }).then((data) => {

        if (!data._source) {
            // Not Present
            return res.status(400).send('Bid not present');

        } else if (!data._source.posterId === req._id) {
            
            // PosterId is wrong
            return res.status(401).send('Bid not accessible for this user');

        } else {

            //Whether Bid acceptance is allowed based on time delay
            let allowed = (new Date(data._source.startDate).getTime() > new Date().getTime() + 86400000) ? true : false;

            // Bidding Acceptance is not allowed due to time acceptance
            if (!allowed) {
                return res.status(400).send('Bidding not Allowed due to Time Limit up');
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
                            status: 'accepted',
                            price: req.body.price,
                            size: req.body.size,
                            ownerAddress: req.body.ownerAddress,
                            securityAmount: req.body.securityAmount,
                            ownerMessage: req.body.ownerMessage
                        }
                    }
                }).then((data) => {
                    esClient.search({
                        index: 'bid',
                        size: 18,
                        from: 0,
                        body: {
                            "query": {
                                "bool": {
                                    "must": {
                                        "match": {
                                            posterId: req._id
                                        }
                                    },
                                    "must_not": {
                                        "match": {
                                            "status": "rejected"
                                        }
                                    }
                                }
                            },
                            "sort": {
                                "timeStamp": {
                                    "order": "desc"
                                }
                            }
                        }
                    }).then((data) => {
                        const bids = data.hits.hits.map(bid => {
                            return {
                                bidId: bid._id, ...bid._source
                            }
                        })
                        res.status(200).json({ bids });
                    })
                }).catch((err) => {
                    return res.status(500);
                });
            }
        }
    });
};

module.exports = {
    acceptBid
};
