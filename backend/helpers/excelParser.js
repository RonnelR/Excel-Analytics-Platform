import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export const excelParser = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("Excel file not found at path: " + filePath);
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      throw new Error("No sheets found in Excel file.");
    }

    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    if (!jsonData || jsonData.length === 0) {
      throw new Error("Excel sheet is empty or invalid format.");
    }

    return jsonData;
  } catch (error) {
    console.error("Error while parsing Excel:", error.message);
    throw error; // Let the controller handle the response
  }
};
