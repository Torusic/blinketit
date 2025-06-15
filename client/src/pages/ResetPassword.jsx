import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa"
import { FaEye } from "react-icons/fa";
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const[data,setData]=useState({
        email:"",
        newPassword:"",
        confirmPassword:"",
    })
    const[showPassword,setShowPassword]=useState(false);
    const[showConfirmPassword, setShowConfirmPassword]=useState(false)

    useEffect(()=>{
        if(!(location?.state?.data?.success)){
            navigate("/")
        }
             
    if(location?.state?.email){
        setData((preve)=>{
            return{
                ...preve,
                email:location?.state?.email
            }
        })

    }

    },[])
    const handleChange=(e)=>{
        const {name,value}=e.target

        setData((preve)=>{
            return{
                ...preve,
            [name]:value 
            }
           
        })

    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(data.newPassword!==data.confirmPassword){
            toast.error("Password does not match.")
        }

       

       
      try {
         const response= await Axios ({
        ...SummaryApi.resetPassword,
        data: data
      

    }) 
    if(response.data.error){
        toast.error(response.data.error)
    }
    if(response.data.success){
        toast.success(response.data.message)
        
        navigate("/login",{
            state:data
        })                           
        setData({
        email:"",
        newPassword:"",
        confirmPassword:"",
        })
    }
    console.log("response",response)
         
      } catch (error) {
       AxiosToastError(error)
        
      }
    }
    console.log("resetPassword",location)
      const validate=Object.values(data).every(el=>el)
  return (
        <section className=' w-full container mx-auto px-12'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
             
            <p className='flex items-center text-2xl font-bold text-slate-600 mb-2 '> New Password </p>
            <form action=""className='grid gap-5 mt-6' onSubmit={handleSubmit}>
               
                <div className='grid'>
                    <label htmlFor="newPassword" className='mt-7 text-slate-600 font-semibold'>New Password :</label>
                                    
                                        <div className='mt-3 p-2 bg-blue-50 focus-within:border-[#ec4899] border rounded flex items-center justify-between gap-2'>
                                        <input 
                                        type={showPassword ? "text" :"password"}
                                        id='password'
                                        autoFocus
                                        className=' w-full  outline-none'
                                        name='newPassword'
                                        value={data.newPassword}
                                        onChange={handleChange}
                                        placeholder='Enter your new password'
                                         />
                                    
                                    <div onClick={()=>setShowPassword(preve=>!preve)} className='cursor'>{
                                        showPassword?(
                                            <FaEye/>
                                        ):( <FaEyeSlash/> )
                                        }
                                       
                                   
                                    </div>
                                    </div>
                                     <label htmlFor="confrmPassword" className='mt-8 text-slate-600 font-semibold'>Confirm Password :</label>
                                    
                                        <div className=' mt-3 p-2 bg-blue-50 focus-within:border-[#ec4899] border rounded flex items-center justify-between gap-2'>
                                        <input 
                                        type={showConfirmPassword ? "text" :"password"}
                                        id='password'
                                        autoFocus
                                        className=' w-full  outline-none'
                                        name='confirmPassword'
                                        value={data.confirmPassword}
                                        onChange={handleChange}
                                        placeholder='Confirm your new password'
                                         />
                                    
                                    <div onClick={()=>setShowConfirmPassword(preve=>!preve)} className='cursor'>{
                                        showConfirmPassword?(
                                            <FaEye/>
                                        ):( <FaEyeSlash/> )
                                        }
                                       
                                   
                                    </div>
                                    </div>
                </div>
               
                
              
                <button disabled={!validate} className={`${validate ? " bg-pink-500 hover:bg-pink-600" : "bg-gray-500"} container mx-auto p-4 my-2 py-2 text-white font-semibold rounded tracking-wide`}>
                 Change Password
                     </button>

            </form>
            <p className='p-4 flex items-center justify-center'>
               Already Have  Account  ? <Link to={"/login"} className='text-pink-400 px-2  font-bold'> Login</Link>
            </p>

        </div>

    </section>
  )
}

export default ResetPassword
