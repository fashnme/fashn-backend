// just a reference schema of ecommerce accounts used by us

let ecomAccounts = {
    
    "ecommerce": "(eg. lenskart)", // also it is used as _id in schema
    "emails": {      // emails registered with that ecommerce
        
        "emailexample@gmail.com":{
            timestampCreated:"date object",
            phoneNo:"123456789",
            timestampLastUsed:"date object"
        },
        "emailexample2@gmail.com":{},
        "emailexample3@gmail.com":{},
    }   
    
}

module.exports = { ecomAccounts }