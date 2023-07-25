import { createSlice } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken"
import MyAxiosInstance from "./axios";
import { useState } from "react";


let data = localStorage.getItem('userToken')

let data1
let status
if(data)
{
    
 
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
        userdata:data1

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