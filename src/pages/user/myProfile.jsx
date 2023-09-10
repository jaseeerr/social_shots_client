import React, { useEffect, useState } from 'react'
import SideBar from '../../components/user/sideBar'
import MyAxiosInstance from '../../utils/axios';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Toaster, toast } from 'react-hot-toast';
import { IMG_CDN, VIDEO_CDN,SOCKET_URL } from '../../config/urls';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserdata } from '../../utils/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client'
const socket = io.connect(SOCKET_URL)

function MyProfile() {
  const dispatch = useDispatch()

  const [bioBtn, setBioBtn] = useState(false)
  const [newp, setNewp] = useState(null)
  const [bload, setBload] = useState(false)

 
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [bio, setBio] = useState()
  const [privateAcc, setPrivateAcc] = useState()
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [err, setErr] = useState(false)
  const [pass, setPass] = useState(false)
  const [posts, setPosts] = useState([])
  const [own, setOwn] = useState()
  const [Fid,setFid] = useState()
  const [otpSend, setOtpSend] = useState(false)
  const [verifyBtn, setVerifyBtn] = useState(false)

  const [loader, setLoader] = useState(false)

  const axiosInstance = MyAxiosInstance();
  const goto = useNavigate()

  const [userdata, setUserdata] = useState(null)
  const [myData, setMyData] = useState({})


  // buttons state
  const [followBtn, setFollowBtn] = useState(false)
  const [followingBtn, setFollowingBtn] = useState(false)
  const [requestedBtn, setRequestedBtn] = useState(false)


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file?.type.startsWith('image/'))
    {
      toast.error("Invalid File")
    }
    else
    {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      const data = userdata
      data.dp = imageFile
  
      setUserdata(data)
    }
  
  };

  const { id } = useParams()


  async function getData() {
    try {
      setLoader(true);

      const mydata = await axiosInstance.get('myData')
      setMyData(mydata)
    


      axiosInstance.get(`profile/${id}`).then((dataResponse) => {
        
        const data = dataResponse.data;
      
        setFid(data?.data1?._id);
       
      //  if(data.data1 == {})
      if (Object.keys(data?.data1).length === 0 && data.data1.constructor === Object)
       {
       
        goto('/explore')
        return
       }
    

        let arr = data.data1.followers
    


        for (let i = 0; i < arr.length ; i++) {
          if (data?.data1?.followers[i]?.uid == mydata?.data?._id) {
            setFollowingBtn(true)
            break;
          }
         
         
        }

        for (let i = 0; i < data?.data1?.requests.length ; i++) {
        
          if(data?.data1?.requests[i]?.uid == mydata?.data?._id)
          {
            setRequestedBtn(true)
            break   
          }
        }










        axiosInstance.get(`posts/${id}`).then((data1Response) => {


          const data1 = data1Response.data;

          data.data1.posts = data1;

          setPosts(data1);
          setOwn(data.own);
          setUserdata(data.data1);
          setUsername(data?.data?.data1?.username);
         
          setEmail(data?.data?.data1?.email);
          setPhone(data?.data?.data1?.phone);
          setBio(data?.data?.data1?.bio);
          setLoader(false);

        }).then(()=>{

         
        

        })

    



      })

    } catch (error) {
      console.error('Error occurred while fetching data:', error);
      // Handle the error accordingly
      setLoader(false);
    }
  }



  async function follow1() {

    const response = await axiosInstance.get(`follow/${id}`)

    if (response.data.success) {
      userdata.followers.push(response.data.data)

      setFollowingBtn(true)
      const data = {
        pid:null,
        from :myData?.data?._id,
        to:Fid,
        type:"follow",
        img:this.type=="img" ? image : "https://cdn4.iconfinder.com/data/icons/ios-edge-glyph-12/25/Video-Play-512.png",

       }

       socket.emit("notification",data)


    }
    else if (response.data.requested) {
      setRequestedBtn(true)
      setFollowingBtn(false)
    }





  }

  async function unfollow1() {
    setFollowingBtn(false);
    setRequestedBtn(false)
    axiosInstance.get(`unfollow/${id}`).then((data) => {
     
      data.data.data1.posts = posts
      setUserdata(data.data.data1)


    })



  }


  const report = async()=>{

    let response = await axiosInstance.get(`reportAccount/${userdata._id}`)
    if(response.data.success)
    {
      toast.success("Reported")
    }
    else
    {
      toast.error("Error occurred")
    }
      setShowOptions(false)
  }

  const direct = ()=>{

    goto(`/direct/${userdata._id}`)
  }




  useEffect(() => {
    getData()

  }, [id])


  useEffect(() => {

    handleCloseModal()

    if (!localStorage.getItem('userToken')) {
      goto('/login')
    }
    else {

      getData()

    }

  }, [])




  useEffect(() => {

    if (imageFile) {
      const newFileName = `dp${id}`;
      const data = new FormData()
      data?.append("file", imageFile, newFileName)
      data?.append("upload_preset", "olx_img")
      data?.append("cloud_name", "dfhcxw70v")

      axios.post(
        'https://api.cloudinary.com/v1_1/dfhcxw70v/image/upload',
        data
      ).then((response) => {



        axiosInstance.get(`updatedp/${response.data.public_id}`).then((res) => {

          if (res.data.success) {

            handleCloseModal()
            toast.success("Updated!")
            goto(`/${id}`)
          }
        })
      })
    }

  }, [imageFile])


  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showAcTypeModal, setShowAcTypeModal] = useState(false)
  const [showOptions,setShowOptions] = useState(false)



  // Dummy follower and following data (replace with your actual data)
  const followers = [];
  const following = ['Following 1', 'Following 2', 'Following 3'];
  const posts1 = [
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
  ]
  // const posts = []

  // Event handlers to show/hide the modal
  const handleFollowersClick = () => {
    setShowFollowersModal(true);
  };

  const handleFollowingClick = () => {
    setShowFollowingModal(true);
  };

  const handleEditClick = () => {
    setShowEditModal(true)
  };

  const handleShowUsernameModal = () => {
    setShowUsernameModal(true)
  };

  const handleshowPhoneModal = () => {
    setShowPhoneModal(true)
  };

  const handleCloseModal = () => {
    setShowFollowersModal(false);
    setShowFollowingModal(false);
    setShowEditModal(false);
    setShowUsernameModal(false);


  };


  const logout = () => {

    localStorage.removeItem('userToken')
    dispatch(updateUserdata({}))
    goto('/login')

  }

  const viewPost = (id) => {
    goto(`/viewPost/${id}`)
  }



  return (
    <>
      <Toaster />
      {loader ? <div className='flex justify-center mt-96 w-full h-screen'>
        <div className="text-center">
          <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div> : <div className='flex'>



       
        <SideBar />

        <div className="bg-black text-white min-h-screen  lg:ml-36 lg:-mt-3 mt-7 ">

          <main className="max-w-full mx-auto px-6 py-8  sm:mt-24 ">
            <div className="flex">
              {/* Profile Picture */}
              <div className="w-1/4 rounded-full">
                <img
                  src={imageFile ? imageUrl : IMG_CDN + userdata?.dp}
                  alt="Profile Picture"
                  className="rounded-full w-40 h-40 object-cover border"
                />
              </div>

              {/* User Info */}

              <div className="w-3/4 pl-10">
                {own ?
                  <div className="flex items-center">
                    <h2 className="text-2xl font-semibold">{userdata?.username}</h2>
                    <button className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm hidden md:block lg:block" onClick={handleEditClick}>
                      Edit Profile
                    </button>

                    <button onClick={logout} className="ml-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm hidden md:block lg:block">
                      Logout
                    </button>
                  </div>
                  :
                  <div className="flex items-center">
                    <h2 className="text-2xl font-semibold">{userdata?.username}</h2>
                    {followingBtn ?
                      <button onClick={() => unfollow1()} className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm hidden md:block lg:block" >
                        Following
                      </button>
                      :
                      requestedBtn
                        ?
                        <button onClick={() => unfollow1()} className="ml-4 bg-black border font-semibold text-white px-2 py-1 rounded-lg text-sm hidden md:block lg:block" >
                          Requested
                        </button>
                        :
                        <button onClick={() => follow1()} className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm hidden md:block lg:block" >
                          Follow
                        </button>
                    }
                    {
                      !userdata?.private || followingBtn ?  
                      <button onClick={direct} className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm hidden md:block lg:block" >
                      Message
                    </button>
                    : null
                    }
                    {/* <button onClick={()=>follow1()} className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm hidden md:block lg:block" >
                      Follow
                    </button> */}

                    <button onClick={()=>{
                              setShowOptions(true)
                    }} className="ml-4  text-white px-2 py-1 rounded-lg text-sm hidden md:block lg:block">
                      <FontAwesomeIcon icon={faEllipsis} style={{ color: "#ffffff", }} />
                    </button>
                  </div>
                }


                <div className="mt-2 hidden md:block lg:block">
                  <span className="text-white mr-1"><span className='font-semibold'>{userdata?.posts.length}</span> posts |</span>
                  <span className="text-white mr-1" onClick={handleFollowersClick}><span className='font-semibold'>{userdata?.followers.length}</span> followers |</span>
                  <span className="text-white" onClick={handleFollowingClick}><span className='font-semibold'>{userdata?.following.length}</span> following</span>
                </div>

                {/* buttons for small screen */}
                {own ?
                  <span className='sm:hidden'>
                    <button onClick={handleEditClick} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm mr-2">
                      Edit Profile
                    </button>
                    <button onClick={logout} className="mt-2 sm:ml-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm">
                      Logout
                    </button>
                  </span>
                  :
                  <span className='sm:hidden'>
                    {followingBtn ?
                      <button onClick={unfollow1} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm mr-2">
                        Following
                      </button>
                      :
                      requestedBtn
                        ?
                        <button onClick={unfollow1} className="mt-2 bg-black font-semibold text-white px-2 py-1 rounded-lg text-sm mr-2">
                          Requested
                        </button>
                        :
                        <button onClick={follow1} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm mr-2">
                          Follow
                        </button>
                    }

                    <button onClick={()=>{
                              setShowOptions(true)
                    }} className="mt-2 sm:ml-4 text-white px-2 py-1 rounded-lg text-sm">
                      <FontAwesomeIcon icon={faEllipsis} style={{ color: "#ffffff", }} />
                    </button>
                  </span>
                }


                {/* buttons for small screen ends */}

                <div className="mt-4 w-3/4">
                  {/* <h3 className="font-semibold">Bio:</h3> */}
                  <p className="text-white">
                    {userdata?.bio}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-center border-t border-b  sm:hidden">
              <span className="text-white mr-3">{userdata?.posts.length} posts</span>
              <span className="text-white mr-3" onClick={handleFollowersClick}>{userdata?.followers.length} followers</span>
              <span className="text-white" onClick={handleFollowingClick}>{userdata?.following.length} following</span>
            </div>

            {/* Photos */}
            <div className="mt-8 sm:border-t ">
              <h3 className="text-2xl font-semibold mb-4">Photos</h3>
              <div className="grid grid-cols-3 gap-4 mb-0 md:mb-8 sm:mb-8" >
                {posts.length !== 0 && own || posts.length!==0 && followingBtn ||posts.length!=0 && !userdata.private? (
                  // Render posts
                  posts.map((post, index) => (
                    <Link to={`/viewPost/${post._id}`}>
                      {post.postType=="img" ?
                       <img

                       key={post._id}
                       src={IMG_CDN + post.picture}
                       alt={`Photo ${index + 1}`}
                       className="w-full h-60 object-cover rounded-lg cursor-pointer hover:opacity-50"
                     />
                     :

                     <video   className="w-full h-60 object-cover rounded-lg cursor-pointer hover:opacity-50">
                     <source src={ VIDEO_CDN+post.picture} type="video/mp4" />
                     Your browser does not support the video tag.
                   </video>

                    }
                     
                    </Link>

                  ))
                ) : userdata?.private && !followingBtn && !own ?
                  <>
                    <div className="flex items-center justify-center mt-20  ">
                      <span className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80">
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"
                            fill="rgba(255,255,255,1)"
                          ></path>
                        </svg>
                        <p className="text-white mt-2">Private account</p>
                        <small>Follow to see their posts.</small>
                      </span>
                    </div>
                  </>
                  : 
                  (
                    // Render placeholder image and text
                    <div className="flex items-center justify-center mt-20  ">
                      <span className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80">
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"
                            fill="rgba(255,255,255,1)"
                          ></path>
                        </svg>
                        <p className="text-white mt-2">NO POSTS YET!</p>
                      </span>
                    </div>
                  )}
              </div>
            </div>


            {/* Edit Profile Modal */}
            {showEditModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
                <div className="bg-black p-8 rounded-lg w-80">
                  <h2 className="text-xl font-semibold mb-2 text-white">Edit Profile</h2>
                  <span className=''>

                    <span className='flex mb-3'>
                      <img
                        src={imageFile ? imageUrl : userdata.dp.length > 25 ? userdata.dp : IMG_CDN + userdata.dp}
                        alt="Profile Picture"
                        className="rounded-full w-10 h-10 object-cover"
                      />
                      <input id='dp' type="file" hidden name="image" onChange={handleImageChange} />
                      <button onClick={() => document.getElementById('dp').click()} className='text-blue-600 font-semibold ml-5'>Change Profile Picture</button>

                    </span>

                    <span>
                      <div className="flex mb-3" onClick={handleShowUsernameModal}>
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                          <svg className="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                          </svg>
                        </span>
                        <input disabled
                        
                          value={username && username}
                          type="text" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userdata.username} />
                      </div>
                    </span>


                    <span>
                      <div className="flex mb-3 mt-3" onClick={handleshowPhoneModal}>
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z" fill="rgba(245,247,252,1)"></path></svg>                        </span>
                        <input disabled

                          value={phone} type="text" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userdata.phone} />
                      </div>
                    </span>



                    <span>
                      <div className="flex mb-3" onClick={() => {
                        setShowEmailModal(true)
                      }}>
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                          <svg className="w-4 h-4 text-white dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z" fill="rgba(255,255,255,1)"></path></svg>                                 </span>
                        <input

                          disabled type="text" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userdata.email} />
                      </div>
                    </span>


                    <span className=''>
                      <textarea
                        onChange={(e) => {

                          setBio(e.target.value)
                          if (e.target.value) {
                            setBioBtn(true)
                          }
                          else {
                            setBioBtn(false)
                          }
                        }}
                        style={{ resize: "none" }} id="bio" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userdata.bio} maxlength="120"></textarea>
                    </span>

                    {bioBtn ?
                      <button
                        onClick={() => {
                          const bio = document.getElementById('bio').value
                          axiosInstance.get(`updatebio/${bio}`).then((response) => {

                            if (response.data.success) {
                              toast.success("UPDATED")
                              getData()
                            }
                            else {
                              toast.error("ERROR OCCURRED")
                            }
                          })


                        }}
                        className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"> Update Bio</button>
                      :
                      null
                    }

                    {userdata.private ?
                      <span className='flex mt-3'>
                        <div className="flex items-center">
                          <input
                            onChange={() => {

                              setShowAcTypeModal(true)
                            }}
                            id="checked-checkbox" checked type="checkbox" value="1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private Account</label>
                        </div>
                      </span>
                      :
                      <span className='flex mt-3'>
                        <div className="flex items-center">
                          <input
                            onChange={() => {

                              setShowAcTypeModal(true)
                            }}
                            id="checked-checkbox" type="checkbox" value="0" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private Account</label>
                        </div>
                      </span>
                    }


                  </span>


                  <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* ACCOUNT TYPE Modal */}
            {showAcTypeModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
                <div className="bg-black p-8 rounded-lg w-80">
                  <h2 className="text-xl font-semibold mb-2 text-white"></h2>
                  <span className=''>
                    {userdata.private ? "Confirm to change your account type to public." : "Confirm to change your account type to private."}
                  </span>
                  <br />
                  <button
                    onClick={() => {
                      let x = 0
                      if (!userdata.private) {
                        x = 1
                      }

                      axiosInstance.get(`updateactype/${x}`).then((response) => {

                        if (response.data.success) {
                          setShowAcTypeModal(false)
                          toast.success("UPDATED")
                          getData()

                        }
                        else {
                          toast.error("UNKNOWN ERROR OCCURRED")
                        }
                      })

                    }}
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm mr-2"
                  >
                    Confirm
                  </button>
                  <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={() => {
                      setShowAcTypeModal(false)
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}


            {/* Email edit Modal */}
            {showEmailModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
                <div className="bg-black p-8 rounded-lg w-80">
                  <h2 className="text-xl font-semibold mb-2 text-white">Edit Email</h2>
                  <span className=''>

                  </span>
                  <input
                    onChange={(e) => { }}
                    type="email" id="email" className=" rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userdata.email ? userdata.email : "Your Number Without Country Code"} />


                  <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={() => { setShowEmailModal(false) }}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setBload(true)
                      const email = document.getElementById('email')
                      const value = document.getElementById('email').value
                      if (value == userdata.email) {
                        toast.error("Enter email is same as the current one.")
                      }
                      else if (email.checkValidity()) {
                        setErr(false)
                        axiosInstance.get(`update_email/${value}`).then((response) => {

                          setBload(false)
                          if (response.data.success) {
                            toast.success("Verification mail sent to your new mail.")
                            getData()
                          }
                          else {
                            toast.error("Couldn't update email.")
                          }
                          setShowEmailModal(false)

                        })
                      }
                      else {
                        setErr(true)
                      }
                    }}
                    className='mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm ml-2'>

                    {bload ?
                      <svg width="24" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-40 -mt-1 text-center"><g><circle cx="12" cy="3" r="1"><animate id="spinner_7Z73" begin="0;spinner_tKsu.end-0.5s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="16.50" cy="4.21" r="1"><animate id="spinner_Wd87" begin="spinner_7Z73.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="7.50" cy="4.21" r="1"><animate id="spinner_tKsu" begin="spinner_9Qlc.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="19.79" cy="7.50" r="1"><animate id="spinner_lMMO" begin="spinner_Wd87.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="4.21" cy="7.50" r="1"><animate id="spinner_9Qlc" begin="spinner_Khxv.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="21.00" cy="12.00" r="1"><animate id="spinner_5L9t" begin="spinner_lMMO.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="3.00" cy="12.00" r="1"><animate id="spinner_Khxv" begin="spinner_ld6P.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="19.79" cy="16.50" r="1"><animate id="spinner_BfTD" begin="spinner_5L9t.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="4.21" cy="16.50" r="1"><animate id="spinner_ld6P" begin="spinner_XyBs.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="16.50" cy="19.79" r="1"><animate id="spinner_7gAK" begin="spinner_BfTD.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="7.50" cy="19.79" r="1"><animate id="spinner_XyBs" begin="spinner_HiSl.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="12" cy="21" r="1"><animate id="spinner_HiSl" begin="spinner_7gAK.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><animateTransform attributeName="transform" type="rotate" dur="6s" values="360 12 12;0 12 12" repeatCount="indefinite" /></g></svg>
                      :
                      "Save Changes"
                    }


                  </button>
                </div>
              </div>
            )}



            {/* Edit Username Modal */}
            {showUsernameModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
                <div className="bg-black p-8 rounded-lg w-80">
                  <h2 className="text-xl font-semibold mb-2 text-white">Edit Username</h2>

                  <div className="flex mb-3" onClick={handleShowUsernameModal}>
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg className="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    </span>
                    <input
                      onChange={(e) => {
                        setPass(false)




                        axiosInstance.get(`checkusername/${e.target.value.trim()}`).then((response) => {

                          setErr(response.data.badname)

                          if (!response.data.badname) {
                            setUsername(e.target.value.trim())

                            setPass(true)
                          }
                          else {
                            setPass(false)
                          }

                        })







                      }}
                      type="text" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userdata.username} />

                  </div>
                  {err ? <p className='text-red-500'>Username unavailable</p> : null}
                  {!pass
                    ?
                    <button disabled
                      className="mt-4 mr-3 bg-blue-500 text-white px-2 py-1 rounded-lg opacity-50 text-sm disabled cursor-not-allowed"
                    >
                      Save Changes
                    </button>
                    :
                    <button
                      className="mt-4 mr-3 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                      onClick={() => {

                        axiosInstance.get(`updateusername/${username}`).then((response) => {


                          if (response.data.success) {
                            toast.success("Upated")
                            const data1 = userdata
                            data1.username = username
                            setUserdata(data1)
                            // getData()
                            // goto(`/${username}`)
                            location.href = `/${username}`
                            handleCloseModal()
                          }
                          else {
                            toast.error("Error!")
                            handleCloseModal()
                          }
                        })
                      }}>
                      Save Changes
                    </button>}


                  <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={() => setShowUsernameModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}


            {/* Edit Phone Modal */}
            {showPhoneModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
                <div className="bg-black p-8 rounded-lg w-80">
                  <h2 className="text-xl font-semibold mb-2 text-white">Edit Phone</h2>

                  <div className="flex mb-3" onClick={handleshowPhoneModal}>

                    <input
                      onChange={(e) => {
                        setPass(false)
                        if (e.target.value == userdata.phone) {
                          setOtpSend(false)
                        }
                        else if (e.target.value.length == 10 && !isNaN(e.target.value)) {
                          setOtpSend(true)
                          setErr(false)

                        }


                        else {
                          setErr(true)
                        }







                      }}
                      type="text" id="phone" className=" rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userdata.phone ? userdata.phone : "Your Number Without Country Code"} />


                  </div>
                  {
                    verifyBtn ?
                      <input type="text" name="" placeholder='Enter OTP' className=" rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="otp" />

                      :
                      null
                  }
                  {otpSend ?
                    <p
                      onClick={() => {
                        const phone = document.getElementById('phone').value
                        setNewp(phone)
                        axiosInstance.get(`sentotp/${phone}`).then((response) => {

                          if (response.data.success) {
                            setVerifyBtn(true)
                            toast.success("OTP SENT")
                          }
                          else {
                            toast.error("INVALID PHONE NUMBER")
                          }

                        })





                        
                        setOtpSend(false)
                      }}
                      className="mt-4 mr-3 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm text-center cursor-pointer">

                      {bload ?
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="ml-24"><g><circle cx="12" cy="3" r="1"><animate id="spinner_7Z73" begin="0;spinner_tKsu.end-0.5s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="16.50" cy="4.21" r="1"><animate id="spinner_Wd87" begin="spinner_7Z73.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="7.50" cy="4.21" r="1"><animate id="spinner_tKsu" begin="spinner_9Qlc.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="19.79" cy="7.50" r="1"><animate id="spinner_lMMO" begin="spinner_Wd87.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="4.21" cy="7.50" r="1"><animate id="spinner_9Qlc" begin="spinner_Khxv.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="21.00" cy="12.00" r="1"><animate id="spinner_5L9t" begin="spinner_lMMO.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="3.00" cy="12.00" r="1"><animate id="spinner_Khxv" begin="spinner_ld6P.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="19.79" cy="16.50" r="1"><animate id="spinner_BfTD" begin="spinner_5L9t.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="4.21" cy="16.50" r="1"><animate id="spinner_ld6P" begin="spinner_XyBs.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="16.50" cy="19.79" r="1"><animate id="spinner_7gAK" begin="spinner_BfTD.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="7.50" cy="19.79" r="1"><animate id="spinner_XyBs" begin="spinner_HiSl.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="12" cy="21" r="1"><animate id="spinner_HiSl" begin="spinner_7gAK.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><animateTransform attributeName="transform" type="rotate" dur="6s" values="360 12 12;0 12 12" repeatCount="indefinite" /></g></svg>
                        :
                        "Sent OTP"
                      }





                    </p>
                    :
                    null}

                  {verifyBtn ?
                    <p
                      className="mt-4 mr-3 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm text-center cursor-pointer"
                      onClick={() => {

                        const otp = document.getElementById('otp').value
                        setBload(true)

                        axiosInstance.get(`verifyotp?phone=${newp}&otp=${otp}`).then((response) => {

                          setBload(false)
                          if (response.data.success) {
                            const data = userdata
                            data.phone = newp
                            setUserdata(data)
                            toast.success("OTP VERIFIED")
                            setShowPhoneModal(false)
                            setErr(false)
                          }
                          else {
                            toast.error("COULDN'T VERIFY OTP")
                          }
                          // setBload(false)
                        })

                      }}
                    >
                      {bload ?
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="ml-24"><g><circle cx="12" cy="3" r="1"><animate id="spinner_7Z73" begin="0;spinner_tKsu.end-0.5s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="16.50" cy="4.21" r="1"><animate id="spinner_Wd87" begin="spinner_7Z73.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="7.50" cy="4.21" r="1"><animate id="spinner_tKsu" begin="spinner_9Qlc.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="19.79" cy="7.50" r="1"><animate id="spinner_lMMO" begin="spinner_Wd87.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="4.21" cy="7.50" r="1"><animate id="spinner_9Qlc" begin="spinner_Khxv.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="21.00" cy="12.00" r="1"><animate id="spinner_5L9t" begin="spinner_lMMO.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="3.00" cy="12.00" r="1"><animate id="spinner_Khxv" begin="spinner_ld6P.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="19.79" cy="16.50" r="1"><animate id="spinner_BfTD" begin="spinner_5L9t.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="4.21" cy="16.50" r="1"><animate id="spinner_ld6P" begin="spinner_XyBs.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="16.50" cy="19.79" r="1"><animate id="spinner_7gAK" begin="spinner_BfTD.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="7.50" cy="19.79" r="1"><animate id="spinner_XyBs" begin="spinner_HiSl.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="12" cy="21" r="1"><animate id="spinner_HiSl" begin="spinner_7gAK.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><animateTransform attributeName="transform" type="rotate" dur="6s" values="360 12 12;0 12 12" repeatCount="indefinite" /></g></svg>
                        :
                        "Verify OTP"
                      }




                    </p>
                    :
                    null}



                  {err ? <p className='text-red-500'>Invalid input.</p> : null}
          


                  <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={() => {
                      setVerifyBtn(false)
                      setShowPhoneModal(false)
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}





            {/* Followers Modal */}
            {showFollowersModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" >
                <div className="bg-black p-8 rounded-lg w-80">
                  <h2 className="text-xl font-semibold mb-2 text-white">Followers</h2>
                  <span className=''>
                    {userdata.followers.length != 0 ? userdata.followers.map((follower, index) => {
                      return (
                        <span key={follower._id} className='flex justify-between py-2 max-h-20 overflow-y-auto'>
                          <span className='flex' onClick={() => {
                            goto(`/${follower.username}`)
                            onClick = { handleCloseModal }
                          }}>
                            <img src={IMG_CDN + follower.dp} alt="" className='w-7 h-7 rounded-full mr-3 object-cover' />
                            <p className='text-white'>{follower.username}</p>
                          </span>

                          {own ?


                            <button id={`${follower._id}`} onClick={() => {
                              axiosInstance.get(`removefollower/${follower._id}`).then((response) => {

                                if (response.data.success) {
                                  const data = userdata.following.filter((x) => {
                                    return x.username != follower.username
                                  })

                                  document.getElementById(`${follower._id}`).style.display = "none"
                                  toast.success(`Unfollowed ${followers.username}`)

                                  const data1 = userdata
                                  data1.following = data
                                  setUserdata(data1)
                                
                                }
                              })
                            }} className="bg-black text-white mr-10 border-white">
                              <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff", }} />
                            </button>

                            :


                            null
                          }





                        </span>


                      )
                    }) : <p className='text-white'>You don't have any followers</p>}
                  </span>

                  <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Following Modal */}
            {showFollowingModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-black p-8 rounded-lg w-80">
                  <h2 className="text-xl font-semibold mb-2 text-white">Following</h2>
                  <span >
                    {userdata.following.length != 0 ? userdata.following.map((follower) => {
                      let rm =0
                      return (
                        <span key={follower._id} className='flex justify-between py-2 max-h-20 overflow-y-auto '>
                          <span className='flex py-2 max-h-20'>
                            <img onClick={() => goto(`/${follower.username}`)} src={IMG_CDN + follower.dp} alt="" className='w-7 h-7 rounded-full mr-3 object-cover' />
                            <p onClick={() => goto(`/${follower.username}`)} className='text-white'>{follower.username}</p>
                          </span>

                          {own ?


                            <button id={`${follower.username}`} onClick={() => {
                              axiosInstance.get(`unfollow/${follower.username}`).then((response) => {

                                if (response.data.success) {
                                  const data = userdata.following.filter((x) => {
                                    return x.username != follower.username
                                  })

                                  // document.getElementById(`${follower.username}`).style.display = "none"
                                  toast.success(`Unfollowed ${follower.username}`)

                                  const data1 = userdata
                                  data1.following = data
                                  setUserdata(data1)
                                 
                                }
                              })
                            }} className="bg-black text-white mr-10 border-white">
                              <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff", }} />
                            </button>

                            :


                            null
                          }



                        </span>




                      )
                    }) : <p className='text-white'>You're not following anyone</p>}
                  </span>

                  <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}


            {/* Message/Block Modal */}
            {showOptions && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-black p-8 rounded-lg w-80">
                 
             

                
                {!userdata.private &&
                    <button onClick={direct} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full rounded mb-2" >
                    Message
                  </button>
                  }
               
                
                <button onClick={report}  className="bg-red-600 hover:bg-red-700 text-white font-semibold w-full rounded ">
                Report 
                </button> 

              

              
                  
                       
 
               
                  <button
                    className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm w-full"
                    onClick={()=>setShowOptions(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}







          </main>
        </div>



      </div>
      }

    </>
  )
}

export default MyProfile