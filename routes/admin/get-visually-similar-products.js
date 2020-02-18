const axios = require('axios').default;


const getVisuallySimilarProducts = (req, res) => {

    /**
     * body should have
     * source:<image url>,
     * bbox:[x0,y0,x1,y1]{optional},
     * 
     */

    axios.post(process.env.IMAGE_SEARCH_URL, {
        source: req.body.source,
        bbox: req.body.bbox || null
    })
        .then((resp) => {
            let similarProducts=[]
            similarProducts=resp.data.productArray.map(i=>{
                return({
                    productId:i.productId,
                    imageUrl:i.image,
                    price:i.price,
                    ecommerce:i.ecommerce,
                    brandName:i.brandName,
                    imageUrl:i.image
                })
            })
            res.send({products:similarProducts})
        })
        .catch((error) => {
            console.log("error searching visually similar products ", error);
            res.status(400).end();
        });



}
module.exports = {
    getVisuallySimilarProducts
}