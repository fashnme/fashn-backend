const { esClient } = require('../../conf/elastic-conf');


const getBids = (req, res) => {

    let size = 18;
    let from = (Number(req.query.page)-1 ) * offset || 0;
    let userId = req._id;

    esClient.search({
        index: 'bid',
        size: 18,
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
    getBids
}