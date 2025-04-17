import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const authUserMiddleware = ( req, res, next ) => {
    try
    {
        const { authorization } = req.headers;
        if ( !authorization )
        {
            return next( generateErrorUtil( 'Falta la cabecera de autenticación', 401 ) );

        }

        try
        {
            const tokenInfo = jwt.verify( authorization, process.env.SECRET );
            req.user = {
                userId: tokenInfo.id,
                role: tokenInfo.role,
            };
            next();
        } catch ( err )
        {
            console.error( err );
            return next( generateErrorUtil( 'Token inválido', 403 ) );
        }
    } catch ( err )
    {
        next( err );
    }
};

export default authUserMiddleware;