const { esClient } = require('./../../../conf/elastic-conf');

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