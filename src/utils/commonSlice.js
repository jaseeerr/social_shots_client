import { createSlice } from "@reduxjs/toolkit";


const commonSlice = createSlice({
    name:"commonValues",
    initialState:{
       
        verify:false,
        clickSearch:false

    },
    reducers:{
        
       
        setVerify:(state,action)=>{
            state.verify = action.payload
        },

        setClickSearch:(state,action)=>{
            state.clickSearch = action.payload
        }
        
    }
})

export const {setVerify,setClickSearch } = commonSlice.actions

export default commonSlice.reducer