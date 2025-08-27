import React, { useEffect, useState } from "react";
import Layout from "../../Comonents/Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {  ChartSpline, FileInput, Files, FileX2,Trash2 } from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Delete_File, User_Files } from "../../Services/api";
import toast from "react-hot-toast";
import { setExcelData } from "../../Redux/excelDataSlice";


const UserDashboard = () => {
  const user = useSelector((state) => state.user);
     const token = useSelector((state) => state.user.token);
    const [open, setOpen] = useState(false);
     const [files, setFiles] = useState([]);
       const [selectedFile, setSelectedFile] = useState(null);
       const [fileId, setFileid] = useState("");

  const dispatch = useDispatch();     
  const navigate = useNavigate();

  // Fetch uploaded files
    const fetchFiles = async () => {
      try {
        if (user?.user._id) {
          const res = await User_Files(user?.user._id, token);
          if (res?.data) {
            setFiles(res.data.allFiles);
            console.log(res.data.allFiles);
          }
        }
      } catch (error) {
        console.error("Error fetching user files:", error);
      }
    };
  
    useEffect(() => {
      fetchFiles();
      // eslint-disable-next-line
    }, [user, token]);
  
    // handle delete file
    const deleteFile = async () => {
      try {
        const id = fileId;
        const deleteFile = await Delete_File(id, token);
        if (deleteFile) {
          console.log("file deleted successful!");
          toast.success("Your file deleted!!");
          setOpen(false);
          setFileid("");
          setSelectedFile(null);
  
          // 🔥 Refresh files after deletion
          fetchFiles();
        }
      } catch (error) {
        setOpen(false);
        toast.error("Something went wrong!");
      }
    };
  
  //handle create chart
    const handleCreateChart = (data)=>{
      if(data){
       localStorage.setItem("excel", JSON.stringify(data));
          dispatch(setExcelData(data))
           navigate('/dashboard/user/Upload-file')
      }
       
    }

  return (
    <Layout>
<div className="space-y-6">
        {/* Welcome Message */}
        {user && (
          <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mt-5" >User Dashboard</h1>
            <p className="text-xl font-semibold text-gray-800 mt-5">
              Welcome back <span className="font-bold text-red-500">{(user?.user?.name).toUpperCase()}</span>  👋
            </p>
            <p className="text-gray-600 mt-3">
              Manage your Excel visualizations and charts.
            </p>
          </div>
        )}

        {/* Stats Section */}
       
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-4">

            <NavLink to={"/dashboard/user/Uploaded-files"}>
          
          <div className=" bg-red-100 border mt-5 border-gray-200 rounded-lg p-4 shadow-sm text-center font-bold text-red-500 hover:bg-red-200">
       <p className="text-xl">{files.length}</p>
          <div className="flex justify-center gap-2">
          
          
          <Files/>
            <p>
              Files Uploaded
            </p>
            </div>
          </div>
              </NavLink>

       <NavLink to={"/dashboard/user/Upload-file"}>
  <div className="bg-red-100 border mt-5 border-gray-200 rounded-lg p-4 shadow-sm text-center font-bold text-red-500 hover:bg-red-200 flex flex-col items-center justify-center gap-2">
    {/* Icon on top */}
    <FileInput className="w-6 h-6" /> 
    {/* Text below */}
    <p>Upload New File</p>
  </div>
</NavLink>

          
        </div>

{/* ------------------------- files section ------------------------ */}

  <div className="p-6 max-w-6xl mx-auto">
       

        {/* Upload button */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="flex justify-between">
            <p className="text-left font-bold text-xl text-red-500">
              Recent Uploaded Files
            </p>

            {/* <div className="flex justify-center">
              <button
                onClick={() => navigate("/dashboard/user/Upload-file")}
                className="flex gap-2 mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <FileInput />
                Upload File
              </button>
            </div> */}
          </div>

          {/* No File State */}
          {files.length === 0 ? (
            <div className="mt-4 text-center border border-dashed border-red-300 p-4 rounded-lg">
              <div className="flex justify-center">
                <FileX2 />
              </div>
              <p className="font-bold text-gray-600">No file found</p>

              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/dashboard/user/Upload-file")}
                  className="flex gap-2 mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <FileInput />
                  Upload New File
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {files.map((file) => (
                <div
                  key={file._id}
                  className="mt-3 border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4 text-red-500">
                    🗂️
                    <h1 className="font-semibold text-gray-500">
                      {file.fileName}
                    </h1>
                  </div>
                  <div className="mt-3 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-4">
                    <button
                      onClick={() => {
                        setSelectedFile(file);
                        setOpen(true);
                        setFileid(file._id);
                      }}
                      className="flex items-center gap-2 px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <Trash2 />
                      Delete
                    </button>
                     <button 
                       onClick={()=>handleCreateChart(file?.data)}
                      className="flex items-center gap-1 px-2 py-2 bg-gray-500 text-white rounded-lg hover:bg-red-600 transition">
                        <ChartSpline />
                      Create Chart
                        </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------------------- Dialog Box ---------------------------- */}
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-black/50" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  Delete File
                </DialogTitle>
              </div>

              <p className="text-gray-600 mt-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  "{selectedFile?.fileName}"
                </span>
                ? This action cannot be undone.
              </p>

              {/* Dialog Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteFile()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>

        
       

</div>
    </Layout>
  );
};

export default UserDashboard;


// {/* -------------------------for testing------------------------ */}

// <div>
// <pre>{JSON.stringify(user, null, 2)}</pre>
//  <pre>{JSON.stringify(excel, null, 2)}</pre>
// </div>