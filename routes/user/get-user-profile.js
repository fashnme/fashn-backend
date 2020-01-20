const { esClient } = require('./../../conf/elastic-conf');


const getUserProfile = (req, res) => {

    console.log(req._id)

    esClient.get({
        index: 'user',
        id: req._id
    }).then(data => {

        res.json({ user: data._source })

    }).catch(e => {
        console.log("error in fetching user", e)
        res.status(404).end()
    })


}
module.exports = {
    getUserProfile
}