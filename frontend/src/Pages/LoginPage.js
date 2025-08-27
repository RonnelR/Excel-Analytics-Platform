import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { login } from '../Services/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/userSlice';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import {Helmet} from "react-helmet";



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const res = await login(data);

      if (res && res.data.success) {
        dispatch(setUser({ user: res.data.user, token: res.data.token }));
        localStorage.setItem('auth', JSON.stringify(res.data));
        toast.success('Login successful');
      navigate(`/dashboard/${res.data.user?.role === 'admin' ? "admin" : "user"}`);

        setEmail('');
        setPassword('');
    }else{
      toast.error('Plese register first')
    }
    } catch (error) {
      console.log(error);
      toast.error('check password or email');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6F7EB] px-4">
    <Helmet>
                   <meta charSet="utf-8" />
                   <title>RedGraph | Login</title>
               </Helmet>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2
          className="text-4xl font-extrabold text-[#E94F37] mb-4 text-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          RedGraph
        </h2>

        <form onSubmit={LoginSubmit} className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-800 text-center">
            Login into your account
          </h4>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E94F37]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E94F37]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-[#E94F37]"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <p
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-[#E94F37] font-semibold hover:underline cursor-pointer text-right"
          >
            Forgot Password?
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#E94F37] text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
          >
            Sign In
          </button>

          {/* Sign Up */}
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Don’t have an account?{' '}
              <span
                onClick={() => navigate('/registraion')}
                className="text-[#E94F37] font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;
