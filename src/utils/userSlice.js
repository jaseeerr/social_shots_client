import { createSlice  } from "@reduxjs/toolkit";





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
            console.log(action.payload)
            state.userdata = action.payload
        },
        
    }
})

export const {loginStatus,updateUserdata} = userSlice.actions

export default userSlice.reducer


  
  
  
  
  


