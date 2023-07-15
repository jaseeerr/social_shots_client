import React, { useState } from 'react';
import SideBar from '../components/user/sideBar';
import { getCroppedImg } from '../utils/croputils'; // Import your crop utility function
import ReactEasyCrop from 'react-easy-crop'
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router';
import MyAxiosInstance from '../utils/axios';


const CreatePhoto = () => {

  const axiosInstance = MyAxiosInstance();

  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading,setLoading] = useState()
  const [caption,setCaption] = useState("")

 
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

 

     const data1 = {
      img:response.data.public_id,
      caption:caption,
      type:"img"
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


     }).catch((err)=>{

      console.log(err.message)
      toast.error("ERR!")
     })

     


    

      

        
     

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
                 
                 <svg xmlns="http://www.w3.org/2000/svg" className='ml-9' viewBox="0 0 24 24" width="70" ><path d="M5 11.1005L7 9.1005L12.5 14.6005L16 11.1005L19 14.1005V5H5V11.1005ZM5 13.9289V19H8.1005L11.0858 16.0147L7 11.9289L5 13.9289ZM10.9289 19H19V16.9289L16 13.9289L10.9289 19ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10Z" fill="rgba(255,255,255,1)"></path></svg>                 </span>
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
                <textarea
                onChange={(e)=>{
                  setCaption(e.target.value)
                }}
                 id="message" rows="3" class="block mb-3 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

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

export default CreatePhoto;
