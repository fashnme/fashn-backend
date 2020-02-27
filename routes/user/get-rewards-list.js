const { esClient } = require('../../conf/elastic-conf');


const getRewardsList = (req, res) => {



    esClient.mget({})
    .then(data => {

    })
    .catch(err => {
        console.log('error getting user rewards list', err)
        res.status(400).end()
    })

}

module.exports = {
    getRewardsList
}