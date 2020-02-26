const  { esClient } = require('./../../conf/elastic-conf');

const rejectBid = (req, res) =>{

    esClient.updateByQuery({
        index: 'bid',
        id:req.body.bidId,
        body:{
            query:{
                match:{
                    posterId: req._id,
                    ownerRejectionReason: req.body.ownerRejectionReason,
                    ownerFeedback: req.body.ownerFeedback
                }
            },
            script: {
                "source": "ctx._source['status'] = 'rejected' ",
                "lang": "painless"
            }
        }
    }).then((data)=>{
        return res.status(200).send('Bid Rejected');
    }).catch((err)=>{
        return res.status(500);
    });

};

module.exports ={
    rejectBid
};
