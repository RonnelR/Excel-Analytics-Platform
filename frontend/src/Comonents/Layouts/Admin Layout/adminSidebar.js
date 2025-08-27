import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Files, LayoutDashboard, Users } from 'lucide-react'

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { logo: <LayoutDashboard />, 
  label: "DASHBOARD",
   path: "/dashboard/admin"
 },{logo: <Users />, 
  label: "All USER",
  path: "/dashboard/admin/all-users"},
  {logo: <Files />,  
  label: "All FILES",
   path: "/dashboard/admin/all-files"}
    
  ];

  return (
    <div className="flex flex-col space-y-2">
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;

        return (
         <button
  key={index}
  onClick={() => navigate(item.path)}
  className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg font-medium 
              transition-colors duration-200 ease-in-out text-left
              ${isActive ? "bg-red-50 text-red-600" : "text-gray-700 hover:text-red-600 hover:bg-red-50"}
  `}
>
  <span className="text-red-600">{item.logo}</span>
  <span className="truncate">{item.label}</span>
</button>

        );
      })}
    </div>
  );
};

export default AdminSidebar;
