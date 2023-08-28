import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Stories from "react-insta-stories"
import MyAxiosInstance from '../../utils/axios';
import { IMG_CDN } from '../../config/urls';
import { useSelector } from 'react-redux';
const StoryModal = () => {
  //  states and variables
  const userdata = useSelector(store=>store.userInfo.userdata)
  
  const axiosInstance = MyAxiosInstance()
  const images = [
    "https://res.cloudinary.com/dfhcxw70v/image/upload/v1692440820/img1692440819252_ttzzwi.jpg",
    "https://res.cloudinary.com/dfhcxw70v/image/upload/v1692710992/img1692710989661_viz87j.jpg"

  ]
  const { id } = useParams()
  const [username,setUsername] = useState()
  const [dp,setDp] = useState()
  const [stories1, setStories1] = useState([
    "https://images.wallpaperscraft.com/image/single/shine_dots_black_background_121191_1080x1920.jpg",


  ])
  const [allStories, setAllStories] = useState([])
  const [navList,setNavList] = useState([])

  // functions
  const getData = async () => {

    const response = await axiosInstance.get("getstories")
    let temp2 = response.data.map((x)=>x.username)
    temp2 = removeDuplicates(temp2)
    setNavList(temp2)
    setAllStories(response.data)
    const temp = response.data.filter((x) => x.username == id )
    setUsername(temp[0].username)
    setDp(temp[0].dp)
    const temp1 = temp.map((x)=>IMG_CDN+x.picture)
    setStories1(temp1)
   
  }


  function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const run12 = () => {

  if(navList.indexOf(id) == navList.length-1)
  {
    goto('/')
  }
  else
  {
    // location.href = `/stories/${navList[navList.indexOf(id)+1]}`
    // goto(`/stories/${navList[navList.indexOf(id)+1]}`)
  }
  //  goto('/')
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
    goto('/profile')
  }


  return (
    <>
      <div className="bg-black flex justify-center items-center min-h-screen">


        <div className="w-9/12 md:w-1/2 lg:w-1/3 h-4/5 bg-gray-800 shadow-lg rounded-lg p-6">
          <Link to={-1} className="text-gray-300 hover:text-gray-400 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          {/* User Info */}
          <div className="flex justify-center items-center mb-4 ">
            <img onClick={goProfile} src={stories1.length > 0 ? IMG_CDN+dp : "https://res.cloudinary.com/dfhcxw70v/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1691309508/dpmumthas_ihm3jr.jpg"} alt="Profile" className="w-8 h-8 rounded-full mr-2 object-cover" />
            <span onClick={goProfile} className="text-white">{stories1.length > 0 && username}</span>
          </div>

          <div className="w-full h-5/6  flex justify-center">
            <div className='hidden md:block'>
              <Stories stories={stories1} onAllStoriesEnd={run12} />
            </div>
            <div className='sm:hidden'>
              <Stories stories={stories1} width={250} height={450} onAllStoriesEnd={run12} />
            </div>

          </div>
        </div>


      </div>


    </>
  );
};

export default StoryModal;
