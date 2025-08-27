import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {FileX2, Trash2 } from "lucide-react";

import { All_Files, Delete_File } from "../../Services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import AdminLayout from "../../Comonents/Layouts/Admin Layout/adminLayout";

const AllFiles = () => {

   const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);


  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileId, setFileid] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch uploaded files
  const fetchFiles = async () => {
    try {
      if (token) {
        const res = await All_Files(token);
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
 
  
  return (
    <AdminLayout>
 <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-red-500">All Files</h1>
        </div>

        {/* Upload button */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="flex justify-between">
            <p className="text-left font-bold text-xl text-red-500">
              List of Files
            </p>

          </div>

          {/* No File State */}
          {files.length === 0 ? (
            <div className="mt-4 text-center border border-dashed border-red-300 p-4 rounded-lg">
              <div className="flex justify-center">
                <FileX2 />
              </div>
              <p className="font-bold text-gray-600">No file found</p>

             
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
                    {/* <button className="flex items-center gap-1 px-2 py-2 bg-gray-500 text-white rounded-lg hover:bg-red-600 transition">
                      <ChartSpline />
                      Create Chart
                    </button> */}
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
    </AdminLayout>
   
  )
}

export default AllFiles;

