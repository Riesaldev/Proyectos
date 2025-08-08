import insertNewOrderService from "../../services/orders/insertNewOrderService.service.js";

const createOrderController = async (req, res, next) => {
    try {
        
        const { products } = req.body;

        await insertNewOrderService(req.user.id, products);

        res.send({
            status: 'ok',
            message: 'La orden de compra fue registrada correctamente'
        });

    } catch (error) {
        next(error);
    }
}

export default createOrderController;