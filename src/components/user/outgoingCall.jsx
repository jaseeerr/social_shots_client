import React, { useState,useEffect } from 'react';
import { IMG_CDN,SOCKET_URL } from '../../config/urls';
import io from 'socket.io-client'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
const socket = io.connect(SOCKET_URL)
import { updateBusy } from '../../utils/userSlice';

const OutGoingCall = () => {
  const dispatch = useDispatch()
  const goto = useNavigate()
  const userdata = useSelector(store=>store.userInfo.userdata)
  const {id} = useParams()
  const [name,setName] = useState(localStorage.getItem('callto'))
  const [dp,setDp] = useState(localStorage.getItem('calltodp'))
  const [fid,setFid] = useState(localStorage.getItem('calltoid'))
  const [lineBusy,setLineBusy] = useState(false)
  const [reject,setReject] = useState(false)



  const endCall =async ()=>{

    let x = false
    dispatch(updateBusy(x))
    socket.emit('endCall',{id:userdata._id,fid})
    const mobileQuery = window.matchMedia('(max-width: 767px)');
            const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');

           
                if (mobileQuery.matches) {
                    goto(`/`)
                } else if (tabletQuery.matches) {
                    goto(`/`)
                } else {
                  window.close()
                }
    
  }

  function generateRandomNumber() {
    const min = 10000000; // Smallest 8-digit number
    const max = 99999999; // Largest 8-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  useEffect(() => {
    let x = true
    dispatch(updateBusy(x))
    socket.emit('join_room',userdata._id)
    socket.emit("outgoingCall", {id,callfrom:userdata.username,callfromdp:userdata.dp,callfromid:userdata._id})
    const handleBeforeUnload = () => {
      dispatch(updateBusy(false))
      localStorage.removeItem('callto');
      localStorage.removeItem('calltodp')
      localStorage.removeItem('calltoid')
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  useEffect(()=>{

    socket.on('lineBusy1',()=>{
      console.log("linebusyahh monu")
      setLineBusy(true)

    })

    socket.on('rejectedCall',()=>{
      dispatch(updateBusy(false))
      setReject(true)
      setTimeout(()=>{
        window.close() ? window.close() :  location.href = "https://socialshots.site/direct/0"
      },3500)
    })


    socket.on('acceptedCall',()=>{
    
      let x = generateRandomNumber()
          x = x +""+ userdata._id
          socket.emit('joinCall',{fid,x})
      goto(`/call/${x}`)

    })
  },[socket])

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-gray-900 rounded-lg shadow-md p-4 md:p-8 w-96 md:max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 flex justify-center text-white">{lineBusy ? "Line Busy" : reject? "Call Declined" : "Calling..."}</h1>
        <div className="flex flex-col md:flex-row items-center justify-center md:items-start">
          <img
            src={dp ? IMG_CDN+dp :"https://st.zippyshareme.com/cache/plugins/filepreviewer/4831/1e7f363caff4a1c5fbfa265ebd0b170ffa65f1577521a70f1fa4ba81538b73b8/1100x800_cropped.jpg"}
            alt="Caller Avatar"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-0 md:mr-4 object-cover"
          />
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-gray-400">Outgoing call...</p>
          </div>
        </div>
        <div className="flex justify-center mt-4 md:mt-6">
          {/* <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-4">
            Answer
          </button> */}
          <button onClick={endCall} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
          End Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutGoingCall;
