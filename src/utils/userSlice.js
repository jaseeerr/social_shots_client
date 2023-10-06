import { createSlice  } from "@reduxjs/toolkit";





const userSlice = createSlice({
    name:"userInfo",
    initialState:{
       
        login:null,
        userdata:null,
        busy:false

    },
    reducers:{
        
       
        loginStatus:(state,action)=>{
            state.login = action.payload
        },
        updateUserdata:(state,action)=>{
        
            state.userdata = action.payload
            console.log("s=from slice","\n",action.payload)
            localStorage.setItem('account',action.payload.username)
        },
        updateBusy:(state,action)=>{
            
            state.busy = action.payload
        }
        
    }
})

export const {loginStatus,updateUserdata,updateBusy} = userSlice.actions

export default userSlice.reducer


  
  
  
  
  


