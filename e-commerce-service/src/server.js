import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';

const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.use(router);

server.use((error, req, res, next) => {
    console.log(error);

    res.status(res.httpStatus || 500).send({
        status: 'error',
        message: error.message
    });
})

server.use((req, res) => {
    res.status(404).send({
        status: 'route error!',
        message: 'Not found'
    });
})

export default server;