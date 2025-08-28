import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { forgot_password } from '../Services/api';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';



const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const ForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }

      const data = { email, password };
      const res = await forgot_password(data);

      if (res && res.data.success) {
        toast.success('Password changed successfully');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!!');
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7EB] px-4">
        
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2
          className="text-4xl font-extrabold text-[#E94F37] mb-4 text-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          RedGraph
        </h2>

          <h4 className="text-xl font-semibold text-gray-800 text-center mb-6">
            Forgot Password
          </h4>

          <form className="space-y-5" onSubmit={ForgotPasswordSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email Id..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E94F37]"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E94F37]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#E94F37]"
                >
                  {showPassword ? (
                 <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
                  )}
                </button>
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
                  placeholder="Confirm your password..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E94F37]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#E94F37]"
                >
                  {showConfirmPassword ? (
                   <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#E94F37] hover:bg-red-600 text-white font-medium py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Submit
            </button>

            {/* Back to login */}
            <p
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-[#E94F37] hover:underline text-center cursor-pointer"
            >
              Back to login
            </p>
          </form>
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default Forgotpassword;
