import express from 'express';

import authUserMiddleware from '../middlewares/authUserMiddleware.js';

import {
    loginUserController,
    privateUserProfileController,
    updateUserPassController,
    updateUserController,
    registerUserController,
    activateUserController,
    sendRecoveryPassEmailController,
    useRecoveryPassCodeController,
    userAvatarController,
    userProfilesController,
} from '../controllers/users/index.js';

const router = express.Router();

router.post( '/register', registerUserController );

router.put( '/validate/:regCode', activateUserController );

router.post( '/login', loginUserController );
router.post( '/password', authUserMiddleware, updateUserPassController );

router.put( '/password/reset', sendRecoveryPassEmailController );

router.put( '/password/reset/:recoverPassCode', useRecoveryPassCodeController );

router.put( '/profile', authUserMiddleware, updateUserController );

router.put( '/avatar', authUserMiddleware, userAvatarController );

router.get( '/profile', authUserMiddleware, privateUserProfileController );

router.get( '/:userId/profiles', authUserMiddleware, userProfilesController );

router.get( '/:userId', authUserMiddleware, privateUserProfileController );

export default router;