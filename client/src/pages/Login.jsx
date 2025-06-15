import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { FaEyeSlash } from "react-icons/fa"
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import fetchUserDetails from '../utils/fetchUserDetails'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
    const[data,setData]=useState({
        
        email:"",
        password:"",
        
    })
    const[showPassword,setShowPassword]=useState(false)
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
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
        ...SummaryApi.login,
        data: data
    }) 
    if(response.data.error){
        toast.error(response.data.message)
    }
    if(response.data.success){
        toast.success(response.data.message)
        localStorage.setItem("accessToken",response.data.data.accessToken)
        localStorage.setItem("refreshToken",response.data.data.refreshToken)
        const userDetails=await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))
        setData({
           
            email:"",
            password:"",
           
        })
        navigate("/");
    }
    console.log("response",response)
         
      } catch (error) {
       AxiosToastError(error)
        
      }
    }
    const validate=Object.values(data).every(el=>el)
  return (
    <section className=' w-full container mx-auto px-12'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
            <p className='flex items-center justify-center text-3xl font-bold text-slate-600 '>Login to <img src={logo} alt=""width={150}height={90} /> </p>
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
                <div className='grid'>
                    <label htmlFor="password" className=' text-slate-600 font-semibold'>Password :</label>
                    <div className=' p-2 bg-blue-50 focus-within:border-[#ec4899] border rounded flex items-center justify-between gap-2'>
                    <input 
                    type={showPassword ? "text" :"password"}
                    id='password'
                    autoFocus
                    className=' w-full  outline-none'
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                    placeholder='Enter password'
                     />
                
                <div onClick={()=>setShowPassword(preve=>!preve)} className='cursor'>{
                    showPassword?(
                        <FaEye/>
                    ):( <FaEyeSlash/> )
                    }
                   
                </div>
                </div>
                </div>
                <Link to={'/forgot-password'}  className='block  p-1 text-slate-600 hover:text-pink-400 ml-auto'>
                Forgot Password ?
                </Link>
              
                <button disabled={!validate} className={`${validate ? " bg-pink-500 hover:bg-pink-600" : "bg-gray-500"} container mx-auto p-4 my-2 py-2 text-white font-semibold rounded tracking-wide`}>
                   Login
                     </button>

            </form>
            <p className='p-4 flex items-center justify-center'>
                You Don't Have An Account  ? <Link to={"/register"} className='text-pink-400 px-2  font-bold'> Register</Link>
            </p>

        </div>

    </section>
  )
}

export default Login;
