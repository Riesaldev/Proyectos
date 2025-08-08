import selectProductById from "../../services/products/selectProductById.service.js";

const getProductController = async (req, res, next) => {
    try {
        
        const {productId} = req.params;

        const product = await selectProductById(productId);

        res.send({
            status: 'ok',
            data: {
                product
            }
        });
        
    } catch (error) {
        next(error);
    }
}

export default getProductController;