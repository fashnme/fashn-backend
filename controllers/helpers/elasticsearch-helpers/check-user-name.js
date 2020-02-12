const {esClient} = require('./../../../conf/elastic-conf')

/**
 * helper to check ES user index 
 * for uniqueness of username
 */

const checkUserName = (userNameToCheck) => {

    return esClient.count({
        index: 'user',
        body: {
            "query": {
                "term": {
                    userName: userNameToCheck
                }
            }
        }
    });

}
module.exports = { checkUserName }