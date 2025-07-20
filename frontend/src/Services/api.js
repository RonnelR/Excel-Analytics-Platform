import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:8080'})


export const login =(data)=>API.post('/api/auth/login',data)
export const register =(data)=>API.post('/api/auth/registration',data)
export const forgot_password =(data)=>API.put('/api/auth/forgot-password',data)
 