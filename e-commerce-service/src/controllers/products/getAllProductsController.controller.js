import selectAllProductsService from "../../services/products/selectAllProductsService.service.js";

const getAllProductsController = async (req, res, next) => {
    try {
        
        const products = await selectAllProductsService();

        res.send({
            status: 'ok',
            data: {
                products
            }
        });

    } catch (error) {
        next(error);
    }
}

export default getAllProductsController;