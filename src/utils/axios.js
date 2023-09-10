import axios from "axios";
import { BASE_URL } from "../config/urls";
import { useNavigate } from "react-router";

const MyAxiosInstance = (opt) => {

  const goto = useNavigate()

  let token 
  if(opt==1)
  {
    token = localStorage.getItem('adminToken')
  }
  else
  {
    token = localStorage.getItem('userToken')
  }
   

   const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });

   // Response interceptor
   instance.interceptors.response.use(
    (response) => {
 
   
      if(response.data.blocked && localStorage.getItem('userToken'))
      {
       
        localStorage.removeItem('userToken')
        location.href = "/login"
      }
      return response;
    },
    (error) => {
  
      console.error("API Error:", error);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default MyAxiosInstance;
