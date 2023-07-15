import { createSlice } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken"
import MyAxiosInstance from "./axios";

let data = localStorage.getItem('userToken')

const axiosInstance = MyAxiosInstance()



let status
if(data)
{
    axiosInstance.get('myData').then((response)=>{
      
        data = response.data
    })
    status = true
}
else
{
    status = false
    data = {}
}



const userSlice = createSlice({
    name:"userInfo",
    initialState:{
       
        login:status,
        userdata:data

    },
    reducers:{
        
       
        loginStatus:(state,action)=>{
            state.login = action.payload
        },
        updateUserdata:(state,action)=>{
           
            state.userdata = action.payload
        },
        
    }
})

export const {loginStatus,updateUserdata} = userSlice.actions

export default userSlice.reducer