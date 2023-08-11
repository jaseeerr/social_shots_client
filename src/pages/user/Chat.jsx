import React, { useState } from 'react'

import Inbox from '../../components/user/inbox'
function Chat() {

    const [message,setMessage] = useState("")

    const sendMessage = ()=>{
        socket.emit('send_message',{message:`Helloo ${message}`})
    }
  return (
   <>
  
  <Inbox/>
   
   </>
  
  )
}

export default Chat