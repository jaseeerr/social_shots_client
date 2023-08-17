import React, { useEffect, useState } from 'react'
import Inbox1 from '../../components/user/inboxMobile'
import Inbox from '../../components/user/inbox'
function Chat() {

  useEffect(()=>{

    if(!localStorage.getItem('userToken'))
    {
      location.href = "/login"
    }
    
  },[])
  
  return (
   <>
 

  <div className="hidden sm:block">
  <Inbox/>
    </div>

    <div className="block sm:hidden">
    <Inbox1/>
    </div>
 
 
   
   </>
  
  )
}

export default Chat