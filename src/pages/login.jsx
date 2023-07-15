import React, { useState } from "react"
import { useFormik } from "formik"
import MyAxiosInstance from '../utils/axios';
import toast, {Toaster} from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import logoImage from '../../public/assets/LOGOBig.png'; // Replace with the actual path to your logo image
import logoRec from '../../public/assets/LOGO-REC1.png'; // Replace with the actual path to your logo image
import { useSelector } from "react-redux";


const Login = ()=>{

  const verify = useSelector(store=>store.commonSlice.verify)
  const [loader,setLoader] = useState()
  const [pass,setPass] = useState(true)

    const goto = useNavigate()

    const axiosInstance = MyAxiosInstance();

    


// formik starts
const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
   
    
   
    },
  validate: (values) => {
   
    values.email = values.email.trim()
  
    values.password = values.password.trim()
  const error = {};

if(!pass)
{
  email.err = ""
}

 
 
  
 



  return error;
  },
    onSubmit:(values) => {
      toast.dismiss()
      setPass(false)
      setTimeout(()=>{
        setPass(true)
      },1500)
  setLoader(true)
             // Make the POST request
             axiosInstance.post('login',values).then((response)=>{

                console.log(response)
                setLoader(false)
                if(response.data.success)
                {
                    toast.success("Login Successful")
                   localStorage.setItem('userToken',response.data.token)
                   console.log(localStorage.getItem('userToken'))
                   setTimeout(()=>{
                    toast.dismiss()
                    location.href = "/"

                   },1000)
                  
                }
                else if(response.data.badpass)
                {
                    toast.error("Invalid Password")
                }
                else if(response.data.baduser)
                {
                    toast.error("Invalid Email")
                }
                else if(response.data.notVerified)
                {
                  toast.error("Account not verified, Please check your mail for the verification link.")
                }
                else
                {
                  toast.error("Unknown Error Occurred")
                }
             })
    },
  
  
  })
// formik ends





    return(
        <>
        <Toaster/>
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-56 h-28 mr-2" src={logoImage} alt="logo"/>
           
      </a> 
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={formik.handleSubmit}>
             
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username / Email</label>
                      <input
                         {...formik.getFieldProps('email')}
                      type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username / Email" required />
                  {formik.errors.email ? (
                <div style={{color:"red"}}>{formik.errors.email}</div> 
              ) : null}
                  </div>
                 
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input
                        {...formik.getFieldProps('password')}
                      type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  {formik.errors.password ? (
                <div style={{color:"red"}}>{formik.errors.password}</div>
              ) : null}
                  </div>
                
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  {loader ?
                   <button type="submit" className="w-full text-white bg-blue-700 p-2 rounded-md ">
<span className="flex justify-center"> 
<svg  width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><rect x="11" y="1" width="2" height="5" opacity=".14"/><rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29"/><rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43"/><rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57"/><rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71"/><rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86"/><rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg>

</span>

                   </button> 
                  :
                  <button type="submit" className="w-full text-white bg-blue-700 p-2 rounded-md ">Login</button>
                   }
                  
                  {/* <button
                  onClick={()=>handleGoogle()}
                  type="button" className="w-full flex items-center justify-center gap-2 text-white bg-blue-700 p-2 rounded-md">
  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="w-4 h-4" />
  <span>Login with Google</span>
</button> */}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup Here</Link>
                  </p>
                  </form>
          </div>
      </div>
  </div>
</section>
        </>
    )
}

export default Login