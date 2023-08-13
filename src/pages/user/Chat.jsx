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
  <Inbox/>

 
 
   
   </>
  
  )
}

export default Chat