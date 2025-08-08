import { Router } from "express";
import authUser from '../middlewares/authUser.middleware.js'
import createOrderController from "../controllers/orders/createOrderController.controller.js";

const ordersRouter = Router();

ordersRouter.post('/', authUser, createOrderController);


export default ordersRouter;