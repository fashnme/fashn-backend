const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: [
    {
      host: "bea4897764024f35b28f16ef1ea05cea.us-east-1.aws.found.io",
      protocol: "https",
      port: 9243,
      auth: `elastic:UZ3U15OiSbobP6zeGpNzrZPA`,
    }
  ]
});

// // Add foryouposts, followingposts
// esClient.update({
//   id: 'PDo5gm8BMgKYZ1P4YhlZ',
//   index:'user',
//   body:{
//       doc:{
//         "forYouPosts":[
//           "a2hzlG8BuJISDM2-rz5r",
//           "bGhzlG8BuJISDM2-rz5r",
//           "bWhzlG8BuJISDM2-rz5r",
//           "bmhzlG8BuJISDM2-rz5r",
//           "cGhzlG8BuJISDM2-rz5r",
//           "cWhzlG8BuJISDM2-rz5r",
//           "cmhzlG8BuJISDM2-rz5r",
//           "c2hzlG8BuJISDM2-rz5r",
//           "dGhzlG8BuJISDM2-rz5r",
//           "dWhzlG8BuJISDM2-rz5r",
//           "dmhzlG8BuJISDM2-rz5r",
//           "d2hzlG8BuJISDM2-rz5r",
//           "eGhzlG8BuJISDM2-rz5r",
//           "eWhzlG8BuJISDM2-rz5r",
//           "emhzlG8BuJISDM2-rz5r",
//           "e2hzlG8BuJISDM2-rz5r",
//           "fGhzlG8BuJISDM2-rz5r",
//           "fWhzlG8BuJISDM2-rz5r",
//           "fmhzlG8BuJISDM2-rz5r",
//           "f2hzlG8BuJISDM2-rz5r"
//         ],
//         "followingPosts":[
//           "dmhzlG8BuJISDM2-rz5r",
//           "d2hzlG8BuJISDM2-rz5r",
//           "eGhzlG8BuJISDM2-rz5r",
//           "eWhzlG8BuJISDM2-rz5r",
//           "emhzlG8BuJISDM2-rz5r",
//           "e2hzlG8BuJISDM2-rz5r",
//           "fGhzlG8BuJISDM2-rz5r",
//           "fWhzlG8BuJISDM2-rz5r",
//           "fmhzlG8BuJISDM2-rz5r",
//           "f2hzlG8BuJISDM2-rz5r",
//           "gGhzlG8BuJISDM2-rz5r",
//           "gWhzlG8BuJISDM2-rz5r",
//           "gmhzlG8BuJISDM2-rz5r",
//           "g2hzlG8BuJISDM2-rz5r",
//           "hGhzlG8BuJISDM2-rz5r",
//           "hWhzlG8BuJISDM2-rz5r",
//           "hmhzlG8BuJISDM2-rz5r",
//           "h2hzlG8BuJISDM2-rz5r",
//           "iGhzlG8BuJISDM2-rz5r",
//           "ZmhzlG8BuJISDM2-rz5r"
//         ]
//       },
//       "doc_as_upsert" : true

//   }
// }).then((data)=>{
//   console.log(data);
// })


// Add Products in post
// esClient.update({
//   index: 'post',
//   id:'aWhzlG8BuJISDM2-rz5r',
//   body:{
//     doc:{
//       taggedProducts:[{
//         'productId':'sh-725039',
//         'title':'Zip Back Tie Dye Sleeveless Dress',
//         'image':'https://img.ltwebstatic.com/images2_pi/2019/05/21/1558435895320229956.webp'
//       },
//       {
//         'productId':'sh-594830',
//         'title':'Men Stitch Detail Slip On Shoes',
//         'image':'https://img.ltwebstatic.com/images2_pi/2018/09/18/15372650362820069143.webp'
//       },
//       {
//         'productId':'sh-712778',
//         'title':'Plus raw hem wide black jeans',
//         'image':'https://img.ltwebstatic.com/images2_pi/2019/04/04/15543544472841803825.webp'
//       }
//       ]
//     },
//     doc_as_upsert: true
//   }
// }).then((data)=>{
//   console.log('data')
// })



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
// esClient.index({
//     index: 'feed',
//     id:"general-feed",
//     body: {
//         postIds:[
//           "XWhRhW8BuJISDM2-eD74",
//           "ZmhzlG8BuJISDM2-rz5r",
//           "Z2hzlG8BuJISDM2-rz5r",
//           "aGhzlG8BuJISDM2-rz5r",
//           "aWhzlG8BuJISDM2-rz5r",
//           "amhzlG8BuJISDM2-rz5r",
//           "a2hzlG8BuJISDM2-rz5r",
//           "bGhzlG8BuJISDM2-rz5r",
//           "bWhzlG8BuJISDM2-rz5r",
//           "bmhzlG8BuJISDM2-rz5r",
//           "b2hzlG8BuJISDM2-rz5r",
//           "cGhzlG8BuJISDM2-rz5r",
//           "cWhzlG8BuJISDM2-rz5r",
//           "cmhzlG8BuJISDM2-rz5r",
//           "c2hzlG8BuJISDM2-rz5r",
//           "dGhzlG8BuJISDM2-rz5r",
//           "dWhzlG8BuJISDM2-rz5r",
//           "dmhzlG8BuJISDM2-rz5r",
//           "d2hzlG8BuJISDM2-rz5r",
//           "eGhzlG8BuJISDM2-rz5r",
//           "eWhzlG8BuJISDM2-rz5r",
//           "emhzlG8BuJISDM2-rz5r",
//           "e2hzlG8BuJISDM2-rz5r",
//           "fGhzlG8BuJISDM2-rz5r",
//           "fWhzlG8BuJISDM2-rz5r",
//           "fmhzlG8BuJISDM2-rz5r",
//           "f2hzlG8BuJISDM2-rz5r",
//           "gGhzlG8BuJISDM2-rz5r",
//           "gWhzlG8BuJISDM2-rz5r",
//           "gmhzlG8BuJISDM2-rz5r",
//           "g2hzlG8BuJISDM2-rz5r",
//           "hGhzlG8BuJISDM2-rz5r",
//           "hWhzlG8BuJISDM2-rz5r",
//           "hmhzlG8BuJISDM2-rz5r",
//           "h2hzlG8BuJISDM2-rz5r",
//           "iGhzlG8BuJISDM2-rz5r",
//           "iWhzlG8BuJISDM2-rz5r"
//         ]
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


// Search a doc by Id
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

// update by id

// esClient.update({
//   id:'shein',
//   index:'seller',
//   body:{
//     doc:{
//       ecommerce: 'shein'
//     }
//   }
// }).then(data=>{
//   console.log(data); 
// });

esClient.index({
  index: 'test',
  id:'O1iWBXABhQayJ3uYLfDi',
  body:{
    'testtext': "hello",
    'text': null
  }
}).then(data=>{
  console.log(data);
})
// Update a doc by  query using painless scripting

// esClient.updateByQuery({
//     index: 'product',
//     body: {
//         "script": {
//             "source": "ctx._source.seller",
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

// Bulk Operations
// esClient.bulk({
//     body: [
        
//       ]

//   }).then(resp=>{
//       console.log(JSON.stringify(resp, undefined, 2));
//   }).catch(e=>{
//       console.log('e',e);
//   })

// Delete a doc using id
// esClient.delete({
//     index: 'test',
//     id:"1"
//   }).then(resp=>{
//       console.log(resp);
//   }).catch(e=>{
//       console.log('e',e);
//   })



//Delete By Query
// esClient.deleteByQuery({
//index: 'like',
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
// esClient.update({
//     "index": "test",
//     "id": "10",
//     body: {
//         "doc":
//         {
//             // "hey": "hello",
//             "run":{
//                 "hey":"go",
//                 "working":"no"
//             }
//         }, 
//         "doc_as_upsert": true
//     }
// }).then(resp => {
//     console.log("this is", resp)
// })
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

