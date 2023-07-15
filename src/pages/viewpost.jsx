import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MyAxiosInstance from '../utils/axios';
import { IMG_CDN } from '../config/urls';

const ViewPost = ({ images }) => {
    const axiosInstance = MyAxiosInstance();

    const {id} = useParams()
    const [data,setData] = useState({})
    const goto = useNavigate()

   
    useEffect(()=>{

       
        axiosInstance.get(`getOnePost/${id}`).then((response)=>{

            console.log(response.data)
            setData(response.data)

        })

    },[])
  const userdata = {
    followers: []
  }

  const [showPost, setShowPost] = useState(true)
  const [showLikes, setShowLikes] = useState(false)
  const [showComments, setShowComments] = useState(false)


  

  return (
    <>
      {/* Main post Modal */}
      {showPost && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" >






          <Link onClick={()=>goto(-1)}>
            <span className="fixed top-14 sm:right-40 flex justify-center sm:justify-start sm:ml-auto">
              <FontAwesomeIcon icon={faXmark} size="2xl" style={{ color: "#ffffff" }} />
            </span>
          </Link>




          <div className=" p-3 rounded-lg lg:w-1/3 w-96 h-50">

            <div className=''>
              <div className="bg-black shadow-2xl  overflow-hidden  border rounded-md mt-5">
                <div className="p-4">
                  <div className="flex items-center mb-2 cursor-pointer" onClick={()=>goto(`/${data.username}`)}>
                    <div className="flex-shrink-0">
                      <img
                        src={data && IMG_CDN+data.picture}
                        alt="User Profile"
                        className="w-9 h-9 rounded-full shadow-2xl"
                      />
                    </div>
                    <div className="ml-3">
                      <span className="font-semibold text-white">{data && data.username}</span>
                    </div>
                  </div> 
                  <img src={data && IMG_CDN+data.picture} alt="Post" className="w-full mb-4" />
                  <span>
                      <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff", }} size='xl' className='mr-4' />
                    </span>
                    <span onClick={()=>setShowComments(true)}>
                      <FontAwesomeIcon icon={faComment} style={{ color: "#ffffff", }} size='xl' className='mr-4' />
                    </span>
                  <p className="text-white mt-3 mb-3">{data && data.caption}</p>
                  <div className=" ">
                  
                {data && data?.likes?.length>0 ?
                                    <span className="text-white cursor-pointer" onClick={() => setShowLikes(true)}>{data && data.likes.length} likes</span>
                                      :
                                      null
                                      }
                  </div>
                </div>
              </div>
            </div>

            {/* <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button> */}
          </div>
        </div>
      )}



      {/* likes Modal */}
      {showLikes && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
          <div className="bg-black p-8 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-3 text-white">{data && data.likes.length} Likes</h2>


<div className='max-h-44 overflow-x-auto'>


{data && data.likes.length!=0 
?
<div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <img
                  src={"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="ml-3">
                <span className="font-semibold text-white">jaseeerr</span>
              </div>
            </div>
:
<p className='text-white'>No one has liked this post yet</p> }




          

         

        

        

        
</div>
          
          
          

            <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={()=>setShowLikes(false)}
                  >
                    Close
                  </button>
          </div>
        </div>
      )}



       {/* Comments Modal */}
       {showComments && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
          <div className="bg-black p-8 rounded-lg w-1/2">
            <h2 className="text-xl font-semibold mb-3 text-white">Comments</h2>


<div className='max-h-44 overflow-x-auto'>
  <div className='mb-4'>
  <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <img
                  src={"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="ml-3">
                <span className="font-semibold text-white">jaseeerr</span>
              </div>
           
            </div>
            <span>
                <p className='text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat et culpa commodi! Maiores similique deserunt cupiditate voluptatum nam! Non harum porro autem impedit consequuntur fugit atque rem quas eligendi veniam.</p>
              </span>
  </div>

  <div className='mb-4'>
  <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <img
                  src={"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="ml-3">
                <span className="font-semibold text-white">jaseeerr</span>
              </div>
           
            </div>
            <span>
                <p className='text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat et culpa commodi! Maiores similique deserunt cupiditate voluptatum nam! Non harum porro autem impedit consequuntur fugit atque rem quas eligendi veniam.</p>
              </span>
  </div>

  <div className='mb-4'>
  <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <img
                  src={"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="ml-3">
                <span className="font-semibold text-white">jaseeerr</span>
              </div>
           
            </div>
            <span>
                <p className='text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat et culpa commodi! Maiores similique deserunt cupiditate voluptatum nam! Non harum porro autem impedit consequuntur fugit atque rem quas eligendi veniam.</p>
              </span>
  </div>

  <div className='mb-4'>
  <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <img
                  src={"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="ml-3">
                <span className="font-semibold text-white">jaseeerr</span>
              </div>
           
            </div>
            <span>
                <p className='text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat et culpa commodi! Maiores similique deserunt cupiditate voluptatum nam! Non harum porro autem impedit consequuntur fugit atque rem quas eligendi veniam.</p>
              </span>
  </div>

  <div className='mb-4'>
  <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <img
                  src={"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="ml-3">
                <span className="font-semibold text-white">jaseeerr</span>
              </div>
           
            </div>
            <span>
                <p className='text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat et culpa commodi! Maiores similique deserunt cupiditate voluptatum nam! Non harum porro autem impedit consequuntur fugit atque rem quas eligendi veniam.</p>
              </span>
  </div>
</div>
          
          
          

            <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={()=>setShowComments(false)}
                  >
                    Close
                  </button>
          </div>
        </div>
      )}
    </>
  )
};

export default ViewPost;
