import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export const excelParser = (filePath) => { 
  try {
    if (!fs.existsSync(filePath)) { //check file exists in the path
      throw new Error("Excel file not found at path: " + filePath);
    }

    const workbook = XLSX.readFile(filePath);//Load excel file in memory & Creates a workbook object and parse xml
    const sheetName = workbook.SheetNames[0];// 1st sheet as defualt

    if (!sheetName) {
      throw new Error("No sheets found in Excel file.");
    }

    const sheet = workbook.Sheets[sheetName]; //accessig sheet
    const jsonData = XLSX.utils.sheet_to_json(sheet);//parsig excel to json

    if (!jsonData || jsonData.length === 0) {//checking if jsondata exists
      throw new Error("Excel sheet is empty or invalid format.");
    }

    return jsonData;
  } catch (error) {
    console.error("Error while parsing Excel:", error.message);
    throw error; // Let the controller handle the response
  }
};
