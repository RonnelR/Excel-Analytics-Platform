import React from 'react'
import Header from './Header'
import Sidebar from './sidebar'

const Layout = ({children}) => {
  return (
<div className='main-part'>
<Header/>
  <Sidebar/>
  <main>{children}</main>

</div>
  )
}

export default Layout