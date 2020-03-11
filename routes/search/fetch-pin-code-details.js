const axios = require('axios');

const fetchPinCodeDetails = (req,res) => {
    axios.get(`https://www.myntra.com/my/api/addressApi/fetchPincodeDetails/${req.query.pincode}`)
         .then((resp)=>{
             return res.status(200).json(resp.data);
         })
         .catch((err)=>{
             return res.status(500).end();
         })
};

module.exports = {
    fetchPinCodeDetails
}