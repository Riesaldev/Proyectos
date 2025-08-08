import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateErrorUtils from "../../utils/generateErrorUtils.js";
import selectUserByEmailService from "../../services/users/selectUserByEmailService.service.js";

const loginUserController = async (req, res, next) => {
    try {
        
        const { email, password } = req.body;

        if(!email || !password) throw generateErrorUtils('Se esperaba email y password', 400);

        const user = await selectUserByEmailService(email);

        let validPassword;

        if(user) {
            validPassword = await bcrypt.compare(password, user.password);
        }

        if(!user || !validPassword) throw generateErrorUtils('Usuario o contraseña incorrecta', 401);

        const tokenInfo = {
            id: user.id,
            role: user.role
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '12h'
        });

        res.send({
            status: 'ok',
            data: {
                token
            }
        });

    } catch (error) {
        next(error);
    }
}

export default loginUserController;