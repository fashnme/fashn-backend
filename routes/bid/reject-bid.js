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
    }).then(async (data) => {
        await sendBidsForMe(req._id).then((data) => {
            const bids = data.hits.hits.map(bid => {
                return {
                    bidId: bid._id, ...bid._source
                }
            })
            return res.status(200).json({ bids });
        }).catch(err => {
            return res.status(400);
        })
    });

};

module.exports = {
    rejectBid
};
