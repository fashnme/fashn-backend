const { esClient } = require('./../../conf/elastic-conf');
const { bidDefaultAdditionalSchema } = require('./../../schemas/bid-default-schema');
const { sendBidsByMe } = require('./../../controllers/helpers/elasticsearch-helpers/send-bids-by-me');

const createBid = (req, res) => {

    // bidInfo fetched from request body
    let bidInfo = {
        userId: req._id,
        postId: req.body.postId,
        posterId: req.body.posterId,
        comment: req.body.comment || "",
        amount: req.body.amount,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        refProductId: req.body.refProductId,
        deliveryAddress: req.body.deliveryAddress

    };


    esClient.get({
        index: 'post',
        id: req.body.postId
    })
        .then(data => {

            // Creating body for putting this doc in ES bid index
            let bidBody = {
                ...bidInfo,
                ...bidDefaultAdditionalSchema,
                postImgUrl: data._source.uploadUrl
            };

            // putting doc in bid index
            esClient.index({
                index: 'bid',
                body: bidBody
            }).then(async (data) => {
                await sendBidsByMe(req._id).then((data) => {
                    const bids = data.hits.hits.map(bid => {
                        return {
                            bidId: bid._id, ...bid._source
                        }
                    })
                }).catch((err) => {
                    return res.status(500);
                });
            }).catch((err) => {
                return res.status(500);
            });

        })
        .catch(err => {
            console.log("error in creating bid", err);
            return res.status(401).end();
        })

}
module.exports = {
    createBid
}