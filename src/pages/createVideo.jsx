import React, { useState } from 'react';
import SideBar from '../components/user/sideBar';
import { getCroppedImg } from '../utils/croputils'; // Import your crop utility function
import ReactEasyCrop from 'react-easy-crop'
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router';



const CreateVideo = () => {


  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading,setLoading] = useState()

 
  const goto = useNavigate()
  const handleImageUpload = (event) => {

   
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleCropComplete = async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImage = await getCroppedImg(selectedImage, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const handleClearSelection = () => {
    setSelectedImage(null);
    setCroppedImage(null);
  };

  const handleImageSubmit = () => {
    // Handle image submit logic here
    if (croppedImage) {
      // Send croppedImage to the backend or perform any further actions
      console.log('Cropped image:', croppedImage);
    }
  };


  const handleUpload = async ()=>{

    setLoading(true)
    const response = await fetch(croppedImage);
  const blob = await response.blob();
       

    const newFileName = `img${Date.now()}`;
    const data = new FormData()
    data?.append("file",blob,newFileName)
    data?.append("upload_preset","olx_img")
    data?.append("cloud_name","dfhcxw70v")

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dfhcxw70v/auto/upload',
        data
      );

 

     

      if(response)
      {
        
        toast("✅ Upload Complete")
        console.log(response)

        handleClearSelection()
        setTimeout(()=>{
      
          setLoading(false)
          goto('/')

        },1000)

       
      }


      // axiosInstance.post(
      //     'uploadProduct',
      //     data1
      //   ).then((response1)=>{


      //     toast("✅ Product Uploaded")

          
      //     goto("/profile")

          

      //   })

      

        
     

      // Handle the response or update your application state
    } catch (error) {
      toast("ERROR OCCURED")
      console.error('Error uploading image:', error);
      handleClearSelection()
      // Handle the error or show an error message
    }
  }



  return (
    <>

    <Toaster/>
      <div className="flex">
        <div>
          <SideBar />
        </div>

        {loading ? <div className='flex justify-center mt-96 w-full h-screen'>
  <div class="text-center">
    <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>
</div> : <div className="flex justify-center items-center h-screen w-screen mb-20">
          <div className="border h-1/2 sm:w-1/3 rounded-lg w-full">
            <span className="flex justify-center">
              <h4 className="text-white">Create new post</h4>
            </span>

            <hr />

            {!selectedImage && (
              <span className="flex justify-center items-center mt-20">
                <label htmlFor="upload-input" className="cursor-pointer">
             
                 <span className='ml-14'> 
                 
                 <svg xmlns="http://www.w3.org/2000/svg" className='ml-9' viewBox="0 0 24 24" width="70"><path d="M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM4 5V19H20V5H4ZM10.6219 8.41459L15.5008 11.6672C15.6846 11.7897 15.7343 12.0381 15.6117 12.2219C15.5824 12.2658 15.5447 12.3035 15.5008 12.3328L10.6219 15.5854C10.4381 15.708 10.1897 15.6583 10.0672 15.4745C10.0234 15.4088 10 15.3316 10 15.2526V8.74741C10 8.52649 10.1791 8.34741 10.4 8.34741C10.479 8.34741 10.5562 8.37078 10.6219 8.41459Z" fill="rgba(255,255,255,1)"></path></svg>                               </span>
                  <span className='flex justify-center items-center'>
        <button onClick={()=>{
          document.getElementById('upload-input').click()
        }} className='mt-2 bg-blue-500 text-white rounded-md px-2 p-1 text-sm font-semibold'>UPLOAD YOUR SHOT</button>

        </span>
                </label>
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </span>
            )}

            {selectedImage && (
              <div className="flex flex-col justify-center items-center mt-8">
                <img src={croppedImage} alt="Selected" className="max-h-60 mb-4" />
                <textarea id="message" rows="3" class="block mb-3 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                {croppedImage ? (
                  <img src={croppedImage} alt="Cropped" className="max-h-60 mb-4 hidden" />
                ) : (
                  <div className="max-h-60">
                    <ReactEasyCrop
                      image={selectedImage}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={handleCropComplete}
                      showGrid={false}
                    />
                  </div>
                )}
                <button
                  className="bg-blue-500 text-white rounded-md px-2 p-1 text-sm font-semibold"
                  onClick={handleClearSelection}
                >
                  Clear Selection
                </button>
              </div>
            )}

            {croppedImage && (
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
        </div>}

        
      </div>
    </>
  );
};

export default CreateVideo;
