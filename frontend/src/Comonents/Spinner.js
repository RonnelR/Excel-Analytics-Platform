import React, { useState ,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Spinner = () => {

    const [time, setTime] = useState(3);
    const navigate = useNavigate();


useEffect(() => {
    const interval =  setInterval(() => {
            setTime((prevValue)=> --prevValue);
            
        }, 1000);
    

  return () =>{ clearInterval(interval);
    time === 0 && navigate('/login'  ,{
   
    })
  }
   // eslint-disable-next-line 
}, [time])

  return (
   <>
 
<div >
<span >Redirect to the login {time} </span>
<div role="status">
  
</div>
</div>

</>
  )
}

export default Spinner