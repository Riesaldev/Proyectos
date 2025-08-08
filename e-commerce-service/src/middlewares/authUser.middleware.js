import jwt from 'jsonwebtoken';
import generateErrorUtils from '../utils/generateErrorUtils.js';

const authUser = (req, res, next) => {
    try {
        
        const { authorization } = req.headers;

        if(!authorization) throw generateErrorUtils('Se esperaba token por header', 401);

        let tokenInfo;

        try {
            
            tokenInfo = jwt.verify(authorization, process.env.SECRET);

        } catch (error) {
            generateErrorUtils('Credenciales inválidas', 401);
        }

        req.user = tokenInfo;

        next();
    } catch (error) {
        next(error);
    }
}

export default authUser;