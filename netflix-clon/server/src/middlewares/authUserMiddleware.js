import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const authUserMiddleware = ( req, res, next ) => {
    try
    {
        const { authorization } = req.headers;
        if ( !authorization || !authorization.startsWith( 'Bearer ' ) )
        {
            return next( generateErrorUtil( 'Falta la cabecera de autenticación o formato incorrecto', 401 ) );
        }

        const token = authorization.split( ' ' )[ 1 ]; // Extrae el token después de "Bearer"

        try
        {
            const tokenInfo = jwt.verify( token, process.env.SECRET );
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