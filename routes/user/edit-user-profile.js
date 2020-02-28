const { checkUserName } = require('./../../controllers/helpers/elasticsearch-helpers/check-user-name')
const { userUpdateProfile } = require('./../../controllers/helpers/elasticsearch-helpers/user-update-profile')
const editUserProfile = async (req, res) => {

    /**
     * expects two params in body
     * - userNameChanged [bool] => true if username is changed
     */
    if (req.body.userNameChanged) {

        await checkUserName(req.body.newProfile.userName)
            .then(async (data) => {
                if (data.count == 0) {

                    // calling update profile function
                    await userUpdateProfile(req._id, req.body.newProfile)

                        .then(data => {
                            res.status(200).end()
                        }).catch(e => {
                            res.status(500).send("Can't Update Profile, Try later");
                        })

                } else {
                    // Username is already used by someone
                    res.status(422).send('Username Already Exists');

                }
            })
            .catch(err => {
                return res.status(500).send('Server Error');
            })

    } else {

        // username was not changed

        // calling update profile function
        await userUpdateProfile(req._id, req.body.newProfile)
                .then((data) => {
                    res.status(200).end();
                }).catch((e) => {
                    res.status(400).send('Bad Request');
                });
            }
}
module.exports = {
    editUserProfile
};