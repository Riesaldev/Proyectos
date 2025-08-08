import { Router } from "express";
import registeruserController from "../controllers/users/registerUserController.controller.js";
import loginUserController from "../controllers/users/loginUserController.controller.js";
import getOwnUserController from "../controllers/users/getOwnUserController.controller.js";
import editUserController from "../controllers/users/editUserController.controller.js";
import getOrdersController from "../controllers/users/getOrdersController.controller.js";

import authUser from '../middlewares/authUser.middleware.js';

const userRouter = Router();

userRouter.get('/', authUser, getOwnUserController);
userRouter.post('/register', registeruserController);
userRouter.post('/login', loginUserController);

userRouter.put('/edit', authUser, editUserController);

userRouter.get('/orders', authUser, getOrdersController);
export default userRouter;