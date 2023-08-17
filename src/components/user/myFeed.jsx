import React, { useEffect, useState } from 'react';
import PostCard from './post';
import SideBar from './sideBar';
import ProfileBar from './profileBar';
import Stories from './stories';
import { useNavigate } from 'react-router';
import MyAxiosInstance from '../../utils/axios';
import { IMG_CDN, VIDEO_CDN } from '../../config/urls';

const MyFeed = () => {

  const axiosInstance = MyAxiosInstance()

  const [suggested, setSuggested] = useState([])
  const [posts, setPosts] = useState([])

  const goto = useNavigate()


  const getData = () => {

    axiosInstance.get('myfeed').then((response) => {


      axiosInstance.get('allPosts').then((response4) => {




        setSuggested(response4.data)





        let dat = response.data.map((x) => {
          return x.uid
        })


        axiosInstance.post('shortlist', dat).then((response1) => {

          let dat1 = response1.data
          let dat2 = response.data


          for (let i = 0; i < dat1.length; i++) {

            for (let j = 0; j < dat2.length; j++) {
              if (dat1[i].uid == dat2[j].uid) {
                dat2[j].username = dat1[i].username
                dat2[j].profilePicture = dat1[i].dp


              }
            }
          }

          setPosts(response.data)


        })





      })







    })


  }

  useEffect(() => {

    if (!localStorage.getItem('userToken')) {
      goto('/login')
    }
    else {
      getData()
    }



  }, [])
 
  return (

    <div className='flex flex-row justify-items-start lg:mx-40'>

     
        <SideBar />

  

      <div className='overflow-x-auto sm:w-screen sm:p-10 md:w-screen lg:w-1/2 mb-16 '>
        <div className='mt-16 lg:mt-6 '>
          <Stories />
        </div>

        {posts.length != 0 && posts.map((post, key) => {

          return (
            <PostCard
              username={post.username}
              type={post.postType}
              dp={IMG_CDN + post.profilePicture}
              image={IMG_CDN + post.picture}
              video={VIDEO_CDN + post.picture}
              caption={post.caption}
              likes={post.likes}
              date={post.date}
              id={post._id}
              uid={post.uid}
              comments={post.comments}
              key={post._id}

            />
          )
        })}

        <div className='w-full mt-10'>
          <p className='text-white border-t border-b py-2 font-bold'>
            Suggested
          </p>
        </div>



        {suggested.length != 0 && suggested.map((post) => {

          return (
            <PostCard
              username={post.username}
              type={post.postType}
              dp={IMG_CDN + post.profilePicture}
              image={IMG_CDN + post.picture}
              video={VIDEO_CDN + post.picture}
              caption={post.caption}
              likes={post.likes}
              date={post.date}
              id={post._id}
              uid={post.uid}
              comments={post.comments}
              key={post._id}

            />
          )
        })}
       
      </div>

      <div className="hidden lg:block  justify-items-end fixed right-10 top-20">
        <ProfileBar />
      </div>



    </div>







  );
};

export default MyFeed;
