import React from 'react'
import {useDispatch } from 'react-redux'
import {logoutUser} from '../../Redux/userSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Header = () => {


  const dispatch = useDispatch();
  const Navigate = useNavigate();



  const handleLogout = ()=>{
dispatch(logoutUser())
localStorage.removeItem('auth')
toast.success('Logout successfully')
Navigate('/login')
  } 

  return (
<>
<nav>
<h2 className='text-red-700'>RedGraph</h2>
  <button onClick={(handleLogout)} className="bg-red-700 p-4 m-4" >Logout</button>
</nav>

</> 
 )
}

export default Header