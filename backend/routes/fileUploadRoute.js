import express from "express";
import upload from "../config/multer.js";
import { allFilesController, dataInsightController, deleteFileController, singleExcelDataController, uploadFileController, userFileController } from "../controllers/fileUploadController.js";
import { isAdmin, isSignInRequired } from "../middlewares/auth.js";

//router config
const router = express.Router()
router.post('/upload-file',isSignInRequired, upload.single('file'),uploadFileController);
router.get('/single-excel-data/:fileId',singleExcelDataController);
router.get('/user-files/:id',isSignInRequired,userFileController)
router.get('/all-files',isSignInRequired,isAdmin,allFilesController)
router.delete(`/delete-file/:id`,isSignInRequired,deleteFileController)
router.post('/data-insight',dataInsightController)

export default router;    