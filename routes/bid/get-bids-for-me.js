const { esClient } = require('../../conf/elastic-conf');


const getBidsForMe = (req, res) => {

    let size = 18;
    let from = (Number(req.query.page)-1 ) * size || 0;
    let userId = req._id;

    esClient.search({
        index: 'bid',
        size,
        from,
        body: {
            "query": {
                "match": {
                    posterId:userId
                }
            }
        }
    })
        .then(data => {
            console.log('data',data)
            const bids = data.hits.hits.map(bid => {
                return {
                    bidId: bid._id, ...bid._source
                }
            })
            res.status(200).json({ bids })
        })
        .catch(err => {
            console.log('error getting bids on user posts', err)
            res.status(500).send()
        })

}

module.exports = {
    getBidsForMe
}