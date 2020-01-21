const { esClient } = require('../../conf/elastic-conf');

const Search = (req, res) => {

    let index = req.query.type || ['post', 'user', 'product'];
    let searchString = req.query.string;

    esClient.search({
        index,
        body: {
            "query": {
                "multi_match": {
                    "query": searchString,
                    "fields": []
                }
            }
        }
    })
        .then(data => {
            res.status(200).json(data.hits.hits)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
}

module.exports = {
    Search
}