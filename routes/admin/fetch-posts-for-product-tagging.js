const { esClient } = require('../../conf/elastic-conf');

const fetchPostsForProductTagging = (req, res) => {

    let pageNo = req.body.pageNo || 1;

    esClient.search({
        index: 'post',
        size: 1,
        from: (pageNo-1)*1,
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
                    "order": "desc"
                }
            }
        }
    }).then(
        (data) => {
            return res.json({pageNo: pageNo, posts: data.hits.hits});
        }
    ).catch(err => {
        return res.status(500).send('Server Error');
    })

}

module.exports = {
    fetchPostsForProductTagging
};