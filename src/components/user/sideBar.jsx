import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMessage, faMagnifyingGlass, faBolt, faCompass, faSquarePlus  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import logoImage from '../../../public/assets/LOGO1.png'; 
import logoRec from '../../../public/assets/LOGO-REC1.png'; 
import { IMG_CDN, SOCKET_URL } from '../../config/urls';
import io from 'socket.io-client'
const socket = io.connect(SOCKET_URL)
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setClickSearch } from '../../utils/commonSlice';
import { useDispatch } from 'react-redux';
import MyAxiosInstance from '../../utils/axios';
const SideBar = () => {
  const dispatch = useDispatch()
  const axiosInstance = MyAxiosInstance()
const [username,setUsername] = useState(null)
const [dp,setDp] = useState(null)
const userdata = useSelector(store=>store.userInfo.userdata)
const [showModal,setShowModal] = useState(false)
const [notifyCount,setNotifyCount] = useState(0)
const [messageCount,setMessageCount] = useState(0)
//useEffects

//default
  useEffect(()=>{
    let data = userdata?._id
  socket.emit('join_room',data)

axiosInstance.get('myData').then((response)=>{
  setUsername(response?.data?.username)
  setDp(response?.data?.dp)
 axiosInstance.get("notifyCount").then((resp)=>{
axiosInstance.get('messageCount').then((resp1)=>{


  setNotifyCount(resp.data)
  setMessageCount(resp1.data)

})

 })


})

  },[])

  //socket
  useEffect(()=>{

    //incoming notification
    socket.on("notify",(data)=>{

      setNotifyCount(data)

    })

    //notification removed

    socket.on("notification_removed",(data)=>{

      setNotifyCount(data)
    })

    //Message Count

    socket.on("receive_message",async(data)=>{


      let response = await axiosInstance.get('messageCount')
      setMessageCount(response.data)
    })


  },[socket])
 

  const goto = useNavigate()
  const goHome=()=>{
    goto('/')
  }

  const clickSearch = ()=>{

    const x = true
    dispatch(setClickSearch(x))
  }
  
  const goProfile = ()=>{
    goto(`/${username}`)
  }



  
  return (
   
  <>



    {/* Create Modal */}
    {showModal && (
              <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
                <div className="bg-black p-8 rounded-lg w-80">
                  <h2 className="text-xl font-semibold mb-2 text-white text-center">Create a shot</h2>
                  <span className='text-white'>
                <p onClick={()=>goto('/createPhoto')}  className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm text-center cursor-pointer">Photo</p>
                <p onClick={()=>goto('/createVideo')}  className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm text-center cursor-pointer">Video</p>
                <p onClick={()=>goto('/createStory')}  className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm text-center cursor-pointer">Story</p>

               
                  </span>
                  <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm ml-24 "
                    onClick={()=>setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}




   {/* top bar */}
   



   <nav className="fixed top-0 left-0 w-full h-14 bg-black text-white  md:block lg:hidden sm:block">
    <div className='flex justify-between'>
    <div>
    <img src={logoRec} onClick={goHome} alt="" className='flex-wrap w-20 h-10 ' /> 
    </div>
    <div>
    <ul className="flex justify-evenly py-2">
    <li className="mb-4 p-2 " >
              <Link to="/explore" className="text-white hover:text-gray-300 flex items-center">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                
              </Link>
            </li>

            <li className="mb-4 p-2 ">
            <Link to="/notifications" className="text-white hover:text-gray-300 flex items-center">
              {notifyCount >0 ?  <FontAwesomeIcon icon={faBolt} className="mr-2" style={{color: "#e60000",}}  /> :  <FontAwesomeIcon icon={faBolt} className="mr-2"  /> }
                
              </Link>
            </li>
            </ul>
    </div>
    </div>
    
   
    <ul className="flex justify-evenly py-2">
    <li className="mb-4 p-2 ">
              <a href="" className="text-white hover:text-gray-300 flex items-center">
                {/* <FontAwesomeIcon icon={faHome} className="mr-2" /> */}
               
                
              </a>
            </li>

           
    </ul>
  </nav>




   {/* top bar ends */}

    <nav className="fixed bottom-0 left-0 w-full h-14 bg-black text-white  md:block lg:hidden sm:block ">
    <ul className="flex justify-evenly py-2">
    <li className="mb-4 p-2 ">
              <Link to="/" onClick={goHome} className="text-white hover:text-gray-300 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                
              </Link>
            </li>

            <li className="mb-4 p-2" onClick={()=>goto('/explore')}>
              <Link to="/explore" className="text-white hover:text-gray-300 flex items-center">
              <FontAwesomeIcon icon={faCompass} style={{color: "ffffff",}} className='mr-2' />
              
                 
              </Link>
            </li>

            <li className="mb-4 p-2" onClick={()=>setShowModal(true)}>
              <Link to='' className="text-white hover:text-gray-300 flex items-center">
              <FontAwesomeIcon icon={faSquarePlus} style={{color: "ffffff",}} className='mr-2' />
              
                 
              </Link>
            </li>
            
         
          
            <li className="mb-4 p-2">
              <Link to="/direct/0" className="text-white hover:text-gray-300 flex items-center">
                {messageCount >0 ?  <FontAwesomeIcon icon={faMessage} style={{color: "#e60000",}} className='mr-2' /> :  <FontAwesomeIcon icon={faMessage} style={{color: "ffffff",}} className='mr-2' /> }
              </Link>
            </li>

            

            <li>
            <div className="flex p-2 hover:bg-gray-800 rounded-md ">
            <img onClick={goProfile}
              src={dp && IMG_CDN+dp}
              alt="User Profile"
              className="w-5 h-5 rounded-full object-cover"
            />
     
        
          </div>
            </li>
    </ul>
  </nav>
  <FontAwesomeIcon icon={faSquarePlus} style={{color: "ffffff",}} />
  {/* lg sidebar */}
    <div className="flex h-screen lg:ml-60 font-bold">
    <div className="w-64 bg-black text-white fixed left-0 top-0 bottom-0 hidden lg:block md:hidden sm:hidden lg:border-r  ">      
      <div className="p-4 cursor-pointer">
          <img src={logoImage} alt="Logo" className="w-full mb-4" />
          <ul>
            <li className="mb-4 p-2 hover:bg-gray-400 rounded-md">
              <a href="" onClick={goHome} className="text-white  flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </a>
            </li>

            <li className="mb-4 p-2  hover:bg-gray-400 rounded-md" onClick={()=>goto('/explore')}>
              <a  className="text-white  flex items-center">
              <FontAwesomeIcon icon={faCompass} style={{color: "ffffff",}} className='mr-2' />
              
                Explore
              </a>
            </li>
            
            <li className="mb-4 p-2 hover:bg-gray-400 rounded-md" onClick={()=>{
              clickSearch()
              goto('/explore')
            }}>
              <a href="" className="text-white  flex items-center" >
              <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "ffffff",}} className='mr-2' />
              
                Search
              </a>
            </li>

            <li className="mb-4 p-2 hover:bg-gray-400 rounded-md" onClick={()=>setShowModal(true)}>
              <Link to="" className="text-white  flex items-center"> 
              <FontAwesomeIcon icon={faSquarePlus} style={{color: "ffffff",}}  className='mr-2' />

              
                Create
              </Link>
            </li>
          
            <li className="mb-4 p-2 hover:bg-gray-400 rounded-md">
              <Link to="/direct/0" className="text-white  flex items-center">
              <FontAwesomeIcon icon={faMessage} style={{color: "ffffff",}} className='mr-2' />
              
                Messages {messageCount>0 && <span className='ml-2 bg-red-600 rounded-full px-2'>{messageCount}</span> }
              </Link>
            </li>

            <li className="mb-4 p-2 hover:bg-gray-400 rounded-md">
              <Link to="/notifications"  className="text-white  flex items-center">
              <FontAwesomeIcon icon={faBolt} style={{color: "ffffff",}} className='mr-2' />
              
                Notification {notifyCount>0 && <span className='ml-2 bg-red-600 rounded-full px-2'>{notifyCount}</span> }
              </Link>
            </li>

            <li>
            <div className="flex p-2 hover:bg-gray-400 rounded-md " onClick={goProfile}>
            <img
              src={dp && IMG_CDN+dp}
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className='px-2 py-2 text-white'>{username && username}</p>
        
          </div>
            </li>

           
            {/* Add more sidebar items as needed */}
          </ul>
        </div>
      </div>
      {/* Rest of your content */}
    </div>
{/* lg sidebar */}


    
   </>
  );
};

export default SideBar;
