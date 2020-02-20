const { esClient } = require('../../conf/elastic-conf');


const getMyBids = (req, res) => {

    let offset = 18
    let from = (Number(req.query.page)-1 ) * offset || 0;
    let userId = req._id;

    esClient.search({
        index: 'bid',
        size: offset,
        from,
        body: {
            "query": {
                "match": {
                    userId
                }
            }
        }
    })
        .then(data => {
            const bids = data.hits.hits.map(bid => {
                return {
                    bidId: bid._id, ...bid._source
                }
            })
            res.status(200).json({ bids })
        })
        .catch(err => {
            console.log('error getting user bids', err)
            res.status(500).send()
        })

}

module.exports = {
    getMyBids
}