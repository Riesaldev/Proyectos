
// Accedemos a las variables del fichero ".env" y las añadimos a la lista de variables de entorno.
import 'dotenv/config';
// Importamos las dependencias.
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
// Importamos las rutas.
import usersRoutes from './src/routes/userRoutes';
import entriesRoutes from './src/routes/entryRoutes';
// Obtenemos las variables de entorno necesarias.
const { PORT } = process.env;
// Creamos una aplicación Express (el servidor).
const app = express();
// Middleware que muestra por consola información acerca de la petición entrante.
app.use(morgan('dev'));
// Middleware que evita problemas de conexión entre cliente y servidor.
app.use(cors());
// Middleware que permite subir archivos.
app.use(fileUpload());
// Rutas de la aplicación.
app.use('/api/users', usersRoutes);
app.use('/api/entries', entriesRoutes);
// Indicamos al servidor que escuche peticiones en un puerto específico.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// Middleware que permite leer un body en formato JSON.
app.use(express.json());
// Middleware que permite leer un body en formato form-data.
app.use(express.urlencoded({ extended: true }));
// Middleware que indica a Express dónde están las rutas.
app.use(express.static('public'));
// Middleware de manejo de errores.
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send('Error interno');
});
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});
// Middelware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});
// Indicamos al servidor que escuche peticiones en un puerto específico.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
