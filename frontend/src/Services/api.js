import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

export const login = (data) => API.post('/api/auth/login', data);
export const register = (data) => API.post('/api/auth/registration', data);
export const forgot_password = (data) => API.put('/api/auth/forgot-password', data);
export const upload_file = (data, config) => API.post('/api/file/upload-file', data, config);
export const private_Route = (config) => API.get('/api/auth/user-auth', config);
export const AdminPrivate_Route = (config) => API.get('/api/auth/admin-auth', config);

// ✅ FIXED Update_profile to handle file uploads properly
export const Update_profile = (formData, id, token) => {
  return API.put(`/api/auth/update-profile/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",  // important for file uploads
      Authorization: `Bearer ${token}`,
    },
  });
};
//user files
export const User_Files = (id,token) => {
  return API.get(`/api/file/user-files/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//delete file
export const Delete_File = (id,token)=>{
  return API.delete(`/api/file/delete-file/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
};

//all users
export const All_users = (token)=>{
  return API.get(`/api/auth/all-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
};


//all files
export const All_Files= (token)=>{
  return API.get(`/api/file/all-files`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
};

//delete user
export const Delete_User = (id,token)=>{
  return API.delete(`/api/auth/delete-user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
};

// update role
export const Update_Role = (id, role, token) => {
  return API.patch(
    `/api/auth/update-role/${id}`,
    { role },   // 👈 wrap in an object
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", // 👈 important
      },
    }
  );
};

//data insight 
export const Data_Insight = async (data) => {
  return API.post("/api/file/data-insight", { data });
};


// file Api
export const excel_data = (fileId) => API.get(`/api/file/single-excel-data/${fileId}`);
