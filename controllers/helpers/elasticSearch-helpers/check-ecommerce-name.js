const {esClient} = require('./../../../conf/elastic-conf')

/**
 * helper to check ES seller index 
 * for uniqueness of ecommerce name(used as ID in index)
 */

const checkEcommerceName = (nameToCheck) => {

    return esClient.count({
        index: 'seller',
        body: {
            "query": {
                "term": {
                    ecommerceName: nameToCheck
                }
            }
        }
    });

}
module.exports = { checkEcommerceName }