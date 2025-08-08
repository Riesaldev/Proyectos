import updateUserService from "../../services/users/updateUserService.service.js";

const editUserController = async (req, res, next) => {
    try {
        
        const {name, address, phone} = req.body;

        await updateUserService(req.user.id, name, address, phone);

        res.send({
            status: 'ok',
            message: 'Usuario actualizazdo correctamente'
        });
        
    } catch (error) {
        next(error);
    }
}

export default editUserController;