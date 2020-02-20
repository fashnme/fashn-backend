const { esClient } = require('./../../conf/elastic-conf');
const { bidDefaultAdditionalSchema } = require('./../../schemas/bid-default-schema');

const createBid = (req, res) => {

    // bidInfo fetched from request body
    let bidInfo = {
        userId: req._id,
        postId: req.body.postId,
        posterId: req.body.posterId,
        comment: req.body.comment || "",
        amount: req.body.amount,
        startDate: req.body.startDate,
        endDate: req.body.endDate
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
                postImgUrl:data._source.uploadUrl
            };

            // putting doc in bid index
            esClient.index({
                index: 'bid',
                body: bidBody
            }).then(resp => {

                return res.status(200).json({ ...bidBody, _id: resp._id });

            })

        })
        .catch(err => {
            console.log("error in creating bid", err);
            return res.status(401).end();
        })

}
module.exports = {
    createBid
}