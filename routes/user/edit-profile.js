const { checkUsername } = require('./../../controllers/elasticsearch-helpers/check-userName')
​
const editUserProfile = async (req, res) => {
​
    /**
     * expects two params in body
     * - changed [bool] => true if data is changed
     * - userNameChanged [bool] => true if username is changed
     */
    await checkUsername()
        .then(data=>{
            if(data.count == 0){
                // Username can be taken

            }else{
                // Username is already taken
            }
        })
        .catch(err=>{
            return res.status(500);
        })
   
​
}
module.exports={
    editUserProfile
}