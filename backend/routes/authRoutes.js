//all authentication endpoints
import express from 'express';
import {allUsersController, deleteUserController, forgotPasswordController, loginController, registerController, updateProfileController, updateRoleController, userPhotoController } from '../controllers/authController.js';
import { isAdmin, isSignInRequired } from '../middlewares/auth.js';
import formidable from 'express-formidable'; 

const router = express.Router();

//routers
router.post('/registration',registerController)
router.post('/login',loginController)
router.put('/forgot-password',forgotPasswordController)

router.get('/user-auth',isSignInRequired,(req,res)=>{res.status(200).json({ok:true})})
router.get('/admin-auth',isSignInRequired,isAdmin, (req,res)=>{res.status(200).json({ok:true})})

router.put('/update-profile/:id',isSignInRequired,formidable(),updateProfileController)
router.get('/user-photo/:id',userPhotoController)

//admin routers
router.get('/all-users',isSignInRequired,isAdmin,allUsersController)
router.delete('/delete-user/:id',isSignInRequired,isAdmin,deleteUserController)
router.patch('/update-role/:id',isSignInRequired,isAdmin,updateRoleController)

export default router;