import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FileX2, ShieldUser, Trash2 } from "lucide-react";
import { All_users, Delete_User, Update_Role } from "../../Services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import AdminLayout from "../../Comonents/Layouts/Admin Layout/adminLayout";

const AllUsers = () => {
  const token = useSelector((state) => state.user.token);

  const [open, setOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [users, setUsers] = useState([]);
  const [UserId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      // If click is not inside a role dropdown area, close it
      if (!e.target.closest("[data-role-dropdown]")) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await All_users(token);
      if (res?.data) {
        setUsers(res.data.allUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [token]);

  // Delete user
  const handleDeleteUser = async () => {
    try {
      const id = UserId;
      const deleteUser = await Delete_User(id, token);
      if (deleteUser?.data?.success) {
        toast.success("User deleted!");
        setOpen(false);
        setUserId("");
        setSelectedUser(null);
        fetchUsers();
      } else {
        toast.error(deleteUser?.data?.message || "Something went wrong!");
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

export default AllUsers;
