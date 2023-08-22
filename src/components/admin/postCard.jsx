import React from 'react'
import { IMG_CDN, VIDEO_CDN } from '../../config/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEye } from '@fortawesome/free-solid-svg-icons';
import MyAxiosInstance from '../../utils/axios';
function PostCard(data) {
const axiosInstance = MyAxiosInstance(1)

    const { data: {
        
        username,
        picture,
        caption,
        postType,
        likes,
        comments,
        reported,
        date
      } = {} } = data || {};

      const deletePost = ()=>{
        

      }

  return (
 
<div className="max-w-sm w-80 mr-3 mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">

        {postType=="img" ? 
        <img className="rounded-t-lg h-80" src={picture ? IMG_CDN+picture : "https://flowbite.com/docs/images/blog/image-1.jpg"} alt="" />
        :
         <video controls className=' rounded-t-lg w-full h-80 object-cover'>
  <source src={picture ? VIDEO_CDN+picture : null} type="video/mp4" />
  Your browser does not support the video tag.
</video>
      }
    </a>
    <div className="p-5">
        <a href="#">
            {/* <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h1> */}
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Username: {username ? username : null}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Caption: {caption ? caption : "no caption"}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">❤️{likes ? likes.length : 0}  💬{comments ? comments.length : 0}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Reports: {reported ? reported.length : 0}</p>
      
        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 ">
            Delete Post
             <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} className='ml-2' />
        </button>
    </div>
</div>

  )
}

export default PostCard