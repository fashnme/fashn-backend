const { esClient } = require('./../../conf/elastic-conf');


const getSellerProfile = (req, res) => {


    esClient.get({
        index: 'seller',
        id: req._id
    }).then(data => {

        res.json({ seller: data._source })

    }).catch(e => {
        console.log("error in fetching seller profile", e)
        res.status(404).end()
    })


}
module.exports = {
    getSellerProfile
}