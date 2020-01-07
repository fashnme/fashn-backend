// const { esClient } = require('./../../conf/elastic-conf');

// const checkPhoneExists = (phoneNo) =>{

//     esClient.count({
//             index:'user',
//             body:{
//                 "query":{
//                     "term":{
//                         "phoneNo":phoneNo
//                     }
//                 }
//             }
//          }).then(data=>{
//             if(data.count>0){

//             }
//          })
// }