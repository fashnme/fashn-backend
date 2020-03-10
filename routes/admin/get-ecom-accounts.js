const { esClient } = require('../../conf/elastic-conf');


const getEcomAccounts = (req, res) => {

    // only ecommerce field is required to fetch all accounts of it (as it is used as id in schema)

    esClient.get({
        index: 'ecomAccounts',
        id: req.body.ecommerce
    })
    .then(data => {
        
        res.status(200).json({ ecomAccounts: data._source })
    })
    .catch(err => {
        
        console.log('error getting ecommerce accounts', err)
        res.status(500).end()
    })
}

module.exports = { getEcomAccounts }