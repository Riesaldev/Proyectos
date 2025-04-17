import express from 'express';

import authAdminMiddleware from '../middlewares/authAdminMiddleware.js';
import authUserMiddleware from '../middlewares/authUserMiddleware.js';

import {
    userListController,
    deleteUserController,
    updateUserStatusController,
} from '../controllers/admins/index.js';

const router = express.Router();

router.get(
    '/users/list',
    authUserMiddleware,
    authAdminMiddleware,
    userListController,
);

router.delete(
    '/users/:id',
    authUserMiddleware,
    authAdminMiddleware,
    deleteUserController,
);

router.patch(
    '/users/:id/:active',
    authUserMiddleware,
    authAdminMiddleware,
    updateUserStatusController,
);

export default router;