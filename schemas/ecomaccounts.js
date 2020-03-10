// just a reference schema of ecommerce accounts used by us

let ecomaccounts = {
    "ecommerce": "(eg. lenskart)", // id which we have used for ecommerce
    "emails": {   // emails registered with that ecommerce
        "emailexample@gmail.com":{
            timestampCreated:"",
        },
        "emailexample2@gmail.com":{},
        "emailexample3@gmail.com":{},
    }   
    
}

module.exports = { ecomaccounts }