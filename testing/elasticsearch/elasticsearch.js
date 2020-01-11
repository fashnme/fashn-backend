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


// esClient.create({
//     index: 'new_index',
//     id:1,
//     body:{
//       "key":"value"
//     }
// }).then(function (resp) {
//     console.log(resp);
// }, function (err) {
//     console.log(err);
// });


// Ceate Document
esClient.index({
    index: 'feed',
    id:"general-feed",
    body: {
        postIds:[
          "XWhRhW8BuJISDM2-eD74",
          "ZmhzlG8BuJISDM2-rz5r",
          "Z2hzlG8BuJISDM2-rz5r",
          "aGhzlG8BuJISDM2-rz5r",
          "aWhzlG8BuJISDM2-rz5r",
          "amhzlG8BuJISDM2-rz5r",
          "a2hzlG8BuJISDM2-rz5r",
          "bGhzlG8BuJISDM2-rz5r",
          "bWhzlG8BuJISDM2-rz5r",
          "bmhzlG8BuJISDM2-rz5r",
          "b2hzlG8BuJISDM2-rz5r",
          "cGhzlG8BuJISDM2-rz5r",
          "cWhzlG8BuJISDM2-rz5r",
          "cmhzlG8BuJISDM2-rz5r",
          "c2hzlG8BuJISDM2-rz5r",
          "dGhzlG8BuJISDM2-rz5r",
          "dWhzlG8BuJISDM2-rz5r",
          "dmhzlG8BuJISDM2-rz5r",
          "d2hzlG8BuJISDM2-rz5r",
          "eGhzlG8BuJISDM2-rz5r",
          "eWhzlG8BuJISDM2-rz5r",
          "emhzlG8BuJISDM2-rz5r",
          "e2hzlG8BuJISDM2-rz5r",
          "fGhzlG8BuJISDM2-rz5r",
          "fWhzlG8BuJISDM2-rz5r",
          "fmhzlG8BuJISDM2-rz5r",
          "f2hzlG8BuJISDM2-rz5r",
          "gGhzlG8BuJISDM2-rz5r",
          "gWhzlG8BuJISDM2-rz5r",
          "gmhzlG8BuJISDM2-rz5r",
          "g2hzlG8BuJISDM2-rz5r",
          "hGhzlG8BuJISDM2-rz5r",
          "hWhzlG8BuJISDM2-rz5r",
          "hmhzlG8BuJISDM2-rz5r",
          "h2hzlG8BuJISDM2-rz5r",
          "iGhzlG8BuJISDM2-rz5r",
          "iWhzlG8BuJISDM2-rz5r"
        ]
    }
}).then(function (resp) {
    console.log(resp)
}).catch(e=>{
    console.log('error', e);
});

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


// Search a doc by Id
// esClient.get({
//   index: 'user',
//   id: "Wmgogm8BuJISDM2-fz7V"
// }).then(data=>{
//   console.log(data)
// })

// Update a DOcument by Id and using painless Script
// esClient.update({
//     index: 'new_index',
//     id: '47Whf28B7KtWkWiRc4wU',
//     body: {
//         "script" : {
//             "source": "ctx._source.discountPercentage = params.discountPercentage",
//             "lang": "painless",
//             "params" : {
//                 "discountPercentage" : 10
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
//   index: 'user',
//   body: {

//     "script": {
//       "source": "ctx._source.followersCount = 0; ctx._source.followingCount = 0",
//       "lang": "painless"
//     },
//     "query": {
//       "match_all": {

//       }
//     }
//   }
// }).then(resp => {
//   console.log(resp, undefined, 2);
// }).catch(e => {
//   console.log('error', e);
// })


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
//   index: 'follow',
//   body: {
//     "query": {
//       "match_all": {

//       }
//     }
//   }
// }).then(resp => {
//   console.log(resp);
// }).catch(e => {
//   console.log('e', e);
// })

// DELETING AN ENTIRE INDEX
// esClient.indices.delete({
//   index: "follow"
// }).then(data => console.log(JSON.stringify(data, undefined, 2)))
//BULK UPDATION 
// esClient.bulk({
//   body: [
//     { "update": { "_index": "user", "_id": "YmiSjm8BuJISDM2-cz5j" } },
//     {
//       "script": {
//         "source": "ctx._source.followingCount = 0",
//         "lang": "painless"
//       }
//     },

//     { "update": { "_index": "user", "_id": "PDo5gm8BMgKYZ1P4YhlZ" } },
//     {
//       "script": {
//         "source": "ctx._source.followingCount = 0",
//         "lang": "painless"
//       }
//     }
//   ]
// }).then(resp => {
//   console.log(JSON.stringify(resp, undefined, 2))
// })

//