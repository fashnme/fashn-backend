const { esClient } = require('../../conf/elastic-conf');

const updateTaggedProductsArray = (req, res) => {

    // tagged products array should have old + updated tags [ALL]

    esClient.update({

        index: 'post',
        id: req.body.postId,
        body: {
            doc: {
                taggedProducts:req.body.taggedProducts
            }
        }
    }).then((data) => {
        res.json({ success:true })
    }).catch(e => {
        console.log("error while updating tagged products", e)
        res.status(404).end();
    })


}
module.exports = {
    updateTaggedProductsArray 
}