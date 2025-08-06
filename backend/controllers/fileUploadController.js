import path from 'path'
import fs from 'fs'
import { excelParser } from '../helpers/excelParser.js';
import { excelDataModel } from '../models/UploadFileModel.js';


//-----------------------upload file controller-----------------------------------------------
export const uploadFileController = async (req,res) => {
    try {


    //checing for file
    const AvailableFile = req.file;

if (AvailableFile) {

//file path set
    const filePath = path.resolve('uploads',AvailableFile.filename)
    //excel data parsed
   const parsedData = excelParser(filePath)


    //stored in mongoDB 
    const excelData = await excelDataModel.create({
         fileName:AvailableFile.filename,
             createdBy:req.user.id,
            data:parsedData
    })

     return res.status(200).json({
            success:true,
            message:"file uploaded successful and stored!",
            excelData
        })
    }else{

    return res.status(400).json({
            success:false,
            message:"Did't reciveve any file ",
        })

    }

    } catch (error) {
        console.log('error in uploading file')
        res.status(401).json({
            success:false,
            message:"error in uploading file",
            error
        })
    }
}


//-----------------------single excel data controller-----------------------------------------------
export const singleExcelDataController = async (req,res)=>{
try {

    const {fileId} = req.params 
 
    const excelData = await excelDataModel.findById(fileId)
    if(!excelData){
      return res.status(404).json({
            success:false,
            message:"Something went wrong!",
    })
    }
return res.status(200).json({
            success:true,
            message:"Excel data!",
            data:excelData?.data

        })
    
} catch (error) {
   return res.status(500).json({
            success:false,
            message:"error in uploading file",
            error
        })
}
}