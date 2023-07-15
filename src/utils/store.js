import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice.js";
import commonSlice from "../utils/commonSlice.js"

const Store = configureStore({
    reducer:{
      
        userInfo:userSlice,
        commonSlice:commonSlice
        

    }
    
})


export default Store