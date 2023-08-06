import React, { useState,useEffect } from 'react';
import SideBar from '../../components/user/sideBar';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import MyAxiosInstance from '../../utils/axios';


const CreateVideo = () => {

  const axiosInstance = MyAxiosInstance()
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption,setCaption] = useState()

  const goto = useNavigate()

  useEffect(()=>{

    if(!localStorage.getItem('userToken'))
    {
      goto('/login')
    }

  },[])

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(file));
  };

  const handleClearSelection = () => {
    setSelectedVideo(null);
  };

  const handleUpload = async () => {
    setLoading(true);

    const response = await fetch(selectedVideo);
    const blob = await response.blob();

    const newFileName = `video${Date.now()}`;
    const data = new FormData();
    data?.append("file", blob, newFileName);
    data?.append("upload_preset", "olx_img"); 
    data?.append("cloud_name", "dfhcxw70v");

    try {
       axios.post(
        'https://api.cloudinary.com/v1_1/dfhcxw70v/video/upload',
        data
      ).then((response)=>{

        const data1 = {
          img:response.data.public_id,
          caption:caption,
          type:"video"
         }
    
         axiosInstance.post('/uploadpost',data1).then((response)=>{
    
          if(response)
          {
            
            toast("✅ Upload Complete")
           
    
            handleClearSelection()
            setTimeout(()=>{
          
              setLoading(false)
              goto('/')
    
            },1000)
    
           
          }
    
    
         })

      })

    } catch (error) {
      toast("ERROR OCCURRED");
      setLoading(false)
      console.error('Error uploading video:', error);
      handleClearSelection();
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex">
        <div>
          <SideBar />
        </div>

        {loading ? (
          <div className='flex justify-center mt-96 w-full h-screen'>
            <div class="text-center">
    <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen w-screen mb-20">
            <div className="border h-1/2 sm:w-1/3 rounded-lg w-full">
              <span className="flex justify-center">
                <h4 className="text-white">Create new post</h4>
              </span>

              <hr />

              {!selectedVideo && (
                <span className="flex justify-center items-center mt-20">
                  <label htmlFor="upload-input" className="cursor-pointer">
                    <span className='ml-14'>
                    <FontAwesomeIcon icon={faVideo} style={{color: "#f7f7f8",}} size='2xl' className='mb-2 mt-12' />
                    </span>
                    <span className='flex justify-center items-center'>
                      <button onClick={() => {
                       
                        document.getElementById('upload-input').click()
                      }} className='mt-2 bg-blue-500 text-white rounded-md px-2 p-1 text-sm font-semibold'>UPLOAD YOUR VIDEO</button>
                    </span>
                  </label>
                  <input
                    id="upload-input"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </span>
              )}

              {selectedVideo && (
                <div className="flex flex-col justify-center items-center mt-8">
                  <video controls src={selectedVideo} className="max-h-60 mb-4"></video>
                  <textarea
                onChange={(e)=>{
                  setCaption(e.target.value)
                }}
                 id="message" rows="3" maxLength={180} class="block mb-3 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                  <button
                    className="bg-blue-500 text-white rounded-md px-2 p-1 text-sm font-semibold"
                    onClick={handleClearSelection}
                  >
                    Clear Selection
                  </button>
                </div>
              )}

              {selectedVideo && (
                <span className="flex justify-center items-center mt-7">
                  <button
                    className="mt-2 bg-blue-500 text-white rounded-md px-2 p-1 text-sm font-semibold"
                    onClick={handleUpload}
                  >
                    Submit
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default CreateVideo;
