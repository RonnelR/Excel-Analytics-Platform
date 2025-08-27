import path from 'path';
import { excelParser } from '../helpers/excelParser.js';
import { excelDataModel } from '../models/UploadFileModel.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from "@google/generative-ai";

// import OpenAI from 'openai';

dotenv.config()

// const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
// initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


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

//-------------all files of user controller-----------------------


export const userFileController = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.trim(); // remove extra spaces
   

    // Check if valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const allFiles = await excelDataModel
      .find({ createdBy: id })
      .sort({ createdAt: -1 });

    if (allFiles.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No files found for this user",
        noOfFiles: 0,
        allFiles: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "All files of the user",
      noOfFiles: allFiles.length,
      allFiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in user files",
      
      error: error.message,
    });
  }
};


//-------------all filescontroller-----------------------
export const allFilesController = async (req,res) =>{
      try {
        const allFiles = await excelDataModel.find({})
        if(allFiles){
           res.status(200).json({
          success:true,
          message:'all files.',
          allFiles
        })
        }
      } catch (error) {
        res.status(400).json({
          success:false,
          message:'Error in getting all files.',
          error
        })
      }
}

//------------- delete file controller-----------------------
export const deleteFileController = async (req,res)=>{
  try {

    const deleteFile = await excelDataModel.findByIdAndDelete(req.params.id)
    if(!deleteFile){
       res.status(400).json({
      success:false,
      message:"Error in deleting file!",
    })
    }else{
 res.status(200).json({
      success:true,
      message:"File is deleted!",
    })
    }
    
  } catch (error) {
    res.status(400).json({
      success:false,
      message:"Error in deleting file",
      error

    })
  }
}


//------------- data insight - geminit ai controller-----------------------

export const dataInsightController = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || data.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    // use the initialized genAI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a data analyst. Analyze the dataset and return 3-5 key insights.
      Respond ONLY in JSON array format, each with an "insight" field.
      Dataset: ${JSON.stringify(data)}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

let insights;
try {
  insights = JSON.parse(responseText);
  if (!Array.isArray(insights)) {
    insights = [{ insight: responseText }];
  }
} catch (err) {
  // Extract insights from messy text
  const matches = responseText.match(/"insight"\s*:\s*"([^"]+)"/g);
  if (matches) {
    insights = matches.map((m) => ({ insight: m.split('"')[3] }));
  } else {
    insights = [{ insight: responseText }];
  }
}


    res.status(200).json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error("Insight generation error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating data insights",
      error: error.message,
    });
  }
};
