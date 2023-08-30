import React, { useEffect, createContext, useContext, useState } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../config/urls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {updateBusy} from "../utils/userSlice"
// Create a context for the socket instance
const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const dispatch = useDispatch()
    const goto = useNavigate()
    const busy = useSelector(store=>store.userInfo?.busy)
    const id = useSelector(store=>store.userInfo?.userdata?._id)
  const socket = io.connect(SOCKET_URL);
  socket.emit("join_room",id)

  useEffect(() => {

    const openNewWindow = (id) => {
        const width = 800;  
        const height = 600; 
        const url = id

        const windowFeatures = `width=${width},height=${height},resizable=yes,scrollbars=yes`;
        window.open(url, '_blank', windowFeatures);
    };

 


    socket.on('incomingCall1', async (data) => {

        console.log("incoming call")
        console.log("busy: ",busy)
        if(!busy)
        {
            let x = true
            dispatch(updateBusy(x))

            localStorage.setItem('callfrom',data.callfrom);
            localStorage.setItem('callfromdp',data.callfromdp)
            localStorage.setItem('callfromid',data.callfromid)
    
            const mobileQuery = window.matchMedia('(max-width: 767px)');
            const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    
            // Function to determine the device type
           
                if (mobileQuery.matches) {
                    goto(`/incomingCall/${id}`)
                } else if (tabletQuery.matches) {
                    goto(`/incomingCall/${id}`)
                } else {
                    // openNewWindow(`http://localhost:1234/incomingCall/${id}`)
                    openNewWindow(`https://socialshots.site/incomingCall/${id}`)
                }
      
               
        }
        else
        {
            console.log("busyyy")
            socket.emit('lineBusy',data.callfromid)
        }
        
      
       
  
    })

// call end
    socket.on('endCall1',async(data)=>{
    
          dispatch(updateBusy(false))
      })

      //call rejected
      socket.on('rejectedCall',()=>{
       
        dispatch(updateBusy(false))
      
  
      })







    // Clean up event listeners when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// Custom hook to access the socket instance anywhere in your app
const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
