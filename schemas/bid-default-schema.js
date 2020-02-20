// just for reference of bids schema

let bidDefaultAdditionalSchema = {
    timeStamp:new Date(),
    totalBids:0,
    status: "created"   // ['accepted','rejected'] are other status
}

module.exports = { bidDefaultAdditionalSchema }