import React, { useEffect, useState } from 'react'
import UserCard from '../../components/admin/userCard'
import MyAxiosInstance from '../../utils/axios'
function UserList() {

    const axiosInstance = MyAxiosInstance(1)
    const [data,setData] = useState()
    const [filteredData,setFilteredData] = useState()
    const [searchText,setSearchText] = useState()


    const filter = (data,searchText)=>{

        // const filterData =  restaurants.filter((restaurant)=>restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase()))
           const filtered = data.filter((x)=>x?.username?.trim().toLowerCase()?.includes(searchText.toLowerCase()))
           setFilteredData(filtered)
           return filtered


    }

    const getData = async ()=>{

        let response = await axiosInstance.get('admin/allusers')
        // console.log(response.data)
        setData(response.data)
        setFilteredData(response.data)

    }


    useEffect(()=>{

        getData()

    },[])




  return (
    <div className='mt-32 ml-1 sm:ml-80 sm:mt-28 p-10 flex-none justify-center '>
            <div className='flex justify-center mr-20 mb-10'>
                <input
                onChange={(e)=>{
                    filter(data,e.target.value)
                }}
                type="text" placeholder=' Search🔎 ' className='bg-gray-800 rounded-md p-2 text-white' />
            </div>
              <div className='w-full h-full flex flex-wrap'>


              {filteredData && filteredData.map((x)=> <UserCard key={x.id} data={x}/>)}
             
            
         
              </div>
       
          

        </div>
  )
}

export default UserList