import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux"
import Store from "./src/utils/store";

import Signup from "./src/pages/user/signup";
import Home from "./src/pages/user/home";
import StoryModal from "./src/pages/user/storyModal";
import Test from "./src/components/user/test";
import MyProfile from "./src/pages/user/myProfile";
import CreatePhoto from "./src/pages/user/createPhoto";
import CreateVideo from "./src/pages/user/createVideo";
import CreateStory from "./src/pages/user/createStory";
import Login from "./src/pages/user/login";
import ViewPost from "./src/pages/user/viewpost";
import Explore from "./src/pages/user/explore";
import FindAccount from "./src/pages/user/findAccount";
import NewPassword from "./src/pages/user/newPassword";
import Test from "./src/components/user/test";


const images = []
const images1 = [
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
    "https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg",
]
const AppLayout = ()=>{

    
   

    return(
        <>
        <Provider store={Store}>
       
        <Outlet/>
        </Provider>
        </>
    )
}



const AppRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        errorElement:<Error/>,
        children:[
            {
                path:"/",
                element:<Home/>

            },
            {
                path:"/stories",
                element: <StoryModal images={images} />
            },
            {
                path:"/:id",
                element: <MyProfile />
            },
           
            {
                path:"/test",
                element: <Test/>
            },
            {
                path:"/createPhoto",
                element: <CreatePhoto />
            },
            {
                path:"/createVideo",
                element: <CreateVideo />
            },
            {
                path:"/createStory",
                element: <CreateStory />
            },
            {
                path:"/viewPost/:id",
                element: <ViewPost />
            },
            {
                path:"/explore",
                element: <Explore />
            }
            
        ]
        
        
        
    },
    {
        path:"/login",
        element: <Provider store={Store}> <Login images={images} /></Provider>
    },
    {
        path:"/signup",
        element: <Provider store={Store}> <Signup  /></Provider>
    },
    {
        path:"/forgotPassword",
        element: <FindAccount />
    },
    {
        path:"/newPassword/:id",
        element: <NewPassword />
    }
    

    
    // {
    //     path:"/admin",
    //     element:<Provider store={Store}><AdminHome/></Provider>
    // }
    
    
])





const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<RouterProvider router={AppRouter}/>)