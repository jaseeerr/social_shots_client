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
  
    <div className="bg-black shadow-2xl overflow-hidden border rounded-md mt-5">
  <div className="p-4 flex items-center"> {/* Modified the class to "flex items-center" */}
    <div className="flex-shrink-0">
      <img
        onClick={goProfile}
        src={"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
        alt="User Profile"
        className="w-8 h-8 rounded-full"
      />
    </div>
    <div className="ml-3 flex-grow"> {/* Added "flex-grow" class to make this div take the remaining space */}
      <span className="font-semibold text-white">{username}</span>
    </div>
    {/* New button element */}
    <button
       // Replace "handleButtonClick" with the function to be executed on button click
      className="text-white font-semibold bg-blue-500 rounded px-4 py-2"
    >
      Button
    </button>
  </div>
  <img
    src={"https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"}
    alt="Post"
    className="w-full"
  />
  <p className="text-white">{caption}</p>
  <div className="mt-4">
    <span>
      <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} size="xl" className="mr-4" />
    </span>
    <span>
      <FontAwesomeIcon icon={faComment} style={{ color: "#ffffff" }} size="xl" className="mr-4" />
    </span>
    <br />
    <span className="text-white">{likes} likes</span>
  </div>
</div>

  
  );
};

export default PostCard;
