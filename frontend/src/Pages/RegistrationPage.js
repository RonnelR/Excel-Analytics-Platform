import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { register } from '../Services/api';

const RegistrationPage = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const Navigate = useNavigate(); 

  const RegistrationSubmit = async (e) =>{
    e.preventDefault();

   

    try {  

       if(password !== confirmPassword){
       toast.error("password does't match")
    }else{
  
     const data ={
      name,
      email,
      password
     }
     const res = await register(data)
     
     if(res && res.data.success){
      
       toast.success('Registration successful')
       console.log(res.data)
       setName('')
       setEmail('')
       setPassword('')
      setConfirmPassword('')

//after password change navigate to login page.
          Navigate('/login')
       
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

<form className="text-center p-4 " onSubmit={RegistrationSubmit}>

  <h4>Create  your account</h4>
 
<div>
<label>Name</label>
    <input type='name' className='border-2 border-gray-400 foucs: outline-red-300 rounded-md' id='inputName' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter your Name....'/>
</div>

<div>
<label>Email</label>
    <input type='email' className='border-2 border-gray-400 foucs: outline-red-300 rounded-md' id='inputEmail' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your Email Id....'/>
</div>

<div>
<label>Password</label>
    <input type='password' className='border-2 border-gray-400 foucs: outline-red-300 rounded-md' id='inputPassword' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your password....'/>
</div>

<div>
<label>Confirm Password</label>
    <input type='password' className='border-2 border-gray-400 foucs: outline-red-300 rounded-md' id='inputConfirmPassword' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='Enter your password....'/>
</div>


<button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" type='submit'>sign up</button>
   
   <>
    <p>Already have an account ?</p><p onClick={()=>{Navigate('/login')}} className='font-semibold text-red-500 hover:underline'>Sign in</p>

   </>
</form>

    </>

  </div>
 
       <Toaster />
    </>
   
  )
}

export default RegistrationPage