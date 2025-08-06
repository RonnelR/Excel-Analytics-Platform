import React from 'react'
import Layout from '../../Comonents/Layouts/Layout'
import {useSelector} from 'react-redux'

const UserDashboard = () => {

  const user = useSelector(state=>state.user)
  const excel = useSelector(state=>state.excelData)

  return (
    <Layout>
    <>
 {user? <p className="text-center">Welcome back {user?.user?.name} 👋</p> : ""}
     <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(excel, null, 2)}</pre>
      
    </>
    </Layout>
  )
}

export default UserDashboard          