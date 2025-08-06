import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../../Spinner'
import { Outlet, useNavigate } from 'react-router-dom'
import { private_Route } from '../../../Services/api'

const Private = () => {
  const token = useSelector(state => state.user.token)
  const navigate = useNavigate()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await private_Route({
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (res?.data?.ok) {
          setOk(true)
          console.log('✅ Authorized User')
        } else {
          setOk(false)
          console.log('⛔ Unauthorized User')
          navigate('/login')
        }
      } catch (error) {
        console.log('Error in authCheck:', error.message)
        setOk(false)
        navigate('/login')
      }
    }

    if (token) authCheck()
    

    // eslint-disable-next-line
  }, [token])

  return ok ? <Outlet /> : <Spinner />
}

export default Private
