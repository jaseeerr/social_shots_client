import React, { useState } from 'react'

function VisitorsTable({data}) {
    
//   const [data1,setData1] = useState(data)
  console.log(data)
  console.log("oooooooo")
  return (
    <div className='mt-32 ml-1 sm:ml-80 sm:mt-28 p-10 flex-none justify-center h-96'>
<div className="relative overflow-x-auto overflow-y-auto max-h-max">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                <th scope="col" className="px-6 py-3">
                    Browser
                </th>
                <th scope="col" className="px-6 py-3">
                    Platform
                </th>
                <th scope="col" className="px-6 py-3">
                    Mobile
                </th>
                <th scope="col" className="px-6 py-3">
                    Location
                </th>
                <th scope="col" className="px-6 py-3">
                    Ip
                </th>
                <th scope="col" className="px-6 py-3">
                    Country
                </th>
                <th scope="col" className="px-6 py-3">
                    Region
                </th>
                <th scope="col" className="px-6 py-3">
                    TimeZone
                </th>
                <th scope="col" className="px-6 py-3">
                    Timestamp
                </th>
            </tr>
        </thead>
        <tbody>
          

        {data.map((x)=>{
            return(
                 <tr className="bg-white dark:bg-gray-800" key={x._id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {x.username}
                </th>
                <td className="px-6 py-4">
                    {x.browser}
                </td>
                <td className="px-6 py-4">
                    {x.platform}
                </td>
                <td className="px-6 py-4">
                    {x.mobile}
                </td>
                <td className="px-6 py-4">
                    {x.location}
                </td>
                <td className="px-6 py-4">
                    {x.ip}
                </td>
                <td className="px-6 py-4">
                    {x.country}
                </td>
                <td className="px-6 py-4">
                    {x.region}
                </td>
                <td className="px-6 py-4">
                    {x.timezone}
                </td>
                <td className="px-6 py-4">
                    {x.timeStamp}
                </td>
            </tr>
            )
          })}
        
        </tbody>
    </table>
</div>
</div>

  )
}

export default VisitorsTable