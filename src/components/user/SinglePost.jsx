import React from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment,faHeart,faXmark } from '@fortawesome/free-solid-svg-icons';
const PostCard = ({ username, image, likes, caption }) => {

  const goto = useNavigate()
  const goProfile = ()=>{
    goto('/profile')
  }
  return (
  
     <div className="bg-black shadow-2xl  overflow-hidden  border rounded-md mt-5">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex-shrink-0">
            <img onClick={goProfile}
              src={"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
              alt="User Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="ml-3">
            <span className="font-semibold text-white">{username}</span>
          </div>
        </div>
        <img src={"https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"} alt="Post" className="w-full" />
        <p className="text-white">{caption}</p>
        <div className="mt-4">
          <span>
          <FontAwesomeIcon icon={faHeart} style={{color: "#ffffff",}} size='xl' className='mr-4' />
          </span>
          <span>
          <FontAwesomeIcon icon={faComment} style={{color: "#ffffff",}} size='xl' className='mr-4' />
          </span>
          <br />
          <span className="text-white">{likes} likes</span>
        </div>
      </div>
    </div>
  
  );
};

export default PostCard;
