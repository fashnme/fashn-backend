const { esClient } = require('../../conf/elastic-conf');

// expects that request contains a query param "page"(indexed from 0 for page no. 0 {first page})
//else defaults to page no. 0

const getInventory = (req, res) => {

    const pageResultSize = 100;
    let offset=0;
    if(req.query.hasOwnProperty("page"))
    offset = pageResultSize * (req.query.page-1);

    esClient.search({
        index: 'product',
        body: {
            from: offset,
            size: pageResultSize,
            query: {
                match: {
                    ecommerce: req._id
                }
            }
        }
    }).then((data) => {
        res.json({ inventory: data.hits.hits.map(ele=>{return {productId: ele._id, ...ele._source}}) })
    }).catch(e => {
        console.log("error in searching for inventory", e)
        res.status(400).end()
    })



}

module.exports = {
    getInventory
}