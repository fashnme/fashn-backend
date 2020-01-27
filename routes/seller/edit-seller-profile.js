const { checkEcommerceName } = require('../../controllers/helpers/elasticSearch-helpers/check-ecommerce-name')
const { sellerUpdateProfile } = require('../../controllers/helpers/elasticSearch-helpers/seller-update-profile')
const editSellerProfile = async (req, res) => {

    /**
     * expects two params in body
     * - ecommerceNameChanged [bool] => true if it has changed
     * - newProfile [object] => having the new seller profile
     */
    if (req.body.ecommerceNameChanged) {

        await checkEcommerceName()
            .then(async (data) => {
                if (data.count == 0) {
                    // can be used

                    // calling update seller profile function
                    await sellerUpdateProfile(req._id, req.body.newProfile)

                        .then(data => {
                            res.status(200).end()
                        }).catch(e => {
                            res.status(400).end()
                        })

                } else {
                    // Ecommerce name is already used by someone
                    res.status(422).end();

                }
            })
            .catch(err => {
                return res.status(500).end();
            })

    } else {

        // ecommerce name was not changed

        // calling update profile function
        await sellerUpdateProfile(req._id, req.body.newProfile)

            .then(data => {
                res.status(200).end()
            }).catch(e => {
                res.status(400).end()
            })


    }
}
module.exports = {
    editSellerProfile
}