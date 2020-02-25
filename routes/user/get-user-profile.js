const { esClient } = require('./../../conf/elastic-conf');


const getUserProfile = (req, res) => {

    let body = {
        size: 18,
        sort: [{ timeStamp: { "order": "desc" } }],
        query: {
            match: {
                userId: req.body.userId || req._id // empty body defaults to requesting user profile
            }
        }
    }


    esClient.get({
        index: 'user',
        id: req.body.userId || req._id
    }).then((data) => {
        

        let userDetails = data._source;

        esClient.msearch({
            body: [
                { index: 'post' },
                body,
                { index: 'like' },
                body,
                { index: 'story' },
                body
            ]

        }).then((data) => {


            let recentPosts=data.responses[0].hits.hits.map(ele=>ele._id)
            let recentLikedPosts=data.responses[1].hits.hits.map(ele=>ele._id)
            let stories=data.responses[2].hits.hits.map(ele=>ele._id)

            res.send({userDetails, recentPosts,recentLikedPosts,stories})

        }).catch(e => {

            return res.status(500).send(`Server Error`);


        })


    }).catch(e => {
        console.log(e)
        return res.status(500).send(`Server Error`);
    });


}

module.exports = {
    getUserProfile
}