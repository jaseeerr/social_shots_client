import React, { useEffect, useState } from 'react'
import VisitorsTable from '../../components/admin/visitorsTable'
import MyAxiosInstance from '../../utils/axios';

function Visitors() {

    const axiosInstance = MyAxiosInstance(1)
    const [data,setData] = useState([])

    const getData = async()=>{
        const response = await axiosInstance.get(`admin/visitors`)
        setData(response.data)
       
    }

    useEffect(()=>{

        getData()
    },[])
    
  return (
    <VisitorsTable data={data}/>
  )
}

export default Visitors