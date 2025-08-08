import { Router } from "express";
import getAllProductsController from "../controllers/products/getAllProductsController.controller.js";
import getProductController from "../controllers/products/getProductController.controller.js";

const productsRouter = Router();

productsRouter.get('/', getAllProductsController);
productsRouter.get('/:productId', getProductController);

export default productsRouter;