import { createSlice  } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken"
import MyAxiosInstance from "./axios";
import { useState } from "react";




const userSlice = createSlice({
    name:"userInfo",
    initialState:{
       
        login:null,
        userdata:null

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


  
  
  
  
  


