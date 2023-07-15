import { createSlice } from "@reduxjs/toolkit";



const storyModalSlice = createSlice({
    name:"storyModalSlice",
    initialState:{
        isOpen:false,
        

    },
    reducers:{
        
       
        
        handleToggle:(state,action)=>{
            state.isOpen = action.payload
        },
        
        
    }
})

export const {  handleToggle} = storyModalSlice.actions

export default storyModalSlice.reducer