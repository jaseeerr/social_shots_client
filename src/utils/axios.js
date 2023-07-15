import axios from "axios";
import { BASE_URL } from "../config/urls";

const MyAxiosInstance = () => {


   let token = localStorage.getItem('userToken')

   const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });

  return instance;
};

export default MyAxiosInstance;
