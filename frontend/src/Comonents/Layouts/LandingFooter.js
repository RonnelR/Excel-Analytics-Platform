import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-black py-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-[#E94F37] mb-4">REDGRAPH</h2>
          <p className="text-black">
            Upload and visualize Excel files with interactive charts and graphs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#E94F37] cursor-pointer hover:font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink href="#features" className="hover:text-[#E94F37]  transition">
                Features
              </NavLink>
            </li>
            <li>
              <NavLink href="#pricing" className="hover:text-[#E94F37] transition">
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink href="#contact" className="hover:text-[#E94F37] transition">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#E94F37] cursor-pointer hover:font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {/* Facebook */}
         <NavLink className="hover:text-[#E94F37] transition" to="#">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M22.675 0h-21.35C.597 0 0 
             .597 0 1.326v21.348C0 23.403.597 
             24 1.326 24h11.495v-9.294H9.847V11.41h2.974V8.797
             c0-2.937 1.793-4.542 4.415-4.542 1.255 
             0 2.334.093 2.646.135v3.07h-1.817c-1.425 
             0-1.7.677-1.7 1.67v2.278h3.4l-.443 
             3.296h-2.957V24h5.797c.729 0 1.326-.597 
             1.326-1.326V1.326C24 .597 23.403 
             0 22.675 0z"/>
  </svg>
</NavLink>


            {/* Twitter */}
         <NavLink className="hover:text-[#E94F37] transition" to="#">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 
             4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 
             1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 
             2.02-4.52 4.52 0 .35.04.7.11 1.03A12.84 
             12.84 0 0 1 1.64.88a4.52 4.52 0 0 0 
             1.4 6.03 4.5 4.5 0 0 1-2.05-.57v.06c0 
             2.19 1.56 4.02 3.64 4.44a4.5 4.5 0 0 
             1-2.04.08 4.53 4.53 0 0 0 4.22 3.14A9.06 
             9.06 0 0 1 0 19.54a12.77 12.77 0 0 0 
             6.92 2.02c8.3 0 12.84-6.87 12.84-12.84 
             0-.2-.01-.39-.02-.58A9.18 9.18 0 0 0 
             23 3z"/>
  </svg>
</NavLink>


        
            {/* LinkedIn */}
         <NavLink className="hover:text-[#E94F37] transition" to="#">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 
      2.762 2.239 5 5 5h14c2.762 0 5-2.238 
      5-5v-14c0-2.761-2.238-5-5-5zm-11 
      19h-3v-10h3v10zm-1.5-11.268c-.966 
      0-1.75-.784-1.75-1.75s.784-1.75 
      1.75-1.75 1.75.784 
      1.75 1.75-.784 1.75-1.75 
      1.75zm13.5 11.268h-3v-5.604c0-1.336-.027-3.056-1.863-3.056-1.865 
      0-2.152 1.456-2.152 2.96v5.7h-3v-10h2.881v1.367h.041c.401-.76 
      1.379-1.561 2.838-1.561 3.034 0 3.594 1.995 
      3.594 4.59v5.604z" />
  </svg>
</NavLink>

        
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-black pt-4 text-center text-black text-sm">
        © {new Date().getFullYear()} REDGRAPH. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
