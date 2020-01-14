const { esClient } = require('../../conf/elastic-conf');

const addToCollection = (req, res) => {

    // collectionInfo fetched from request body
    let collectionInfo = {
        collectionName:req.body.collectionName || "saved",
        productId: req.body.productId,
        userId: req._id,
        timeStamp: new Date()
    }

    // putting doc in collection index
    esClient.create({
        index: 'collection',
        id:`${req._id}.${req.body.productId}`,
        body:collectionInfo
    }).then(resp => {

        return res.status(200).json({ _id: resp._id, ...collectionInfo });

    }).catch(err => {
        console.log("error in creating collection",err)
        return res.status(401).end();
    })

}
module.exports={
    addToCollection
}