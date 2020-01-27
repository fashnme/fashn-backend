const { esClient } = require('../../conf/elastic-conf');

const getInventory = (req, res) => {


    esClient.search({
        index: 'product',
        body: {
            query: {
                match: {
                    ecommerce: req._id
                }
            }
        }
    }).then((data) => {
        res.json({ inventory:data.hits.hits })
    }).catch(e => {
        console.log("error in searching for inventory", e)
        res.status(400).end()
    })



}

module.exports = {
    getInventory
}