const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMSaUPp-Xr2cX6xhKreE6nUAoi4GlIJQ9Q1A&usqp=CAU"
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import MyAxiosInstance from "../../utils/axios";
import { useNavigate } from "react-router";
import { IMG_CDN,SOCKET_URL } from "../../config/urls";
import { useSelector } from "react-redux";
import io from 'socket.io-client'
const socket = io.connect(SOCKET_URL)



const Notification = () => {

  const axiosInstance = MyAxiosInstance()
  const goto = useNavigate()
  const [notification, setNotification] = useState([])
  const [request, setRequest] = useState([])
  const userdata = useSelector(store=>store.userInfo.userdata)



  const getData = async () => {

    const response = await axiosInstance.get('getNotification')

    const temp = response.data.notification
   
    setNotification(temp)
    setRequest(response.data.request)
    
  }

  const acceptRequest = async (id,username)=>{
 
  await axiosInstance.get(`accept/${id}`)
   const data = {
       to:userdata._id,
       from:username,
       pid:null,
       type:"follow",
       img:null
   }
   await socket.emit("notification",data)

  await getData()

   const newReq = request.filter((x)=>x.username!=id)
   setRequest(newReq)
  }

  const declineRequest = async (id)=>{
 
    const response = await axiosInstance.get(`decline/${id}`)
 
   await getData()
 
  
   }




  useEffect(() => {

    if (!localStorage.getItem('userToken')) {
      goto('/login')
    }
    else {
      getData()
    }

  }, [])

  return (
    <div className="container mx-auto mt-20 mb-16 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Follow Request Box */}
        {request.length > 0 &&
          <div className="col-span-1 bg-black p-4 rounded-lg follow-request-box overflow-y-auto max-h-[85vh]  border border-gray-400">
            <h2 className="text-xl font-semibold mb-4 flex justify-center">Follow Requests</h2>
            {/* Follow Request Item */}
            {request.length > 0 && request.map((x)=>{

                  return(
                    <div key={x.uid}  className="flex items-center justify-between mb-2 border-t border-gray-400 py-2">
                    <span onClick={()=>goto(`/${x.username}`)} className="flex">
                      <img src={IMG_CDN+x.dp} alt="Profile" className="w-10 h-10 rounded-full" />
                      <p className="font-semibold">{x.username} </p>
                    </span>
                    
                    <div className="flex items-center ml-2">
      
                      <div className="ml-2 ">
                        <button
                          onClick={()=>{acceptRequest(x.username,x.uid)}}
                        className="ml-3 rounded-full border  px-3 p-2">
                          <FontAwesomeIcon icon={faCheck} style={{ color: "#ffffff", }} />
                        </button>
                        <button onClick={()=>declineRequest(x.uid)} className="ml-3 rounded-full border  px-3 p-2">
                          <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff", }} />
                        </button>
                        
                      </div>
                    </div>
                  </div>
                  )
            })
             
            }
           



            {/* Repeat similar follow request items */}
          </div>
        }





        {/* Dark themed notifications */}
        <div className="col-span-1 md:col-span-2 bg-black border border-gray-400 rounded-md overflow-y-auto max-h-[85vh]">
          <h2 className="text-xl font-semibold mb-4 mt-5 ml-4 flex justify-center">Notifications</h2>


         {notification.length > 0 ?
          notification.map((x)=>{
            return(
              <div key={x.id} onClick={()=>{x.type=="follow" ? goto(`/${x.fromUsername}`) :goto(`/viewPost/${x.pid}`)  }} className="notification p-4 mb-4 border-t border-gray-400 flex justify-center">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={IMG_CDN+x.fromDp} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                  <span className="font-semibold ">{x.fromUsername} {x.type == "like" ? " Liked your post" : x.type=="follow" ? "Started following you" : "Commented on your Post"}</span>
                </div>

              </div>
              <span className="max-w-fit">
  
              </span>
            </div>
            )
          })
          :
          <span className="flex justify-center">No Notifications</span>
        }
   






        


          {/* Repeat similar notification blocks for more notifications */}
        </div>

      </div>
    </div>
  );
};

export default Notification;
