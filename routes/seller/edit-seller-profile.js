const { sellerUpdateProfile } = require('../../controllers/helpers/elasticsearch-helpers/seller-update-profile')
const editSellerProfile = async (req, res) => {

    /**
     * expects one param in body
     * --> newProfile [object] => having the new seller profile
     * NOTE: ecommerceName cannot be changed
     */

    if (req.body.newProfile.hasOwnProperty('ecommerceName') && req.body.newProfile.ecommerceName !== req._id) {
        return res.status(422).json({ error: "ecommerce name cant be changed" })
    }

    // calling update profile function
    await sellerUpdateProfile(req._id, req.body.newProfile)
        .then((data) => {
            res.status(200).end()
        }).catch(e => {
            res.status(400).end()
        })


}
module.exports = {
    editSellerProfile
}