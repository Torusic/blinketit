import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { FaEyeSlash } from "react-icons/fa"
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

const ForgotPassword= () => {
    const[data,setData]=useState({
        
        email:"",
     
        
    })
    
    
    const navigate=useNavigate()
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

       

       
      try {
         const response= await Axios ({
        ...SummaryApi.forgotPassword,
        data: data
      

    }) 
    if(response.data.error){
        toast.error(response.data.error)
    }
    if(response.data.success){
        toast.success(response.data.message)
        
        navigate("/verification-otp",{
            state:data
        })                           
        setData({
           
            email:"",
            
           
        })
    }
    console.log("response",response)
         
      } catch (error) {
       AxiosToastError(error)
        
      }
    }
    const validate=Object.values(data).every(el=>el)
  return (
    <section className=' w-full container mx-auto px-12'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-2'>
            <img src={logo} alt=""width={80}height={40} /> 
            <p className='flex items-center text-2xl font-bold text-slate-600 mb-2 '>Forgot Password </p>
            <form action=""className='grid gap-5 mt-6' onSubmit={handleSubmit}>
               
                <div className='grid'>
                    <label htmlFor="email" className=' text-slate-600 font-semibold'>Email :</label>
                    <input 
                    type="email"
                    id='email'
                    className='bg-blue-50 p-2 outline-none rounded border focus-within:border-[#ec4899]'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    placeholder='Enter your email'
                     />
                </div>
               
                <Link to={'/forgot-password'}  className='block  p-1 text-slate-600 hover:text-pink-400 ml-auto'>
                Forgot Password ?
                </Link>
              
                <button disabled={!validate} className={`${validate ? " bg-pink-500 hover:bg-pink-600" : "bg-gray-500"} container mx-auto p-4 my-2 py-2 text-white font-semibold rounded tracking-wide`}>
                 SEND OTP
                     </button>

            </form>
            <p className='p-4 flex items-center justify-center'>
               Already Have  Account  ? <Link to={"/login"} className='text-pink-400 px-2  font-bold'> Login</Link>
            </p>

        </div>

    </section>
  )
}

export default ForgotPassword;

