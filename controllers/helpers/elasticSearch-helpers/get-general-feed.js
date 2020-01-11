const { esClient } = require('../../../conf/elastic-conf')


const getGeneralFeed = async () => {

    return esClient.get({
        index: 'feed',
        id: 'general-feed'
    })

}

module.exports = { getGeneralFeed }