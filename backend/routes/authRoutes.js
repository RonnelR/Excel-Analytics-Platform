//all authentication endpoints
import express from 'express';
import {loginController, registerController, testController } from '../controllers/authController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();


//router for registration
router.post('/registration',registerController)
router.post('/login',loginController)
router.get('/test',auth,testController)

export default router;