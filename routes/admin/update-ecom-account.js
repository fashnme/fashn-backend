const { esClient } = require('../../conf/elastic-conf');

const updateEcomAccount = (req, res) => {
    
    // ecommerce and emails(old + new-added/updated email) fields are expected

    esClient.update({
        index: 'ecomAccounts',
        id: req.body.ecommerce,
        body: {
            doc: {
                emails: req.body.emails   // refer to ecomAccounts schema to see how to structure emails
            }
        }
    }).then((data) => {

        res.json({ success: true })
    }).catch(e => {

        console.log("server error while updating ecommerce email accounts", e)
        res.status(500).end();
    })


}
module.exports = {
    updateEcomAccount
}