import generateErrorUtils from '../../utils/generateErrorUtils.js';
import insertUserService from '../../services/users/insertUserService.service.js';

const registeruserController = async (req, res, next) => {
    try {
        
        const { email, password } = req.body;

        if(!email || !password) throw generateErrorUtils('Se esperaba email y passord', 400);

        await insertUserService(email, password);

        res.send({
            status: 'ok',
            message: 'Usuario creado correctamente.'
        });

    } catch (error) {
        next(error);
    }
}

export default registeruserController;