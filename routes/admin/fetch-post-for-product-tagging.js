const { esClient } = require('./../../conf/elastic-conf');

const fetchPostForProductTagging = (req, res) => {

    esClient.search({
        index: 'post',
        size: 1,
        body: {
            "query": {
                "bool": {
                    "must_not": {
                        "exists": {
                            "field": "taggedProducts"
                        }
                    }
                }

            },
            "sort": {
                "timeStamp": {
                    "order": "asc"
                }
            }
        }
    }).then(
        (data) => {
            console.log(data);
            return res.json({totalCount: data.hits.total.value, posts: data.hits.hits});
        }
    ).catch(err => {
        console.log(err);
        return res.status(500).send('Server Error');
    })

}

module.exports = {
    fetchPostForProductTagging
};