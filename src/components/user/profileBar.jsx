import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IMG_CDN } from '../../config/urls'
import MyAxiosInstance from '../../utils/axios'
import { get } from 'lodash'
const nullDp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

function ProfileBar() {

  const axiosInstance = MyAxiosInstance()
  const [username,setUsername] = useState(null)
  const [dp,setDp] = useState(null)
  const [suggested,setSuggested] = useState([])

  const goto = useNavigate()
  const goProfile = ()=>{
    goto(`/${username}`)
  }


  const logout = () => {

    localStorage.removeItem('userToken')

    goto('/login')

  }

  const getData = async ()=>{

    const response = await  axiosInstance.get('myData')
    setUsername(response?.data?.username)
    setDp(response?.data?.dp)
    const res = await axiosInstance.get('suggested')
    setSuggested(res.data)
  
     

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
    <>
     <div className='border rounded-md p-9 '>
     <div className="flex p-2  rounded-md py-5 w-64 ">
      <span className='flex cursor-pointer' onClick={goProfile}>
      <img
              src={dp ? IMG_CDN+dp : nullDp}
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className='ml-3 mt-3 text-white text-sm'>{username && username}</p>
      </span>
            
         
            <Link className='px-2 py-2 mb-2 text-blue-500 text-sm ml-8 hover:text-white' onClick={logout}>Logout </Link>
          </div>


          <div className="bg-black  p-1 rounded-lg shadow-lg">
    <p className='text-white'>Suggested for you</p>

    {suggested?.length!=0 ? suggested?.map((x)=>{

return(
 <Link  key={x?.username} to={`/${x?.username}`}>
  <div className="bg-blue-950 p-4 mt-2 rounded-lg shadow flex">

<img src={IMG_CDN+x?.dp} alt="" className='rounded-full w-10 h-10 object-cover' />     
<p className='text-white ml-2 mt-1'>{x?.username}</p>    
 
</div>
 </Link>
)


    }) : null}
  
    {/* <div className="bg-blue-950 p-4 mt-2 rounded-lg shadow">


    </div>
    <div className="bg-blue-950 p-4 mt-2 rounded-lg shadow">


    </div> */}
 
</div>

     </div>
    </>
   
  )
}

export default ProfileBar