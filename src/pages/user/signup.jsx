import React,{useEffect, useState} from "react"
import { useFormik } from "formik"
import MyAxiosInstance from '../../utils/axios'
import toast, {Toaster} from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import logoImage from '../../../public/assets/LOGOBig.png'; // Replace with the actual path to your logo image
import { useDispatch, useSelector } from "react-redux"
import {setVerify} from "../../utils/commonSlice"
import { wordlist1 } from "../../config/wordlist";

const Signup = ()=>{

  const [pass,setPass] = useState(true)
  const dispatch = useDispatch()

  const [loader,setLoader] = useState()

    const axiosInstance = MyAxiosInstance();
    const goto = useNavigate() 

    useEffect(()=>{

      if(localStorage.getItem('userToken'))
      {
        goto('/')
      }

    },[])

// formik starts
const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      // phone: ''
    
   
    },
  validate: (values) => {
  
    values.name = values.name.trim().toLowerCase()
    values.email = values.email.trim()
    // values.phone = values.phone.trim()
    values.password = values.password.trim()


    if(!values.name)
    {
      setPass(true)
    }

    const error = {};
    axiosInstance.get(`checkusername/${values?.name}`).then((response)=>{

                          
   
      if(!response.data.badname)
      {
        // setUsername(e.target.value.trim())
        setPass(true)
      }
      else
      {
       setPass(false)
      }

    })

    if (wordlist1.includes(values.name) && pass) {
      error.name = "Username Unavailable";
    } 


  if (!values.email) {
    error.email = "Email Required";
  }
  if (!values.name) {
    error.name = "Username Required";
  }
  if (!/^[a-zA-Z._]+$/.test(values.name) && pass) {
    
    // String is valid
    error.name = "Username can only contain alphabets and { . or _ } ";
  } 

  if(values.name[0]=="." && pass || values.name[values.name.length-1]=='.' && pass)
  {
    error.name = "Username can't start/end with a period.";
  }

 
  // if (values.phone.length!==10 && values.phone.length!==0 ) {
   
  //   error.phone = "Number Required";
  // }
 
  
  if (!values.password) {
    error.password = "Password Required";
  } else if (
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(
      values.password
    )
  ) {
    error.password =
      "Password must contain at least 8 characters, including at least 1 digit, 1 lowercase letter, 1 uppercase letter, and 1 special character";
  } 



  return error;
  },
    onSubmit:(values) => {

      setLoader(true)
  
             // Make the POST request
             axiosInstance.post('signup',values).then((response)=>{

              setLoader(false)
              
                if(response.data.success)
                {
                  const x = true
                  dispatch(setVerify(x))
                    toast.success("Verification Link Sent To Your Email")
                    setTimeout(()=>{
                      toast.dismiss()
                      goto("/login")

                    },3000)
                  
                }
                else if(response.data.exuser)
                {
                    toast.error("Existing User")
                }
                else
                {
                  toast.error("Unknown Error Occurred!")
                }
             })
    },
  
  
  })
// formik ends





    return(
        <>
        <Toaster/>
        <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <img className="w-56 h-28 mr-2" src={logoImage} alt="logo"/>           
      </a>
      {/* <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sign Up</label> */}
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#" onSubmit={formik.handleSubmit}>
              <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                      <input
                      
                         {...formik.getFieldProps('name')}
                      type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" />
                  {formik.errors.name ? (
                <div style={{color:"red"}}>{formik.errors.name}</div>
              ) : null}

              {!pass ? (
                <div style={{color:"red"}}>Username not avalable</div>
              ) : null}
             

                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input
                         {...formik.getFieldProps('email')}
                      type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
                  {formik.errors.email ? (
                <div style={{color:"red"}}>{formik.errors.email}</div>
              ) : null}
                  </div>
                  {/* <div>
                      <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
                      <input
                         {...formik.getFieldProps('phone')}
                      type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" required/>
                  {formik.errors.phone ? (
                <div style={{color:"red"}}>{formik.errors.phone}</div>
              ) : null}
                  </div> */}
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input
                        {...formik.getFieldProps('password')}
                      type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  {formik.errors.password ? (
                <div style={{color:"red"}}>{formik.errors.password}</div>
              ) : null}
                  </div>
                
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  
                  {loader ?
                   <button type="submit" className="w-full text-white bg-blue-700 p-2 rounded-md ">
<span className="flex justify-center"> 
<svg  width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><rect x="11" y="1" width="2" height="5" opacity=".14"/><rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29"/><rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43"/><rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57"/><rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71"/><rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86"/><rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg>

</span>

                   </button> 
                  :
                  <button type="submit" className="w-full text-white bg-blue-700 p-2 rounded-md ">Create An Account</button>
                   }
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
                  </form>
          </div>
      </div>
  </div>
</section>
        </>
    )

}


export default Signup