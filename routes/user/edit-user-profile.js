const { checkUsername } = require('./../../controllers/helpers/elasticsearch-helpers/check-user-name')
const { userUpdateProfile } = require('./../../controllers/helpers/elasticsearch-helpers/user-update-profile')
const editUserProfile = async (req, res) => {

    /**
     * expects two params in body
     * - userNameChanged [bool] => true if username is changed
     */
    if (req.body.userNameChanged) {

        await checkUsername()
            .then(async (data) => {
                if (data.count == 0) {
                    // Username can be used

                    // calling update profile function
                    await userUpdateProfile(req._id, req.body.newProfile)

                        .then(data => {
                            res.status(200).end()
                        }).catch(e => {
                            res.status(400).end()
                        })

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

        // calling update profile function
        await userUpdateProfile(req._id, req.body.newProfile)

            .then(data => {
                res.status(200).end()
            }).catch(e => {
                res.status(400).end()
            })


    }
}
module.exports = {
    editUserProfile
}