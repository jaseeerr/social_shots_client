import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Stories from "react-insta-stories"
import MyAxiosInstance from '../../utils/axios';
import { IMG_CDN } from '../../config/urls';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faXmark,faBackward,faEye } from '@fortawesome/free-solid-svg-icons';
const nullDp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

const StoryModal = () => {
  //  states and variables
  const userdata = useSelector(store=>store.userInfo.userdata)
  
  const axiosInstance = MyAxiosInstance()
  const images = [
    "https://res.cloudinary.com/dfhcxw70v/image/upload/v1692440820/img1692440819252_ttzzwi.jpg",
    "https://res.cloudinary.com/dfhcxw70v/image/upload/v1692710992/img1692710989661_viz87j.jpg",
    "https://images.wallpaperscraft.com/image/single/shine_dots_black_background_121191_1080x1920.jpg",

  ]
  const { id } = useParams()
  const [username,setUsername] = useState()
  const [dp,setDp] = useState(null)
  const [stories1, setStories1] = useState(["null",])
  const [index,setIndex] = useState(-1)
  const [allStories, setAllStories] = useState([])
  const [navList,setNavList] = useState([])
  const [filteredList,setFilteredList] = useState([])
  const [views,setViews] = useState([])
  const [showViews,setShowViews] = useState()
  const [pauseStory,setPauseStory] = useState(false)

  // functions
  const getData = async () => {
    const currentTime = new Date()
    console.log(Date.now(currentTime))
    console.log("current")
    const response = await axiosInstance.get("getstories")
    const tem = response.data.filter((x)=>Date.parse(x.expire) > currentTime)
    let temp2 = tem.map((x)=>x.username)
    temp2 = removeDuplicates(temp2)
  
    setNavList(temp2)
    setAllStories(tem)
    let temp = response.data.filter((x) => x.username == id  )
     temp = temp.filter((x) =>  Date.parse(x.expire) > currentTime )
    setFilteredList(temp)
   
    setUsername(temp[0].username)
    setDp(temp[0].dp)
    
    const temp1 = temp.map((x)=>{
      return({url:IMG_CDN+x.picture,header:{heading:timeSinceDate(x.date)}})
    })
   
    setStories1(temp1)
   
  }

  const updateView = async ()=>{
    console.log("storyViewdddd")
    const x = index +1
    setIndex(index+1)
    if(!filteredList[x]?.views?.includes(userdata._id) && filteredList[x]?.uid!=userdata._id)
    {
      if(filteredList[x]?._id)
      {
        await axiosInstance.get(`storyview/${filteredList[x]?._id}`)
        filteredList[x]?.views.push(userdata?._id)
        setViews(prevArray => [...prevArray, userdata?._id]);
      }
     
    }


  }


  function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const forward = () => {

  if(navList.indexOf(id) == navList.length-1)
  {
    goto('/')
  }
  else
  {
    location.href = `/stories/${navList[navList.indexOf(id)+1]}`
    // goto(`/stories/${navList[navList.indexOf(id)+1]}`)
  }
  //  goto('/')
}

function timeSinceDate(startDate) {
  const startDate1 = new Date(startDate)
  const now = new Date();
  const timeDiff = now - startDate1; 

  if (timeDiff < 60000) { 
    const secondsDiff = Math.floor(timeDiff / 1000); 
    return `${secondsDiff} ${secondsDiff === 1 ? 'sec' : 'sec'}`;
  } else if (timeDiff < 3600000) {
    const minutesDiff = Math.floor(timeDiff / (1000 * 60)); 
    return `${minutesDiff} ${minutesDiff === 1 ? 'min' : 'mins'}`;
  } else { 
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); 
    return `${hoursDiff} ${hoursDiff === 1 ? 'hr' : 'hrs'}`;
  }
}


  // useEffects
  useEffect(() => {

    if (!localStorage.getItem('userToken')) {
      goto('/login')
    }
    else {
      getData()
    }

  }, [id])

  const goto = useNavigate()
  const goProfile = () => {
    goto(`/${username}`)
  }




  return (
    <>
     

      <div className="bg-black flex justify-center items-center min-h-screen" onClick={()=>{showViews && 
        setShowViews(false)
        setPauseStory(false)}}>


        <div className="w-9/12 md:w-1/2 lg:w-1/3 h-4/5 bg-gray-800 shadow-lg rounded-lg p-6">
          <div className='flex justify-between'>
          <Link to={-1} className="text-gray-300 hover:text-gray-400 mb-4 inline-flex items-center">
          <FontAwesomeIcon icon={faBackward} style={{color: "#ffffff",}} className='mr-2' />
             Backwawrd
          </Link>
          <Link to={'/'} className="text-gray-300 hover:text-gray-400 mb-4 inline-flex items-center">
          <FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} className='mr-2'/>

            Close
          </Link>
          <Link onClick={forward} className="text-gray-300 hover:text-gray-400 mb-4 inline-flex items-center">
          Forward
          <FontAwesomeIcon icon={faForward} style={{color: "#ffffff",}} className='ml-2' />
            
          </Link>
          </div>
     

          {/* User Info */}
          <div className="flex justify-center items-center mb-4 ">
            <img onClick={goProfile} src={dp ? IMG_CDN+dp : nullDp} alt="Profile" className="w-8 h-8 rounded-full mr-2 object-cover" />
            <span onClick={goProfile} className="text-white">{stories1.length > 0 && username}</span>
            {filteredList[index]?.uid==userdata?._id &&  <FontAwesomeIcon onClick={()=>{
              setShowViews(true)
              setPauseStory(true)
            }} icon={faEye} style={{color: "#ffffff",}} className='ml-3 cursor-pointer' />}
             {filteredList[index]?.uid==userdata?._id && <span className='text-white ml-2 font-semibold'>{filteredList[index]?.views.length}</span>}
          </div>

          <div className="w-full h-5/6  flex justify-center">
            {/* <div className='hidden md:block'> */}
              <div>
              <Stories stories={stories1} isPaused={pauseStory}  onAllStoriesEnd={forward} onStoryStart={updateView} onPrevious={()=>{setIndex(index-1)}} />
            </div>
            <div className='sm:hidden'>
              {/* <Stories stories={stories1} width={250} height={450} onAllStoriesEnd={forward} onStoryStart={updateView} /> */}
            </div>

          </div>
        </div>


      </div>

      {showViews && 
      <div className="fixed inset-1 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
      <div className="bg-black p-8 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-2 text-white text-center">{filteredList[index]?.views.length}Views</h2>
        <span className='text-white'>
     

     
        </span>
        <button
          className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm ml-24 "
          onClick={()=>setShowViews(false)}
        >
          Close
        </button>
      </div>
    </div>
    
    }
    </>
  );


  
};




export default StoryModal;
