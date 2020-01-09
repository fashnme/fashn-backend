const {esClient} = require('./../../conf/elastic-conf')

const checkUserName = (req, res)=>{

    esClient.search({
    index:'user',
    body:{
        query:{
            match:{
                userName:req.body.userName
            }
            
        }
    }
    }).then(data=>{
        
        if(data.hits.hits.length == 0){
            res.status(200).json({available:true})
        }else{
            // username already exists
            res.status(422).json({available:false})
        }

    }).catch(e=>{

        res.status(400).end();
    })

}

module.export= { checkUserName }