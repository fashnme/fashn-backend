const { esClient } = require('../../../conf/elastic-conf')

/**
 * helper to update profile of seller
 * in ES index
 */

const sellerUpdateProfile = (id,data) => {

    return esClient.update({
        index: 'seller',
        id: id,
        body: {
            "doc": data
        }
    }).then(data => {
        return data;
    }).catch(e => {
        return e;
    })

}

module.exports = { sellerUpdateProfile }