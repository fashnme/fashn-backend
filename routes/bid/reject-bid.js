const  { esClient } = require('./../../conf/elastic-conf');

const rejectBid = (req, res) =>{

    esClient.updateByQuery({
        index: 'bid',
        id:req.body.bidId,
        body:{
            query:{
                match:{
                    posterId: req._id
                }
            },
            script: {
                "source": "ctx._source['status'] = 'rejected' ",
                "lang": "painless"
            }
        }
    }).then((data)=>{
        console.log('updated');
    }).catch((err)=>{
        return res.status(500);
    });

};

module.exports ={
    rejectBid
};
