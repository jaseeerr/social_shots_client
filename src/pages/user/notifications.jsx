import React from 'react'
import SideBar from '../../components/user/sideBar'
import Notification from '../../components/user/notification'

function Notifications() {
  return (
    <div className='flex px-5'>
        <SideBar/>

        <Notification/>
    </div>

  )
}

export default Notifications