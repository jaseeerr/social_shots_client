import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment,faHeart,faEllipsis } from '@fortawesome/free-solid-svg-icons';
import jwt from "jsonwebtoken"
import MyAxiosInstance from '../../utils/axios';
import { Toaster, toast } from 'react-hot-toast';

import { IMG_CDN } from '../../config/urls';

const PostCard = ({ username, image, likes, caption, dp, date, id,uid, comments, type, video }) => {

  const axiosInstance = MyAxiosInstance()

  const myData = jwt.decode(localStorage.getItem('userToken'))
  const [own,setOwn] = useState(false)

  const [showLikes, setShowLikes] = useState(false)
  const  [like,setLike] = useState(false)
  const [likelist,setLikelist] = useState([])
  const [showOptions, setShowOptions] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentList,setCommentList] = useState([])
  const [newComment,setNewcomment] = useState(null)


  // const [likes,setLikes] = useState(likes)






  const goto = useNavigate()
  const goProfile = ()=>{
    goto('/profile')
  }

  const getShortlist = ()=>{

    axiosInstance.post('shortlist',likes).then((response)=>{

      console.log(response)


      setLikelist(response.data)


     

    })


  }


  const getShortlist1 = async (dat)=>{

   
    let uids
    let dat1
      if(dat)
      {
       dat1 = dat
       console.log("aa");
       uids = dat.map((x)=>{
         return x.uid
       })
      }
      else
      {
       dat1 = commentList
       console.log("bb");
        uids = commentList.map((x)=>{
         return x.uid
       })
      }
         
       
   
         const list1 = await axiosInstance.post('shortlist1',uids)
         const list = list1.data
       
        
        
        
         for(let i=0;i<list.length;i++)
         {
          
           for(let j=0;j<dat1.length;j++)
           {
             if(list[i].uid==dat1[j].uid)
             {
               dat1[j].username = list[i].username
               dat1[j].dp = list[i].dp
               
               // dat1[j]
             }
           }
         }
   
          // dat1 = dat1.reverse()
   
           setCommentList(dat1)
   
   
        
         
   
   
   
   
         
   
       
   
        
   
       }
     

  const reportPost = ()=>{

    axiosInstance.get(`report/${id}`).then((response)=>{

      if(response.data.success)
      {
        toast.success("POST REPORTED")
        setShowOptions(false)
      }
      else
      {
        toast.error("Unknown error occurred")
      }
    })
  }

  const deletePost = ()=>{

    axiosInstance.get(`deletepost/${id}`).then((response)=>{
      if(response.data.success)
      {
        toast.success("POST DELETED")
        setTimeout(()=>{
          location.reload()
        },900)
        
      }
      else
      {
        toast.error("Unknown error occurred")
      }
    })
  }


  useEffect(()=>{

    getShortlist1()

    if(myData?._id==uid)
    {
      setOwn(true)
    }

    for(let i=0;i<likes.length;i++)
    {
     
      if(likes[i]==myData?._id)
      {
        
        setLike(true)
        break;
      }
    }

  },[])

  const like1 = ()=>{

    axiosInstance.get(`like/${id}`).then((response)=>{

      if(response.data.success)
      {
        setLike(true)
        likes.push(myData?._id)
      }
    })
  }

  const unlike1 = ()=>{

    
    axiosInstance.get(`unlike/${id}`).then((response)=>{

      if(response.data.success)
      {
        setLike(false)
        likes.pop()
      }
    })


  }



  return (
    <>
    <Toaster/>
         <div className="bg-black shadow-2xl  overflow-hidden  border rounded-md mt-16">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex-shrink-0">
            <img onClick={goProfile}
              src={dp ? dp :"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          <div className="ml-3">
            <span className="font-semibold text-white">{username}</span>
          </div>


{/* New button element */}
<button onClick={()=>setShowOptions(true)}
       // Replace "handleButtonClick" with the function to be executed on button click
      className="text-white px-4 py-2 ml-80"
    >
       <FontAwesomeIcon icon={faEllipsis} style={{ color: "#ffffff", }} />
    </button>



        </div>
        {type=="img" ? 
                <img src={image? image : "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"} alt="Post" className="w-full" />
         :
         <video controls className='w-full'>
  <source src={video ? video : null} type="video/mp4" />
  Your browser does not support the video tag.
</video>
      }
        <p className="text-white">{caption}</p>
        <div className="mt-4">
         
        {  like ? 
            <span onClick={unlike1}>
                <FontAwesomeIcon icon={faHeart} style={{color: "#ff0000",}} size='xl' className='mr-4 cursor-pointer' /> 
            </span>
          
            :
            <span onClick={like1}>
                 <FontAwesomeIcon icon={faHeart} style={{color: "#ffffff",}} size='xl' className='mr-4 cursor-pointer' />
            </span>
         }
         
          
      
          <span  onClick={()=>{
                      getShortlist1(comments.reverse())
                      setShowComments(true)}}>
          <FontAwesomeIcon icon={faComment} style={{color: "#ffffff",}} size='xl' className='mr-4 cursor-pointer' />
          </span>
          <br />
          {likes.length!=0 ?   <span className="text-white cursor-pointer" onClick={()=>{
            setShowLikes(true)
            getShortlist()
          }}>{likes.length} likes</span> : null}
        
        
        </div>
        <span className='text-gray-400  text-xs'>
          <p className='mt-3'>
          Posted on {date ? date : "22 Jul 2023"}
          </p>
                  
                  </span>
      </div>
    </div>


     {/* likes Modal */}
     {showLikes && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
          
          <div className="bg-black p-8 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-3 text-white">{likes && likes.length} Likes</h2>


<div className='max-h-44 overflow-x-auto'>


{
 likes && likes.length!=0 
?
likelist.map((x)=>{
  return(

    <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <img
                  src={x.dp ? IMG_CDN+x.dp :"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <span className="font-semibold text-white">{x.username}</span>
              </div>
            </div>
  )
})

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




          {/* Options Modal */}
          {showOptions && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-black p-8 rounded-lg w-80">
                 
                 {own ?

                <button onClick={deletePost} className="bg-red-600 hover:bg-red-700 mt-2 text-white font-semibold w-full rounded">
                Delete Post
                </button>
                :

                <button onClick={reportPost} className="bg-red-600 hover:bg-red-700 text-white font-semibold w-full rounded">
                Report Post
                </button> 
                }
              
                  
                       
 
               
                  <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm w-full"
                    onClick={()=>setShowOptions(false)}
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
            <h2 className="text-xl font-semibold mb-3 text-white underline">Comments</h2>


<div className='max-h-44 overflow-y-auto overflow-x-hidden'>

  {/* <div className='mb-4 mt-2'>
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
  </div> */}

  { commentList.length!=0 ?
    commentList.map((comment, key)=>{
      return(
        <div className='mb-4 mt-2' key={key}>
  <div className="flex items-center mb-4 ">
              <div className="flex-shrink-0">
                <img
                  src={comment.dp ? IMG_CDN+comment.dp :"https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <span className="font-semibold text-white">{comment.username}</span>
              </div>
              <div>
              {comment.uid==myData?._id ? 

<span className='text-gray-400  text-xs flex ml-2 mt-3'
onClick={()=>{
 const dat2 = {
   pid:id,
   cid:comment.index

 }
 axiosInstance.post('deletecomment',dat2).then((response)=>{

  

   getShortlist1(response.data.data3)

   console.log(response);


 })
}}

> 
       <svg xmlns="http://www.w3.org/2000/svg" className='mb-2 cursor-pointer' width={17} viewBox="0 0 24 24"><path d="M20 7V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V7H2V5H22V7H20ZM6 7V20H18V7H6ZM11 9H13V11H11V9ZM11 12H13V14H11V12ZM11 15H13V17H11V15ZM7 2H17V4H7V2Z" fill="rgba(245,5,5,0.9)"></path></svg>
       </span>
:

null}
              </div>
            </div>
            <span className='w-4'>
              <div className='text-white w-full px-2'>
              {comment.comment}
              </div>
          
        </span>

              <p className='text-gray-400 mt-1 text-xs'>{comment.date}</p>
  </div>
      )
    })
    :
    <p className='text-white mb-5'>No Comments Yet</p>
  }
 

 





  
</div>
          
          
            {/* new */}
  <div className="mb-4">
    <hr />
        <label className="block text-gray-200 text-sm font-bold mb-2 mt-3" htmlFor="commentInput">
          Add a comment:
        </label>
        <input
        onChange={(e)=>{

          if(e.target.value.trim().length==0)
          {
            setNewcomment(null)

          }
          else
          {
            setNewcomment(e.target.value.trim())
          }
          

        }}
        maxLength={150}
        className="appearance-none border bg-blue-950 border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="commentInput" type="text" placeholder="Type your comment here..."/>
      </div>
      <div className="flex items-center justify-between">
        <button 
        onClick={()=>{

          if(newComment==null)
          {
            console.log("nuuul");
            return
          }

          const data2 = {
            newComment,
            id:id,

          }
          axiosInstance.post(`comment`,data2).then((response)=>{

            console.log(response)
            const dat = response.data.data.comments.reverse()
            // setCommentList(dat)
           console.log(dat);
            getShortlist1(dat)
            
          
          })

          document.getElementById('commentInput').value = ""
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-sm mb-5 rounded focus:outline-none focus:shadow-outline"
          type="button">
          Add Comment
        </button>
      </div>
     
  {/* new ends */}

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
  

  
  );
};

export default PostCard;
