import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'
import { FaEyeSlash } from "react-icons/fa"
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

const OtpVerification = () => {
    const[data,setData]=useState(["","","","","",""])
    const inputRef=useRef([])
    const navigate=useNavigate()
    const location=useLocation()

    useEffect(()=>{
        if(!location?.state?.email){
            navigate('/forgot-password')

        }
    


    },[])
   
    const handleSubmit=async(e)=>{
        e.preventDefault()

      try {
         const response= await Axios ({
        ...SummaryApi.otp_verification,
        data: {
            otp:data.join(""),
            email:location?.state?.email
        }
      

    }) 
    if(response.data.error){
        toast.error(response.data.error)
    }
    if(response.data.success){
        toast.success(response.data.message)
        setData(["","","","","",""])
       // navigate("/verification-otp");
    }
    console.log("response",response)
         
      } catch (error) {
       AxiosToastError(error)
        
      }
    }
    const validate=data.every(el=>el)
  return (
    <section className=' w-120 container mx-auto h-120 my-auto px-12'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-2'>
           <img src={logo} alt=""width={80}height={40} /> 
            <p className='flex items-center text-2xl font-bold text-slate-600 mb-2  '>Enter OTP</p>
            <form action=""className='grid gap-5 mt-6' onSubmit={handleSubmit}>
               
                <div className='grid'>
                    <label htmlFor="otp" className=' text-slate-600 mb-5 font-semibold flex items-center justify-center'> OTP :</label>
                    <div className='flex items-center gap-2  justify-between'>
                        {
                          data.map((element,index)=>{
                           return( <input 
                            key={"otp"+index}
                               type="text"
                               id='otp'
                               ref={(ref)=>{
                                inputRef.current[index]=ref
                                return ref

                               }}
                               onChange={(e)=>{
                                const value=e.target.value

                                const newData=[...data]
                                newData[index]=value
                                setData(newData)

                                if(value && index<5){
                                    inputRef.current[index+1].focus()

                                }

                               }}
                               value={data[index]}
                               maxLength={1}
                               className='bg-blue-50 font-bold w-full  max-w-16 text-center  p-2 outline-none rounded border focus-within:border-[#ec4899]'
                            />
                           )
                          })
                        }
                    </div>
                    
                </div>
               
                
              
                <button disabled={!validate} className={`${validate ? " bg-pink-500 hover:bg-pink-600" : "bg-gray-500"} container mx-auto p-4 my-2 py-2 text-white font-semibold rounded tracking-wide`}>
                Verify OTP
                     </button>

            </form>
            <p className='p-4 flex items-center justify-center'>
               Already Have  Account  ? <Link to={"/login"} className='text-pink-400 px-2  font-bold'> Login</Link>
            </p>

        </div>

    </section>
  )
}

export default OtpVerification;

