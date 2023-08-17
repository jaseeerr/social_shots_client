const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMSaUPp-Xr2cX6xhKreE6nUAoi4GlIJQ9Q1A&usqp=CAU"
import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faXmark } from '@fortawesome/free-solid-svg-icons';
import MyAxiosInstance from "../../utils/axios";
import { useNavigate } from "react-router";





const Notification = () => {

  const axiosInstance = MyAxiosInstance()
 const goto = useNavigate()
  const getData = async ()=>{

    const response = await axiosInstance.get('getNotification')
    console.log(response)
  }




  useEffect(()=>{
    
    if(!localStorage.getItem('userToken'))
    {
        goto('/login')
    }
    else
    {
      getData()
    }

  },[])

  return (
    <div className="container mx-auto mt-20 mb-16 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Follow Request Box */}
        <div className="col-span-1 bg-black p-4 rounded-lg follow-request-box overflow-y-auto max-h-[85vh]  border border-gray-400">
          <h2 className="text-xl font-semibold mb-4">Follow Requests</h2>
          {/* Follow Request Item */}
          <div className="flex items-center justify-between mb-2 border-t border-gray-400 py-2">
            <span className="flex">
            <img src={img} alt="Profile" className="w-10 h-10 rounded-full" />
            <p className="font-semibold">User456</p>
            </span>
            <div className="flex items-center ml-2">
             
              <div className="ml-2 ">
                <button className="ml-3 rounded-full border  px-3 p-2">
                <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} />
                </button>
                <button className="ml-3 rounded-full border  px-3 p-2">
                <FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} />
                </button>
              </div>
            </div>
          </div>

      

          {/* Repeat similar follow request items */}
        </div>
        
        {/* Dark themed notifications */}
        <div className="col-span-1 md:col-span-2 bg-black border border-gray-400 rounded-md overflow-y-auto max-h-[85vh]">
          <h2 className="text-xl font-semibold mb-4 mt-5 ml-4">Notifications</h2>
          <div className="notification p-4 mb-4  border-t border-gray-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={img} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                <span className="font-semibold ">User123</span>
              </div>
              <button className="text-red-600 hover:text-red-800">Dismiss</button>
            </div>
            <span className="max-w-fit">
    <p className="mt-2">
        Jaseer Liked your post
    </p>
</span>
          </div>

       
          {/* Repeat similar notification blocks for more notifications */}
        </div>
        
      </div>
    </div>
  );
};

export default Notification;
