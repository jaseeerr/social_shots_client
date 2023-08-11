import React, { useState } from 'react'
import { IMG_CDN } from '../../config/urls';
import MyAxiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router';
function UserCard(data) {

  const axiosInstance = MyAxiosInstance(1)
 const goto = useNavigate()

console.log(data)
 
  // const {id, username, dp, following, followers, postCount, accountStatus, reports} = data?.data
  const { data: {
    id,
    username,
    dp,
    following,
    followers,
    postCount,
    accountStatus,
    reports,
    accountType
  } = {} } = data || {};

  const [block1,setBlock1] = useState(accountStatus)

  const block = async ()=>{

    let response = await axiosInstance.get(`admin/blockuser/${id}`)
    if(response.data.success)
    {
      setBlock1(!block1)
    }
     goto('/admin/userlist')
    console.log(response)

  }




  return (
    
<div className="w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-2 mb-2">
    <div className="flex justify-end px-4 pt-4">
      
      
      
    </div>
    <div className="flex flex-col items-center pb-10">
         <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" src={dp ? IMG_CDN+dp : "https://flowbite.com/docs/images/people/profile-picture-3.jpg"} alt="Bonnie image"/>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{username? username : "Bonnie Green"}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{followers && followers } Followers | {following && following } Following</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{postCount && postCount } Posts | {reports && reports } Reports</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Account Type: {accountType && accountType ? <span>Private</span> : <span>Public</span> } </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">Account Status: {block1 ? (<span className='text-red-600'>Suspened</span>) : (<span className='text-green-600'>Active</span>)} </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          {!block1 ?
                      <button onClick={block} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 ">Suspend</button>

                      :
                      <button onClick={block} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ">Activate</button>

                    }

        </div>
    </div>
</div>

  )
}

export default UserCard