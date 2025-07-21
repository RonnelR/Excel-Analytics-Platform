import express from "express";
import upload from "../config/multer.js";
import { uploadFileController } from "../controllers/fileUploadController.js";

//router config
const router = express.Router()


//post api for file uploads
router.post('/upload-file', upload.single('file'),uploadFileController);

export default router;    