import express from 'express';

import authAdminMiddleware from '../middlewares/authAdminMiddleware.js';
import authUserMiddleware from '../middlewares/authUserMiddleware.js';

import {
    usersListController,
    deleteUserController,
    updateUserStatusController,
} from '../controllers/admin/index.js';

const router = express.Router();

router.get(
    '/users/list',
    authUserMiddleware,
    authAdminMiddleware,
    usersListController,
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