import React, { useState } from "react";
import Header from "../Header";
import AdminSidebar from "./adminSidebar";
// import {Helmet} from "react-helmet";



const AdminLayout = ({ children ,title,description,keywords,author }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
            {/* <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet> */}


      {/* Header */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1 pt-16">
        {/* Admin Sidebar */}
        <aside
          className={`fixed md:flex top-16 left-0 h-full p-4 w-64 
          bg-white border-r border-gray-200 shadow-sm 
          transform transition-transform duration-300 z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
        >
          <AdminSidebar/>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 p-6 bg-gray-50 overflow-y-auto transition-all duration-300
          ${isSidebarOpen ? "md:ml-64" : "md:ml-64"} 
          `}
        >
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-600 text-center py-3 text-sm shadow-inner">
        © {new Date().getFullYear()}{" "}
        <span className="text-red-500 font-semibold">RedGraph</span>. All rights reserved.
      </footer>
    </div>
  );
};

// AdminLayout.defaultProps = {
//   title: "RedGraph",
//   description: 'Excel analytics project',
//   keywords: 'mern,mongodb,express,react,node,excel,analytics,charts,graphs,3d charts',
//   author: "REDGRAPH"
// }

export default AdminLayout;
