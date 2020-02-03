const { esClient } = require('../../../conf/elastic-conf')


const updateGeneralFeed = async (topPostsIdsArray) => {

    return esClient.index({
        index: 'feed',
        id:"general-feed",
        body: {
            "generalFeed": topPostsIdsArray
        }
    })

}

module.exports = { updateGeneralFeed }