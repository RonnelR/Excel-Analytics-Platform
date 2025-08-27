import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { register } from '../Services/api';
import {Helmet} from "react-helmet";


const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const Navigate = useNavigate();

  const RegistrationSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }

      const data = { name, email, password };
      const res = await register(data);

      if (res && res.data.success) {
        toast.success('Registration successful');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        Navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!!');
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#F6F7EB] px-4">
      <Helmet>
                   <meta charSet="utf-8" />
                   <title>RedGraph | Register</title>
               </Helmet>
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md">
          {/* Brand Title */}
         <h2
          className="text-4xl font-extrabold text-[#E94F37] mb-4 text-center cursor-pointer"
          onClick={() => Navigate('/')}
        >
          RedGraph
        </h2>
          <p className="text-center font-semibold text-gray-800 mb-6">Create your account</p>

          {/* Form */}
          <form className="space-y-5" onSubmit={RegistrationSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-[#E94F37] focus:ring-2 focus:ring-[#E94F37] outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-[#E94F37] focus:ring-2 focus:ring-[#E94F37] outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-[#E94F37] focus:ring-2 focus:ring-[#E94F37] outline-none transition pr-10"
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-[#E94F37] transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A9.953 9.953 0 0112 19c-5.25 0-9.7-3.2-11-7.5a9.97 9.97 0 012.253-3.592m3.54-2.13A9.953 9.953 0 0112 5c5.25 0 9.7 3.2 11 7.5-.45 1.38-1.186 2.622-2.144 3.66M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-[#E94F37] focus:ring-2 focus:ring-[#E94F37] outline-none transition pr-10"
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-[#E94F37] transition"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A9.953 9.953 0 0112 19c-5.25 0-9.7-3.2-11-7.5a9.97 9.97 0 012.253-3.592m3.54-2.13A9.953 9.953 0 0112 5c5.25 0 9.7 3.2 11 7.5-.45 1.38-1.186 2.622-2.144 3.66M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#E94F37] hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-200 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Switch to Login */}
          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{' '}
            <span
              className="font-semibold text-[#E94F37] hover:underline cursor-pointer"
              onClick={() => Navigate('/login')}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default RegistrationPage;
