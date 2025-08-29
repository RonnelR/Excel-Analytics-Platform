import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Comonents/Layouts/Layout";
import AdminLayout from "../Comonents/Layouts/Admin Layout/adminLayout";
import { Camera, EyeIcon, Upload } from "lucide-react";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import Cropper from "react-easy-crop";
import { Update_profile } from "../Services/api";
import { setUser } from "../Redux/userSlice";
import toast from "react-hot-toast";

// Reusable Profile Form
const ProfileForm = ({ user, token }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phoneNo || "");
  const [password, setPassword] = useState("");

  // Avatar states
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [photoTimestamp, setPhotoTimestamp] = useState(Date.now());

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setShowCropper(true);
    }
  };

  const createImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });
  };

  const handleCropSave = async () => {
    if (!selectedFile || !croppedAreaPixels) return;

    const image = await createImage(selectedFile);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
        setCroppedFile(file);
      }
    }, "image/jpeg");

    setShowCropper(false);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      if (password) formData.append("password", password);
      if (croppedFile) formData.append("photo", croppedFile);

      const res = await Update_profile(formData, user?._id, token);

      dispatch(setUser({ user: res.data.updatedUser, token }));
      localStorage.setItem(
        "auth",
        JSON.stringify({ user: res.data.updatedUser, token })
      );

      setPhotoTimestamp(Date.now());
      setCroppedFile(null);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-red-500 mb-6">
        User Profile
      </h1>

      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 relative">
            {croppedFile ? (
           <img
                   src={URL.createObjectURL(croppedFile)}
                alt="avatar-preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-red-400"
              />
            ) : user?.photo ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/api/auth/user-photo/${user._id}?t=${photoTimestamp}`}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-red-400"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-red-100 text-red-500 rounded-full text-2xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <label className="absolute bottom-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full cursor-pointer text-xs">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Cropper Modal */}
        {showCropper && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-md">
              <div className="relative w-full h-64">
                <Cropper
                  image={selectedFile}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setShowCropper(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropSave}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Enter your name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E94F37]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-[rgb(233,79,55)]"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone Number..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Update Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUpdate}
            className="flex gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <Upload />
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  if (!user) return null;

  return user.role === "admin" ? (
    <AdminLayout>
      <ProfileForm user={user} token={token} />
    </AdminLayout>
  ) : (
    <Layout>
      <ProfileForm user={user} token={token} />
    </Layout>
  );
};

export default ProfilePage;
