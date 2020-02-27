const { esClient } = require('./../../conf/elastic-conf');

const rejectBid = (req, res) => {

    esClient.updateByQuery({
        index: 'bid',
        id: req.body.bidId,
        body: {
            query: {
                match: {
                    posterId: req._id,
                    ownerRejectionReason: req.body.ownerRejectionReason,
                    ownerFeedback: req.body.ownerFeedback
                }
            },
            script: {
                "source": "ctx._source['status'] = 'rejected' ",
                "lang": "painless"
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
        }).catch((e)=>{
            return res.status(500).send('Bid Rejected some issue in sending bid');
        });
    }).catch((err) => {
        return res.status(500);
    });

};

module.exports = {
    rejectBid
};
