import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { login } from '../Services/api';

const LoginPage = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const Navigate = useNavigate(); 

  const LoginSubmit = async (e) =>{
    e.preventDefault();
 

    try {  
 
 const data ={
  email,
  password
 }
 const res = await login(data)

    if(res&&res.data.success){

      //store jwt on localstorge
      localStorage.setItem('authToken',res.data?.token)

       toast.success( 'Login successful')
       console.log(res.data.token)
       setEmail('')
       setPassword('')
       if(res.data.role === 'admin'){
 Navigate('/adminDashboard')
       }else{
 Navigate('/dashboard')
       }
     
    }

  } catch (error) {
      console.log(error)
       toast.error('Something went wrong!!')
    }
  }
    

  return (
    <>
  <div className='loginPage'>
  <h2  className="text-3xl text-center font-bold text-red-700 pt-4 " onClick={()=>{Navigate('/')}} >RedGraph</h2>
    <>

<form className="text-center p-4 " onSubmit={LoginSubmit}>
  <h4>Login into  your  account</h4>
<div>
<label>Email</label>
    <input type='email' className='border-2 border-gray-400 foucs: outline-red-300 rounded-md' id='inputName' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your Name....'/>
</div>

<div>
<label>Password</label>
    <input type='password' className='border-2 border-gray-400 foucs: outline-red-300 rounded-md' id='inputPassword' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your password....'/>
</div>
<p onClick={()=>{Navigate('/forgot-password')}} className='font-semibold text-red-500 hover:underline' >Forget Password ?</p>
<button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" type='submit'>sign in</button>
   
   <>
    <p>Dont have an account ? </p><p onClick={()=>{Navigate('/registraion')}} className='font-semibold text-red-500 hover:underline'>Sign Up</p>

   </>
</form>

    </>

  </div>
 
 
       <Toaster />
    </>
   
  )
}

export default LoginPage