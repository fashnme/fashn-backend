const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
    host: [
        {
            host: "acea2a0a6441468c916122818742e87b.us-east-1.aws.found.io",
            protocol: "https",
            port: 9243,
            auth: `elastic:3a7piSEEQHKBGSmREr8w8MjU`,
        }
    ]
});

// console.log(esClient)
// Index Created
// esClient.indices.create({
//     index: 'new_index'
// }).then(function (resp) {
//     console.log(resp);
// }, function (err) {
//     console.log(err);
// });


// Ceate Document
// esClient.index({
//     index: 'new_index',
//     body: {
//         "date":new Date()
//     }
// }).then(function (resp) {
//     console.log(resp)
// }).catch(e=>{
//     console.log('error', e);
// });

//Search Document
// esClient.search({
//     index:'new_index',
//     body:{
//         "query":{
//             "match_all":{

//             }
//         }
//     }
// }).then(data=>{
//     console.log(data.hits.hits)
// }).catch(e=>{
//     console.log(e);
// })


// Get a doc by Id
// esClient.get({
//   index: 'test',
//   id: "1"
// }).then(data=>{
//   console.log(data)
// })

// Update a DOcument by Id and using painless Script
// esClient.update({
//     index: 'post',
//     id: 'XWhRhW8BuJISDM2-eD74',
//     body: {
//         "script" : {
//             "source": "ctx._source.totalLikes += params.updateikes",
//             "lang": "painless",
//             "params" : {
//                 "updateikes" : -7
//             }
//         }
//     }
//   }).then(data=>{
//     console.log(data)
//   }).catch(e=>{
//       console.log('error',e);
//   })

// Update a DOcument by Id and using doc
// esClient.update({
//     index: 'new_index',
//     id: '47Whf28B7KtWkWiRc4wU',
//     body: {
//         "doc" : {
//             "hello" : "men shirt"
//         }
//     }
//   }).then(data=>{
//     console.log(data)
//   }).catch(e=>{
//       console.log('error',e);
//   })


// Update a doc by  query using painless scripting

// esClient.updateByQuery({
//     index: 'new_index',
//     body: {
//         "script": {
//             "source": "ctx._source.price++",
//             "lang": "painless"
//           },
//         "query":{
//             "multi_match" : {
//                 "query": "new"
//               }
//         }
//     }
//   }).then(resp=>{
//       console.log(resp);
//   }).catch(e=>{
//       console.log('e',e);
//   })



// Update a doc by  query using doc
//Not WOrking
// esClient.updateByQuery({
//     index: 'new_index',
//     body: {
//         "doc": {
//             "likes":50000
//           },
//         "query":{
//             "multi_match" : {
//                 "query": "new"
//               }
//         }
//     }
//   }).then(resp=>{
//       console.log(resp);
//   }).catch(e=>{
//       console.log('e',e);
//   })

// Bulk Operations
// esClient.bulk({
//     body: [
//         { "index" : { "_index" : "test", "_id" : "1" } },
//         { "name" : "value1","email":"value2" },

//         { "delete" : { "_index" : "test", "_id" : "2" } },

//         { "create" : { "_index" : "test", "_id" : "3" } },
//         { "field1" : "value3" },

//         { "update" : {"_id" : "1", "_index" : "test"} },
//         { "doc" : {"field2" : "value2"} },


//         { "update" : {"_id" : "5", "_index" : "test"} },
//         { "doc" : {"field2" : "value2"} }

//       ]

//   }).then(resp=>{
//       console.log(JSON.stringify(resp, undefined, 2));
//   }).catch(e=>{
//       console.log('e',e);
//   })

// Delete a doc using id
// esClient.delete({
//     index: 'user',
//     id:"W2gugm8BuJISDM2-CD4L"
//   }).then(resp=>{
//       console.log(resp);
//   }).catch(e=>{
//       console.log('e',e);
//   })



//Delete By Query
// esClient.deleteByQuery({
//     index: 'like',
//     body:{
//         "query":{
//             "match_all":{

//             }
//         }
//     }
//   }).then(resp=>{
//       console.log(resp);
//   }).catch(e=>{
//       console.log('e',e);
//   })


//Check what does returned in updated
esClient.update({
    "index": "test",
    "id": "10",
    body: {
        "doc":
        {
            // "hey": "hello",
            "run":{
                "hey":"go",
                "working":"no"
            }
        }, 
        "doc_as_upsert": true
    }
}).then(resp => {
    console.log("this is", resp)
})
//     body: [
//         { "index" :},
//         { "name" : "value1","email":"value2" },

//         { "delete" : { "_index" : "test", "_id" : "2" } },

//         { "create" : { "_index" : "test", "_id" : "3" } },
//         { "field1" : "value3" },

//         { "update" : {"_id" : "1", "_index" : "test"} },
//         { "doc" : {"field2" : "value2"} },


//         { "update" : {"_id" : "5", "_index" : "test"} },
//         { "doc" : {"field2" : "value2"} }

//       ]

//   }).then(resp=>{
//       console.log(JSON.stringify(resp, undefined, 2));
//   }).catch(e=>{
//       console.log('e',e);
//   })

//curl -u elastic:3a7piSEEQHKBGSmREr8w8MjU -s -H "Content-Type: application/x-ndjson" -XPOST https://acea2a0a6441468c916122818742e87b.us-east-1.aws.found.io/test/_bulk --data-binary @request_example.json