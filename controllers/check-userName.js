const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
    host: [
        {
            host: "acea2a0a6441468c916122818742e87b.us-east-1.aws.found.io",
            protocol: "https",
            port: "9243",
            auth: `elastic:3a7piSEEQHKBGSmREr8w8MjU`,
        }
    ]
});


const checkUserName = (userNameToCheck) => {

    return esClient.count({
        index: 'user',
        body: {
            "query": {
                "term": {
                    userName: userNameToCheck
                }
            }
        }
    });

}
checkUserName('nikhilg007').then(data=>{
    console.log(data)
})
module.exports = {checkUserName}

// checkUserName('nikhilg007')
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error=>{
//         console.log(err);
//     })