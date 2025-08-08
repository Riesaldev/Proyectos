import { Router } from "express";
import userRouter from "./users.routes.js";
import productsRouter from "./products.routes.js";
import ordersRouter from "./orders.routes.js";

const router = Router();

router.use('/users', userRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

export default router;