import React, { useEffect, useState } from 'react'
import Chart from '../../components/admin/chart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers,faImages,faVideo } from '@fortawesome/free-solid-svg-icons';
import './scroll.css'
import { useNavigate } from 'react-router';
import MyAxiosInstance from '../../utils/axios';
function AdminHome() {


const goto = useNavigate()
const axiosInstance = MyAxiosInstance(1)
const [userCount,setUserCount] = useState(0)
const [userChart,setUserChart] = useState([])
const [videoChart,setVideoChart] = useState([])
const [imageChart,setImageChart] = useState([])
const [photoCount,setPhotoCount] = useState(0)
const [videoCount,setVideoCount] = useState(0)


const getData = async ()=>{

    let response = await axiosInstance.get('admin/dashboardData')
    setUserCount(response.data.userCount)
    setUserChart(response.data.userChart)
    setPhotoCount(response.data.photoCount)
    setVideoCount(response.data.videoCount)
    setImageChart(response.data.imageChart)
    setVideoChart(response.data.videoChart)
  


}

useEffect(()=>{

    getData()
},[])




    const udata = [1,2,3,4,3,2,3,4,5,6,1,0]

const data ={
    labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets:[{
        label:"Users",
        data:userChart
    },
    {
        label:"Images",
        data:imageChart
    },
    {
        label:"Videos",
        data:videoChart
    },
],
    
}


 





  return (
  
    

<div className='mt-32 ml-1 sm:ml-80 sm:mt-28 p-10 flex-none justify-center '>

     <div className='w-full sm:w-auto flex flex-wrap justify-center'>
    <div className='bg-gray-800 mx-2 sm:mx-4 mb-5 sm:mb-10 p-4 sm:p-7 text-center rounded-xl'>
      <FontAwesomeIcon icon={faUsers} style={{ color: "#ffffff" }} size='xl' />
      <p className='text-center text-white mt-2'>{userCount} Users</p>
    </div>
    <div className='bg-gray-800 mx-2 sm:mx-4 mb-5 sm:mb-10 p-4 sm:p-7 text-center rounded-xl'>
    <FontAwesomeIcon icon={faImages} style={{color: "#ffffff",}} size='xl' />
      <p className='text-center text-white mt-2'>{photoCount} Photos</p>
    </div>
    <div className='bg-gray-800 mx-2 sm:mx-4 mb-5 sm:mb-10 p-4 sm:p-7 text-center rounded-xl'>
      <FontAwesomeIcon icon={faVideo} style={{ color: "#ffffff" }} size='xl' />
      <p className='text-center text-white mt-2'>{videoCount} Videos</p>
    </div>
  </div>

<div className=' bg-gray-900 rounded-md w-full h-full p-10'>
<Chart chartData={data}/>
</div>
     


     </div>

    
    
       
  
  )
}

export default AdminHome