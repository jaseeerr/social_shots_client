import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider, useSelector } from "react-redux"
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
import AdminHome from "./src/pages/admin/home";
import AdminNavbar from "./src/components/admin/adminNavbar";
import AdminLogin from "./src/pages/admin/login";
import UserList from "./src/pages/admin/userList";
import PostList from "./src/pages/admin/postList";
import Chat from "./src/pages/user/Chat";
import Notifications from "./src/pages/user/notifications";
import Call from "./src/pages/user/call";
import IncomingCall from "./src/components/user/incomingCall";
import OutGoingCall from "./src/components/user/outgoingCall";
import Err from "./src/pages/user/error";
import { SocketProvider } from "./src/utils/socketProvider";
import Loader1 from "./src/components/user/mainLoader";
import DarkSpinner from "./src/components/user/spinner";
import axios from "axios";
import { BASE_URL } from "./src/config/urls";
import Visitors from "./src/pages/admin/visitors";
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

const UserLayout = ()=>{

    useEffect(()=>{

        const x = Number(localStorage.getItem('saved'))
        const x1 = new Date(x)
        const m = x1.getMonth()
        const d = x1.getDay()
        const y = x1.getFullYear()
        const x2 = new Date()
        const m1 = x2.getMonth()
        const d1 = x2.getDay()
        const y1 = x2.getFullYear()

        console.log(x)

        if(!localStorage.getItem('saved') || m!=m1 && d!=d1 && y!=y1)
        {

          
            console.log(navigator)
            const data = {
                username:localStorage.getItem('account'),
                browser:navigator?.userAgentData?.brands[0].brand,
                platform:navigator?.userAgentData?.platform,
                mobile:navigator?.userAgentData?.mobile,
                location:null
            }
          


            if ("geolocation" in navigator) {
                // Geolocation is available
                const options = {
                  enableHighAccuracy: true, // Request high-accuracy location data
                };
              
                navigator.geolocation.getCurrentPosition(
                  function (position) {
                    // Success callback: This function is called when the user's location is retrieved successfully.
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
              data.location = `https://www.google.com/maps/place/${latitude}+${longitude}`
                
                  },
                  function (error) {
                    // Error callback: This function is called if there is an error retrieving the location.
                    switch (error.code) {
                      case error.PERMISSION_DENIED:
                        console.error("User denied the request for Geolocation.");
                        break;
                      case error.POSITION_UNAVAILABLE:
                        console.error("Location information is unavailable.");
                        break;
                      case error.TIMEOUT:
                        console.error("The request to get user location timed out.");
                        break;
                      case error.UNKNOWN_ERROR:
                        console.error("An unknown error occurred.");
                        break;
                    }
                  },
                  options // Pass the options object here
                );
              } else {
                // Geolocation is not available in this browser
                console.error("Geolocation is not supported in your browser.");
              }
              

              axios.post(`${BASE_URL}visitors`,data)
              const time = Date.now()+""
              localStorage.setItem('saved',time)

           
        }



      
    },[])
    
   

    return(
        <>
        <Provider store={Store}>
        <SocketProvider>
        <Outlet/>
        </SocketProvider>
        </Provider>
        </>
    )
}

const AdminLayout = ()=>{

    
   

    return(
        <>
        <Provider store={Store}>
       
     
        <AdminNavbar/>
              <Outlet />       
        </Provider>
        </>
    )
}



const AppRouter = createBrowserRouter([
    {
        path:"/",
        element:<UserLayout/>,
        errorElement:<Err/>,
        children:[
            {
                path:"/",
                element:<Home/>

            },
            {
                path:"/stories/:id",
                element: <StoryModal images={images} />
            },
            {
                path:"/:id",
                element: <MyProfile />
            },
           
            {
                path:"/test",
                element: <DarkSpinner/>
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
            },
            {
                path:"/direct/:id",
                element: <Chat />
            },
            {
                path:"/notifications",
                element: <Notifications />
            },
            {
                path:"/call/:id",
                element: <Call />
            },
            {
                path:"/incomingCall/:id",
                element: <IncomingCall />
            },
            {
                path:"/outgoingCall/:id",
                element: <OutGoingCall />
            },
            
        ]
        
        
        
    },
    {
        path:"/login",
        element: <Provider store={Store}> <Login /></Provider>
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
    },
   

    {
        path:"/admin",
        element:<AdminLayout/>,
        errorElement:<Err/>,
        children:[
            {
                path:"/admin",
                element:<AdminHome/>

            },
            {
                path:"/admin/userlist",
                element:<UserList/>
            },
            {
                path:"/admin/postlist",
                element:<PostList/>
            },
            {
                path:"/admin/visitors",
                element:<Visitors/>
            }
        ]
    },
    {
        path:"/admin/login",
        element:<AdminLogin/>
    }
    
    
])





const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<RouterProvider router={AppRouter}/>)