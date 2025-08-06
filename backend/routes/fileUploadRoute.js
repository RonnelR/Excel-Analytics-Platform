import express from "express";
import upload from "../config/multer.js";
import { singleExcelDataController, uploadFileController } from "../controllers/fileUploadController.js";
import { isSignInRequired } from "../middlewares/auth.js";

//router config
const router = express.Router()


//post api for file uploads
router.post('/upload-file',isSignInRequired, upload.single('file'),uploadFileController);


//get api for excel data read
router.get('/single-excel-data/:fileId',singleExcelDataController);

export default router;    