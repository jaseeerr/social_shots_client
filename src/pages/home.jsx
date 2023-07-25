import React, { useEffect, useState } from 'react';
import PostCard from '../components/user/post';
import SideBar from '../components/user/sideBar';
import ProfileBar from '../components/user/profileBar';
import Stories from '../components/user/stories';
import StoriesSmall from '../components/user/storiesSmall';
import StoryModal from './storyModal';
import Modal from '../components/user/test';
import { useNavigate } from 'react-router';
import MyAxiosInstance from '../utils/axios';
import { IMG_CDN } from '../config/urls';

const Home = () => {

  const axiosInstance = MyAxiosInstance()

  


const goto = useNavigate()


const getData = ()=>{

  axiosInstance.get('myfeed').then((response)=>{

      console.log(response)

    setPosts(response.data)
    

    
    
  })


}

  useEffect(()=>{

    if(!localStorage.getItem('userToken'))
    {
       goto('/login')
    }

    getData()
  },[])


  const [posts,setPosts] = useState([])


  const images = [
    'https://images.unsplash.com/photo-1533561797500-4fad4750814e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwc3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1533561797500-4fad4750814e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwc3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1533561797500-4fad4750814e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwc3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1533561797500-4fad4750814e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwc3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1533561797500-4fad4750814e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwc3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1533561797500-4fad4750814e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwc3Rvcmllc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
]
  return (



   <>

  

   <div className='flex flex-row justify-items-start lg:mx-40'>
  
  <div className=''>
  <SideBar />
 
  </div>
   
  

     
    <div className='overflow-x-auto sm:w-screen sm:p-10 md:w-screen lg:w-1/2 mb-16 '>
      <div className='mt-16 lg:mt-6 '>
      <Stories/>
      </div>
      {/* <div className='mt-16 md:hidden lg:hidden'>
      <StoriesSmall/> 
      </div> */}
   
  
    {posts.length!=0 && posts.map((post,key)=>{

      return(
        <PostCard
        username={post.username}
        dp = {IMG_CDN+post.profilePicture}
        image={IMG_CDN+post.picture} 
        caption={post.caption}
        likes={post.likes}
        date={post.date}
        id={post._id}
        uid={post.uid}
        comments={post.comments}

        
        />
      )
    })}
    <PostCard
           username="John"
           image="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
           likes={213}
           caption="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates rem, eius et aliquid, eum repellat numquam amet quaerat nulla iure earum provident corporis exercitationem, voluptatem suscipit esse molestiae vel incidunt."
         />
         <PostCard
           username="John"
           image="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
           likes={213}
           caption="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates rem, eius et aliquid, eum repellat numquam amet quaerat nulla iure earum provident corporis exercitationem, voluptatem suscipit esse molestiae vel incidunt."
         />
          <PostCard
           username="John"
           image="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
           likes={213}
           caption="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates rem, eius et aliquid, eum repellat numquam amet quaerat nulla iure earum provident corporis exercitationem, voluptatem suscipit esse molestiae vel incidunt."
         />
          <PostCard
           username="John"
           image="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
           likes={213}
           caption="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates rem, eius et aliquid, eum repellat numquam amet quaerat nulla iure earum provident corporis exercitationem, voluptatem suscipit esse molestiae vel incidunt."
         />
          <PostCard
           username="John"
           image="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
           likes={213}
           caption="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates rem, eius et aliquid, eum repellat numquam amet quaerat nulla iure earum provident corporis exercitationem, voluptatem suscipit esse molestiae vel incidunt."
         />
    </div>

    <div className="hidden lg:block  justify-items-end fixed right-10 top-20">  
<ProfileBar/>
</div>
  
  
   
   </div>
  
   
   </>
      
        

 
  );
};

export default Home;
