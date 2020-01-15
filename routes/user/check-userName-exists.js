const {checkUserName} = require('./../../controllers/helpers/elasticSearch-helpers/check-user-name');

/**
 * route that checks if username exists
 * using checkUserName function in helpers folder
 */

const checkUserNameExists = (req, res)=>{

    checkUserName.then(resp=>{
        
        if(resp.available){
            res.json({available:true})
        }else{
            res.status(422).json({available:false})
        }

    }).catch(e=>{

        res.status(400).end();
    })

}

module.export= { checkUserNameExists }