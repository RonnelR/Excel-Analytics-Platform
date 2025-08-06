import React from 'react';
import { useNavigate } from 'react-router-dom';



const Sidebar = () => {

const Navigate = useNavigate()

return (
    <>

      <h1 onClick={()=> Navigate('/dashboard/user')} className='hover:text-red-700'>Dashboard</h1>
      
      <h1 onClick={()=> Navigate('/dashboard/user/Upload-file')} className='hover:text-red-700'>Upload New File</h1>
      <h1 onClick={()=> Navigate('/dashboard/user/Uploaded-files')} className='hover:text-red-700'>Uploaded Files</h1>

    </>
  
  )
}

export default Sidebar