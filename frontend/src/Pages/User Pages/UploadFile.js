import React, { useState } from "react";
import Layout from "../../Comonents/Layouts/Layout";
import { excel_data, upload_file } from "../../Services/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { clearExcelData, setExcelData } from '../../Redux/excelDataSlice';
import { resetAxis, setAxis } from "../../Redux/chartSlice";

import DataPreviewTable from "../../Comonents/DataPreviewTable";
import { ChartSpline, CircleX, FileInput } from "lucide-react";

const UploadFile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.token;

  const excelData = useSelector((state) => state.excelData);

  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedValueXaxis, setselectedValueXaxis] = useState("");
  const [selectedValueYaxis, setselectedValueYaxis] = useState("");

  const headers = excelData?.excelData?.length
    ? Object.keys(excelData.excelData[0])
    : [];

  const Navigate = useNavigate();

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e?.target?.files[0];
    setFile(selectedFile);
  };

  // Upload file
  const handleUploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await upload_file(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    const fileId = res.data.excelData._id;

    toast.success("File Uploaded successfully");

    const excelResponse = await excel_data(fileId);
    if (excelResponse) {
      localStorage.setItem("excel", JSON.stringify(excelResponse.data));
      dispatch(setExcelData(excelResponse?.data?.data));
    }
  };

  const handleCreate = () => {
    if (!selectedValueXaxis || !selectedValueYaxis) {
      return toast.error("Please select X & Y axis");
    } else {
      localStorage.setItem("selectedX", selectedValueXaxis);
      localStorage.setItem("selectedY", selectedValueYaxis);

      dispatch(
        setAxis({
          x: selectedValueXaxis,
          y: selectedValueYaxis,
        })
      );

      Navigate("/dashboard/user/visualization");
    }
  };

  const handleClearFile = () =>{
    localStorage?.removeItem("excel")
    localStorage?.removeItem("selectedX")
    localStorage?.removeItem("selectedY")   
     dispatch(clearExcelData(null));
     dispatch(resetAxis(null));
     setFile(null)

  }

  return (
    <Layout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        {/* If excel data already uploaded */}
        {excelData?.excelData?.length > 0 ? (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-2xl p-6 border">
            
              <DataPreviewTable data={excelData?.excelData} />
  <div className="flex flex-wrap justify-between m-4 p-4">
                <button
                onClick={()=>handleClearFile()}
                 className="flex gap-2  bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                <FileInput/>
                  Upload New File
                </button>
                <button 
                onClick={()=>handleClearFile()}
                 className="flex gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                <CircleX/>
                  Cancel
                </button>
              </div>

            </div>

            {/* Axis selection */}
            <div className="bg-white shadow-md rounded-2xl p-6 border">
              <h2 className="text-lg font-semibold mb-4 text-red-500">
                Chart Configuration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* X-axis */}
                <div>
                  <label className="block text-gray-600 mb-2">Select X-axis</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={selectedValueXaxis}
                    onChange={(e) => setselectedValueXaxis(e.target.value)}
                  >
                    <option value="">Please select</option>
                    {headers?.map((header) => (
                      <option key={`x-${header}`} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Y-axis */}
                <div>
                  <label className="block text-gray-600 mb-2">Select Y-axis</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={selectedValueYaxis}
                    onChange={(e) => setselectedValueYaxis(e.target.value)}
                  >
                    <option value="">Please select</option>
                    {headers?.map((header) => (
                      <option key={`y-${header}`} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleCreate}
                  className="flex gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                <ChartSpline />
                  Create Charts
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Upload section */
          <div className="bg-white shadow-md rounded-2xl p-6 border">
            <h1 className="text-xl font-bold mb-2 text-red-500">Upload File</h1>
            <p className="mb-4 text-gray-600">
              Upload your Excel file to visualize & analyze your data
            </p>

            <div
              className={` border-2 border-dashed p-8 rounded-xl cursor-pointer transition-colors ${
                dragOver ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("inputFile").click()}
            >
              <p className="text-center text-3xl">📂</p>
              <p className="text-center text-gray-600 font-semibold mt-2">
                {file ? `${file?.name}` : "Drag & drop your file here"}
              </p>
              <input
                type="file"
                id="inputFile"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Upload & cancel buttons */}
            <div className="flex justify-center gap-4 mt-6">
              {file && (
                <>
                  <button
                    className="flex gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                    onClick={()=>handleUploadFile()}
                  >
                   <FileInput />
                    Upload File
                  </button>
                  <button
                    className="flex gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                    onClick={() => setFile(null)}
                  >
                  <CircleX />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </Layout>
  );
};

export default UploadFile;
