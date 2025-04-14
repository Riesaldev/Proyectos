import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './src/routes/userRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';

const { PORT, UPLOADS_DIR } = process.env;

const app = express();

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

app.use( '/uploads', express.static( path.join( __dirname, UPLOADS_DIR ) ) );

app.use( morgan( 'dev' ) );

app.use( cors() );

app.use( express.json() );
app.use( fileUpload() );

app.use( '/api/users', userRoutes );
app.use( '/api/admin', adminRoutes );

app.get( '/', ( req, res ) => {
    res.send( 'API de Riflix' );
} );

app.use( ( err, req, res, next ) => {
    console.error( err );
    res.status( err.status || 500 ).send( {
        status: 'error',
        message: err.message || 'Internal Server Error',
    } );
} );

app.use( ( req, res ) => {
    res.status( 404 ).send( {
        status: 'error',
        message: 'Ruta no encontrada',
    } );
} );

app.listen( PORT, () => {
    console.log( `Servidor escuchando en el puerto ${ PORT }` );
} );