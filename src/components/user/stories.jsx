import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { handleToggle } from '../../utils/storyModalSlice';
import MyAxiosInstance from '../../utils/axios';
import { IMG_CDN } from '../../config/urls';


function Stories() {

  // states
  const axiosInstance = MyAxiosInstance()
  const [stories,setStories] = useState([])
  const [dead,setDead] = useState([])
  
// functions
  const getData = async()=>{
   
    const response = await axiosInstance.get("getstories")
    const now = new Date()
    const dead = response.data.filter((x)=>Date.parse(x.expire) < now)
    expireAction(dead)
    const temp = response.data.filter((x)=>Date.parse(x.expire) > now)
    // console.log(Date.parse(now))
 
  
    const uniqueArray = removeDuplicates(temp, item => item.uid);

    setStories(uniqueArray)
    
  }

  const expireAction = async (data)=>{
    const uids = data.map((x)=>x._id)
    
  let response = await axiosInstance.post('expiredstories',uids)
  

  }

  function generateRandomWord() {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const wordLength = Math.floor(Math.random() * 3) + 6; // Generates a length between 6 and 8

    let randomWord = '';
    for (let i = 0; i < wordLength; i++) {
        if (i % 2 === 0) {
            randomWord += consonants[Math.floor(Math.random() * consonants.length)];
        } else {
            randomWord += vowels[Math.floor(Math.random() * vowels.length)];
        }
    }

    return randomWord;
}

function removeDuplicates(array, key) {
  const seen = new Set();
  return array.filter(item => {
      const itemKey = key(item);
      if (!seen.has(itemKey)) {
          seen.add(itemKey);
          return true;
      }
      return false;
  });
}


  //useEffects

  useEffect(()=>{
    if(localStorage.getItem('userToken'))
    {
      getData()
    }

  
  },[])
 
    return (
      <div className="flex items-center justify-between ">
      <div className="flex w-90 overflow-x-auto p-2 scroll-container"> 

      {/* <Link to='' className="story-link  ml-2">
       <span className='text-white'>No Stories available....      
</span>
     </Link> */}

       {stories.length > 0 ? stories.map((x)=>{
        return(
          <Link to={`/stories/${x.username}`} key={x._id} className="story-link  ml-2">
          <img  src={x.dp ? IMG_CDN+x.dp : "https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"} alt="" className='rounded-full w-20 h-20  border-2 border-pink-500 object-cover' />
          <span className='text-sm text-white flex justify-center'>
            {x.username}
          </span>
          </Link>
        )
       }) 
       :
       <Link to='' className="story-link  ml-2">
       <span className='text-white'>No Stories available....      
</span>
     </Link>
     }

        {/* <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        <Link to='/stories/0' className="story-link  ml-2">
        <img  src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg" alt="" className='rounded-full w-20 h-20  border-2 border-pink-500' />
        <span className='text-sm text-white flex justify-center'>
          {generateRandomWord()}
        </span>
        </Link>
        */}

       
        

        </div>
  
       
  
      </div>
    );
}

export default Stories