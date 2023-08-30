const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMSaUPp-Xr2cX6xhKreE6nUAoi4GlIJQ9Q1A&usqp=CAU"
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import MyAxiosInstance from "../../utils/axios";
import { useNavigate } from "react-router";
import { IMG_CDN,SOCKET_URL } from "../../config/urls";
import { useSelector } from "react-redux";
import io from 'socket.io-client'
import DarkSpinner from "./spinner";
const socket = io.connect(SOCKET_URL)



const Notification = () => {

  const axiosInstance = MyAxiosInstance()
  const goto = useNavigate()
  const [notification, setNotification] = useState([])
  const [allNotification, setAllNotification] = useState([])
  const [request, setRequest] = useState([])
  const userdata = useSelector(store=>store.userInfo.userdata)
 const [loader,setLoader] = useState(true)
 const [pages,setPages] = useState([])
const [currentPage,setCurrentPage] = useState()
const [totalLen,setTotalLen] = useState(0)


 function timeSinceDate(startDate) {
  const startDate1 = new Date(startDate);
  const now = new Date();
  const timeDiff = now - startDate1;

  if (timeDiff < 60000) {
    const secondsDiff = Math.floor(timeDiff / 1000);
    return `${secondsDiff} ${secondsDiff === 1 ? 'sec' : 'secs'}`;
  } else if (timeDiff < 3600000) {
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    return `${minutesDiff} ${minutesDiff === 1 ? 'min' : 'mins'}`;
  } else if (timeDiff < 86400000) {
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    return `${hoursDiff} ${hoursDiff === 1 ? 'hr' : 'hrs'}`;
  } else if (timeDiff < 604800000) {
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'}`;
  } else {
    const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    return `${weeksDiff} ${weeksDiff === 1 ? 'week' : 'weeks'}`;
  }
}



  const getData = async () => {

    const response = await axiosInstance.get('getNotification')

    let temp = response.data.notification
    
    temp = temp.map(obj => {
      const y = timeSinceDate(obj.date)
      return {
        ...obj, // Spread existing properties
        since: y , // New property
      };
    });
    setAllNotification(temp)
   
    for(let i=1;i<=Math.ceil(temp.length/7);i++)
    {
      setPages(prevArray => [...prevArray, i]);
    }
    temp = temp.slice(0,7)
    setNotification(temp)
    setRequest(response.data.request)
    setLoader(false)
    
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



  const changePage = (x)=>{
    console.log(allNotification.length)
    const lastPost = x * 7
    const firstPost = lastPost - 7
    let y = allNotification
    y = y.slice(firstPost,lastPost)
    setNotification(y)
  }

  return (
    <>
    {loader ? 
     <div className='flex justify-center mt-96 w-full h-screen'>
     <div class="text-center">
       <div role="status">
           <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
               <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
           </svg>
           <span class="sr-only">Loading...</span>
       </div>
   </div>
   </div>
   :
   
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
               <span className="font-semibold ">{x.fromUsername} {x.type == "like" ? " Liked your post" : x.type=="follow" ? "Started following you." : "Commented on your Post."} <span>{x.since}</span></span>
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
       <div className="notification p-4 mb-4 border-t border-gray-400 flex justify-center">
       <div className="flex items-center justify-between">
         <div className="flex items-center">
          {pages.length > 0 && pages.map((x)=>  <span onClick={()=>changePage(x)} className="font-semibold px-3 bg-blue-950 mr-2 cursor-pointer rounded-md">{x}</span> )}
         
         </div>

       </div>
       <span className="max-w-fit">

       </span>
     </div>







     


       {/* Repeat similar notification blocks for more notifications */}
     </div>

   </div>
 </div>

 
   }
    </>
   
  );
};

export default Notification;
