const { checkUsername } = require('./../../controllers/helpers/elasticSearch-helpers/check-user-name')

const editUserProfile = async (req, res) => {

    /**
     * expects two params in body
     * - userNameChanged [bool] => true if username is changed
     */



    if (req.body.userNameChanged) {

        await checkUsername()
            .then(data => {
                if (data.count == 0) {
                    // Username can be used

                    // call update profile function

                } else {
                    // Username is already used by someone
                    res.status(422).end();

                }
            })
            .catch(err => {
                return res.status(500).end();
            })

    } else {

        // username was not changed

        // call update profile function


    }



}
module.exports = {
    editUserProfile
}