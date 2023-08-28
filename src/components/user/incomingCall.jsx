import React, { useEffect, useState } from 'react';
import { IMG_CDN, SOCKET_URL } from '../../config/urls';
import io from 'socket.io-client'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
const socket = io.connect(SOCKET_URL)
import {updateBusy} from "../../utils/userSlice"


const IncomingCall = () => {
 
  const goto = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()
  socket.emit("join_room",id)
  const [name,setName] = useState(localStorage.getItem('callfrom'))
  const [dp,setDp] = useState(localStorage.getItem('callfromdp'))
  const [fid,setFid] = useState(localStorage.getItem('callfromid'))
  const [accept,setAccept] = useState(false)


  const rejectCall =async ()=>{
     dispatch(updateBusy(false))
    socket.emit('rejectCall',fid)
    window.close()
  }

  const acceptCall = async ()=>{
    dispatch(updateBusy(true))
    setAccept(true)
    await socket.emit('acceptCall',fid)
   

  }



  useEffect(()=>{

    socket.on('endCall1',async(data)=>{

      console.log('call end incoming')
      console.log(data)

      if(data.id==fid)
      {
       
        window.close()
      }

    })

    socket.on("joinCall1",(data)=>{
      goto(`/call/${data.x}`)
      
    })

    
  },[socket])


  useEffect(() => {
    const handleBeforeUnload = () => {
     
      dispatch(updateBusy(false))
      localStorage.removeItem('callfrom');
      localStorage.removeItem('callfromdp')
      localStorage.removeItem('callfromid')
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-900 rounded-lg shadow-md p-4 md:p-8 w-96 md:max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">{accept ? "connecting" : "Incoming"} Call</h1>
        <div className="flex flex-col md:flex-row items-center justify-center md:items-start">
          <img
            src={dp && IMG_CDN+dp}
            alt="Caller Avatar"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-0 md:mr-4 object-cover"
          />
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-gray-400">Incoming call...</p>
          </div>
        </div>
        <div className="flex justify-center mt-4 md:mt-6">
          <button onClick={acceptCall} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4">
            Answer
          </button>
          <button onClick={rejectCall} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
