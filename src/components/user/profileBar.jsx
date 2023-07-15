import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IMG_CDN } from '../../config/urls'

function ProfileBar() {

  const username = useSelector(store=>store.userInfo?.userdata?.username)
  const dp = useSelector(store=>store.userInfo?.userdata?.dp)

  const goto = useNavigate()
  const goProfile = ()=>{
    goto(`/${username}`)
  }
  return (
    <>
     <div className='border rounded-md p-9'>
     <div className="flex p-2  rounded-md py-5  ">
      <span className='flex cursor-pointer' onClick={goProfile}>
      <img
              src={dp && IMG_CDN+dp}
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            />
            <p className='ml-3 mt-3 text-white text-sm'>{username && username}</p>
      </span>
            
         
            <Link className='px-2 py-2 mb-2 text-blue-500 text-sm ml-8 hover:text-white'>Logout </Link>
          </div>


          <div className="bg-black  p-1 rounded-lg shadow-lg">
    <p className='text-white'>Suggested for you</p>
    <div className="bg-blue-950 p-4 mt-2 rounded-lg shadow"></div>
    <div className="bg-blue-950 p-4 mt-2 rounded-lg shadow"></div>
    <div className="bg-blue-950 p-4 mt-2 rounded-lg shadow"></div>
 
</div>

     </div>
    </>
   
  )
}

export default ProfileBar