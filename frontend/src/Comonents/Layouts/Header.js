import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../Assests/Logo_Png.png";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LogOut, UserRoundCog } from "lucide-react";


import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";


const Header = ({ onToggleSidebar, isSidebarOpen }) => {

 const user = useSelector((state)=>state.user.user)

const [open, setOpen] = useState(false);



  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [photoTimestamp] = useState(Date.now());


  const handleLogout = () => {
    // dispatch(logoutUser());
    localStorage?.removeItem("auth");
    localStorage?.removeItem("excel");
    localStorage?.removeItem("selectedX");
    localStorage?.removeItem("selectedY");
    toast.success("Logout successfully");
    setOpen(false)
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed w-full top-0 z-50">
      {/* Left section: Hamburger (mobile only) + Logo */}
      <div className="flex items-center space-x-3">
        {/* Hamburger menu */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          onClick={onToggleSidebar}
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          )}
        </button>

        {/* Logo + Brand */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto mr-3" />
          <span className="text-xl font-bold">REDGRAPH</span>
        </div>
      </div>

      {/* Right section: Profile Dropdown */}
      <Menu as="div" className="relative inline-block text-left">
        {() => (
          <>
            <div>
              <Menu.Button className="flex items-center space-x-2 focus:outline-none">


                {/* Avatar */}


     {user?.photo ?  
            <img
                src={`${process.env.REACT_APP_API_URL}/api/auth/user-photo/${user._id}?t=${Date?.now()}`}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-red-400"
              />
                    :
                
                 <div className="w-9 h-9 flex items-center justify-center bg-red-100 text-red-500 rounded-full text-center text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
                
                }

               
              </Menu.Button>
            </div>

            {/* Dropdown */}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="py-1">
                  {/* Profile */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                      onClick={()=>navigate('/profile')}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left ${
                          active ? "text-red-500 bg-gray-100" : "text-gray-700"
                        }`}
                      >
                        <UserRoundCog
                          className={`h-4 w-4 ${
                            active ? "text-red-500" : "text-gray-500"
                          }`}
                        />
                        Profile
                      </button>
                    )}
                  </Menu.Item>

                 

                  {/* Logout */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                         onClick={() => {
                          setOpen(true);
                        }}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left ${
                          active ? "text-red-500 bg-gray-100" : "text-red-500"
                        }`}
                      >
                        <LogOut
                          className={`h-4 w-4 ${
                            active ? "text-red-500" : "text-red-500"
                          }`}
                        />
                        Logout
                      </button>
                    )}
                  </Menu.Item>



                </div>
              </Menu.Items>
            </Transition>
          </>
        )}


      </Menu>


      {/* Confirm Delete Dialog */}
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-black/50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                </div>
                <DialogTitle className="text-lg font-bold text-gray-900">Logout</DialogTitle>
              </div>

              <p className="text-gray-600 mt-4">
                Are you sure you want to Logout ?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={()=>handleLogout()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>


    </nav>



  );
};

export default Header;
