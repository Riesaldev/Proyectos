import selectAllOrdersService from "../../services/users/selectAllOrdersService.service.js";

const getOrdersController = async (req, res, next) => {
    try {
        
        const orders = await selectAllOrdersService(req.user.id);

        res.send({
            status: 'ok',
            data: {
                orders
            }
        });

    } catch (error) {
        next(error);
    }
}

export default getOrdersController;