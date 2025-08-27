import React, { useEffect, useState } from "react";
import AdminLayout from '../../Comonents/Layouts/Admin Layout/adminLayout'
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Files, FileX2, ImageDown, ShieldUser, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { All_Files, All_users, Delete_File, Delete_User, Update_Role} from "../../Services/api";
import toast from "react-hot-toast";


const AdminDashboard = () => {
  const user = useSelector((state) => state.user);
       const token = useSelector((state) => state.user.token);
    const [open, setOpen] = useState(false);
    const [openFile, setOpenFile] = useState(false);

     const [files, setFiles] = useState([]);
           const [selectedFile, setSelectedFile] = useState(null);
           const [fileId, setFileid] = useState("");
           const [users, setUsers] = useState([]);
             const [UserId, setUserId] = useState("");
             const [openDropdownId, setOpenDropdownId] = useState(null);
             const [selectedUser, setSelectedUser] = useState(null);
           
           
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
    }, [token]);


 // Fetch all users
  const fetchUsers = async () => {
    try {
     
        const res = await All_users(token);
        if (res?.data) {
          setUsers(res.data.allUsers);
        
      }
    } catch (error) {
      console.error("Error fetching user files:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [token]);
    
  
  // handle delete file
  const deleteFile = async () => {
    try {
      const id = fileId;
      const deleteFile = await Delete_File(id, token);
      if (deleteFile) {
        console.log("file deleted successful!");
        toast.success("Your file deleted!!");
        setOpenFile(false);
        setFileid("");
        setSelectedFile(null);

        // 🔥 Refresh files after deletion
        fetchFiles();
      }
    } catch (error) {
      setOpenFile(false);
      toast.error("Something went wrong!");
    }
  };
 
  
  // handle delete user
  const handleDeleteUser = async () => {
    try {
      const id = UserId;
      const deleteUser = await Delete_User(id, token);
      if (deleteUser) {
        console.log("file deleted successful!");
        toast.success("Your file deleted!!");
        setOpen(false);
        setUserId("");
        setSelectedUser(null);

        // 🔥 Refresh files after deletion
        fetchUsers();
      }
    } catch (error) {
      setOpen(false);
      toast.error("Something went wrong!");
    }
  };

    // Update role
    const handleRoleChange = async (id, newRole) => {
  
      try {
        const thisUser = users.find((u) => u._id === id);
        if (!thisUser) return;
  
        if (thisUser.role === newRole) {
          setOpenDropdownId(null);
          return toast("Already " + newRole.toUpperCase(), { icon: "ℹ️" });
        }
  
        const res = await Update_Role(id, newRole, token);
  
        if (res?.data?.success) {
          setOpenDropdownId(null);
          setOpen(false);
          toast.success(`Role changed to ${newRole.toUpperCase()}`);
          fetchUsers();
        } else {
          toast.error(res?.data?.message || "Something went wrong!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error in updating role");
      }
    };
  

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Message */}
        {user && (
          <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mt-5" >Admin Dashboard</h1>
            <p className="text-xl font-semibold text-gray-800 mt-5">
              Welcome back <span className="font-bold text-red-500">{(user?.user?.name).toUpperCase()}</span>  👋
            </p>
            <p className="text-gray-600 mt-3">
              Manage users and files.
            </p>
          </div>
        )}

        {/* Stats Section */}
       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <NavLink to={"/dashboard/admin/all-users"}>
          <div className=" bg-red-100 mt-5 border border-gray-200 rounded-lg p-4 shadow-sm text-center font-bold text-red-500 hover:bg-red-200">
       <p className="text-xl">{users.length}</p>
          <div className="flex justify-center gap-2">
          <Files/>
            <p>
              No of Users
            </p>
            </div>
          </div>
</NavLink>


 <NavLink to={"/dashboard/admin/all-files"}>
          
          <div className=" bg-red-100 border mt-5 border-gray-200 rounded-lg p-4 shadow-sm text-center font-bold text-red-500 hover:bg-red-200">
          <p className="text-xl">{files.length}</p>
          <div className="flex justify-center gap-2">
          <ImageDown />
            <p>
              No of Files
            </p>
            </div>
          </div>
    </NavLink>
          
        </div>


        {/* ------------------------- files section ------------------------ */}
        
          <div className="p-6 max-w-6xl mx-auto">
               

        
                {/* Upload button */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <div className="flex justify-between">
                    <p className="text-left font-bold text-xl text-red-500">
                      All Files......
                    </p>
        
                  </div>
        
                  {/* No File State */}
                  {files.length === 0 ? (
                    <div className="mt-4 text-center border border-dashed border-red-300 p-4 rounded-lg">
                      <div className="flex justify-center">
                        <FileX2 />
                      </div>
                      <p className="font-bold text-gray-600">No files to show...</p>
        
                     
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
                                setOpenFile(true);
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
                <Dialog open={openFile} onClose={setOpenFile} className="relative z-10">
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
                          onClick={() => setOpenFile(false)}
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

        {/* ------------------------- users section ------------------------ */}


           <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-red-500">All Users</h1>
        </div>

        {/* List */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="flex justify-between">
            <p className="text-left font-bold text-xl text-red-500">List of Users</p>
          </div>

          {users.length === 0 ? (
            <div className="mt-4 text-center border border-dashed border-red-300 p-4 rounded-lg">
              <div className="flex justify-center">
                <FileX2 />
              </div>
              <p className="font-bold text-gray-600">No users found</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="mt-3 border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4 text-red-500">
                    🗂️
                    <h1 className="font-semibold text-gray-500">{user.name}</h1>
                  </div>

                  <div className="flex items-center gap-4 font-semibold text-gray-500">
                    Role : {user?.role?.toUpperCase()}
                  </div>

                  <div
                    className="mt-3 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-4 relative"
                    data-role-dropdown
                  >
                    {/* Delete */}
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setOpen(true);
                          setUserId(user._id);
                        }}
                        className="flex items-center gap-2 px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        <Trash2 />
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => toast.error(`Can't Delete Admin`)}
                        className="flex items-center gap-2 px-2 py-2 bg-red-300 text-white rounded-lg"
                      >
                        <Trash2 />
                        Delete
                      </button>
                    )}

                    {/* Change role toggle */}
                    <button
                      onClick={() =>
                        setOpenDropdownId(openDropdownId === user._id ? null : user._id)
                      }
                      className="flex items-center gap-1 px-2 py-2 bg-gray-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <ShieldUser />
                      Change Role
                    </button>

                    {/* Dropdown */}
                    {openDropdownId === user._id && (
                      <div className="absolute right-0 top-full mt-2 w-36 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleRoleChange(user._id, "user")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            User
                          </button>
                          <button
                            onClick={() => handleRoleChange(user._id, "admin")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Admin
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirm Delete Dialog */}
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-black/50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                </div>
                <DialogTitle className="text-lg font-bold text-gray-900">Delete user</DialogTitle>
              </div>

              <p className="text-gray-600 mt-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold">"{selectedUser?.name}"</span>? This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
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
  );
};

export default AdminDashboard;



// {/* -------------------------for testing------------------------ */}

// <div>
// <pre>{JSON.stringify(user, null, 2)}</pre>
//  <pre>{JSON.stringify(excel, null, 2)}</pre>
// </div>