const { esClient } = require('../../conf/elastic-conf');
const { sendBidsByMe } = require('./../../controllers/helpers/elasticsearch-helpers/send-bids-by-me');

const cancelBid = (req, res) => {

    esClient.updateByQuery({
        index: 'bid',
        id: req.body.bidId,
        body: {
            query: {
                match: {
                    userId: req._id,
                    bidderCancellationMessage: req.body.bidderCancellationMessage,
                    bidderFeedback: req.body.bidderFeedback
                }
            },
            script: {
                "source": "ctx._source['status'] = 'rejected' ",
                "lang": "painless"
            }
        }
    }).then(async (data) => {

        await sendBidsByMe(req._id).then((data) => {
            const bids = data.hits.hits.map(bid => {
                return {
                    bidId: bid._id, ...bid._source
                }
            })
            res.status(200).json({ bids });
        }).catch((e) => {
            return res.status(500).send('Bid Rejected some issue in sending bid');
        });
    }).catch((err) => {
        return res.status(500);
    });

};

module.exports = {
    cancelBid
};
