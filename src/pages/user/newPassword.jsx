import React, { useState } from 'react'
import logoImage from '../../../public/assets/LOGOBig.png';
import axios from 'axios';
import { BASE_URL } from '../../config/urls';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import { useFormik } from "formik"



function NewPassword() {

    const {id} = useParams()
    const goto = useNavigate()

    const [bload, setBload] = useState(false)

  


    // formik starts
const formik = useFormik({
    initialValues: {
    
      password: '',
      password1:''
      // phone: ''
    
   
    },
  validate: (values) => {
  
    values.password = values.password.trim()
    values.password1 = values.password1.trim()
    const error = {};
   


 
  
 
  
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

  if(values.password!=values.password1)
  {
    error.password1 = "Password doesn't match"
  }



  return error;
  },
    onSubmit:(values) => {


        setBload(true)


        const data = {
            pass:values.password,
            token:id
        }

        axios.post(`${BASE_URL}resetPassword`,data).then((response)=>{

            setBload(false)

            if(response.data.success)
            {
               toast.success("Your Password Have Been Changed. Please Login")
            
            }
            else if(response.data.badToken)
            {
                toast.error("Couldn't reset your passowrd.")
            
            }
            else
            {
                toast.error("Unknown Error Occurred")
              
            }

            setTimeout(()=>{
                toast.dismiss()
                goto('/login')
            },1000)

        })

  
    },
  
  
  })

   

    return (
        <>
            <Toaster />
            <section className="bg-gray-50 dark:bg-gray-900 h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-56 h-28 mr-2" src={logoImage} alt="logo" />

                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex-none justify-center">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                               Reset Your Password
                            </h1>
                         
                         <form onSubmit={formik.handleSubmit}>


                         <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your new password</label>
                                    <input
                                         {...formik.getFieldProps('password')}
                                        type="password" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required="" />
                                 {formik.errors.password ? (
                <div style={{color:"red"}}>{formik.errors.password}</div>
              ) : null}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm new password</label>
                                    <input
                                        {...formik.getFieldProps('password1')}
                                        type="password" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" required="" />
                               {formik.errors.password1 ? (
                <div style={{color:"red"}}>{formik.errors.password1}</div>
              ) : null}
                                </div>

                                <div className=' flex justify-center'>


                                    <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded-md text-center mt-8">

                                        {bload ?
                                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-12"><g><circle cx="12" cy="3" r="1"><animate id="spinner_7Z73" begin="0;spinner_tKsu.end-0.5s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="16.50" cy="4.21" r="1"><animate id="spinner_Wd87" begin="spinner_7Z73.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="7.50" cy="4.21" r="1"><animate id="spinner_tKsu" begin="spinner_9Qlc.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="19.79" cy="7.50" r="1"><animate id="spinner_lMMO" begin="spinner_Wd87.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="4.21" cy="7.50" r="1"><animate id="spinner_9Qlc" begin="spinner_Khxv.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="21.00" cy="12.00" r="1"><animate id="spinner_5L9t" begin="spinner_lMMO.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="3.00" cy="12.00" r="1"><animate id="spinner_Khxv" begin="spinner_ld6P.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="19.79" cy="16.50" r="1"><animate id="spinner_BfTD" begin="spinner_5L9t.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="4.21" cy="16.50" r="1"><animate id="spinner_ld6P" begin="spinner_XyBs.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="16.50" cy="19.79" r="1"><animate id="spinner_7gAK" begin="spinner_BfTD.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="7.50" cy="19.79" r="1"><animate id="spinner_XyBs" begin="spinner_HiSl.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><circle cx="12" cy="21" r="1"><animate id="spinner_HiSl" begin="spinner_7gAK.begin+0.1s" attributeName="r" calcMode="spline" dur="0.6s" values="1;2;1" keySplines=".27,.42,.37,.99;.53,0,.61,.73" /></circle><animateTransform attributeName="transform" type="rotate" dur="6s" values="360 12 12;0 12 12" repeatCount="indefinite" /></g></svg>

                                            :
                                            "Reset Password"}

                                    </button>

                                </div>


                         </form>

                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}

export default NewPassword