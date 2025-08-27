import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import {Helmet} from "react-helmet";


const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
    <Helmet>
                       <meta charSet="utf-8" />
                       <title>RedGraph | Forgot Password</title>
                   </Helmet>
      {/* Icon illustration */}
      <motion.div
        className="flex items-center justify-center bg-red-100 p-6 rounded-full shadow-md"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
      >
        <AlertTriangle className="w-16 h-16 text-red-500" />
      </motion.div>

      {/* Big 404 */}
      <motion.h1
        className="text-9xl font-extrabold text-red-500 mt-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        className="text-xl md:text-2xl font-semibold text-gray-700 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Oops! Page not found.
      </motion.p>

      <motion.p
        className="text-gray-500 mt-2 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </motion.p>

      {/* Back button */}
      <motion.button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search className="w-5 h-5" />
        Go Back Home
      </motion.button>
    </motion.div>
  );
};

export default NotFoundPage;
