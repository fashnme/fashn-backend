const { esClient } = require('../../../conf/elastic-conf')

/**
 * helper to update profile 
 * in ES index
 */

const userUpdateProfile = (id,data) => {

    return esClient.update({
        index: 'user',
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

module.exports = { userUpdateProfile }