//all authentication endpoints
import express from 'express';
import {adminTestController, forgotPasswordController, loginController, registerController, testController } from '../controllers/authController.js';
import { isAdmin, isSignInRequired } from '../middlewares/auth.js';

const router = express.Router();


//router for registration
router.post('/registration',registerController)
router.post('/login',loginController)
router.get('/test',isSignInRequired,testController) 
router.put('/forgot-password',forgotPasswordController)
//router.get('/admin',isSignInRequired,isAdmin, adminTestController)
router.get('/user-auth',isSignInRequired,(req,res)=>{res.status(200).json({ok:true})})
router.get('/admin-auth',isSignInRequired,isAdmin, (req,res)=>{res.status(200).json({ok:true})})


export default router;