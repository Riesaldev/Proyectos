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

import addProfileController from "../controllers/users/addProfileController.js";
import deleteProfileController from "../controllers/users/deleteProfileController.js";

const router = express.Router();

// ruta para registrar un nuevo usuario
router.post( '/register', registerUserController );

// ruta para activar un usuario
router.put( '/validate/:regCode', activateUserController );

// ruta para iniciar sesión
router.post( '/login', loginUserController );

// ruta para update la contraseña del usuario
router.post( '/password', authUserMiddleware, updateUserPassController );

// ruta para enviar un email de recuperación de contraseña
router.put( '/password/reset', sendRecoveryPassEmailController );

// ruta para usar el código de recuperación de contraseña
router.put( '/password/reset/:recoverPassCode', useRecoveryPassCodeController );

// ruta para actualizar el usuario
router.put( '/profile', authUserMiddleware, updateUserController );

// ruta para actualizar el avatar del usuario
router.put( '/avatar', authUserMiddleware, userAvatarController );

// ruta para obtener los diferentes perfiles del usuario
router.get( '/:userId/profiles', authUserMiddleware, userProfilesController );

// ruta para obtener el perfil público del usuario
router.get( '/:userId', authUserMiddleware, privateUserProfileController );

// ruta para crear un nuevo perfil
router.post( '/profiles', authUserMiddleware, addProfileController );

// ruta para eliminar un perfil
router.delete( '/profiles/:profileId', authUserMiddleware, deleteProfileController );

export default router;