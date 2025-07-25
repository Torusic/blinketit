import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/fetchUserDetails';

import { setUserDetails } from '../store/userSlice';
import Axios from '../utils/Axios';

const Profile = () => {
const user=useSelector((state)=>state.user)
const dispatch=useDispatch()
const [openProfileAvatarEdit,setProfileAvatarEdit]=useState(false)
const [userData,setUserData]=useState({
  name:user.name,
  email:user.email,
  mobile:user.mobile
})
const[loading,setLoading]=useState(false)
useEffect(()=>{
  setUserData({
      name:user.name,
      email:user.email,
      mobile:user.mobile

  })

},[user])
const handleOnChange=(e)=>{
  const {name,value}=e.target

  setUserData((preve)=>{
    return {
      ...preve,
      [name]:value
    }
  })

}
const handleSubmit=async(e)=>{
  e.preventDefault()
  try {
    setLoading(true)
    const response=await Axios({
      ...SummaryApi.updateUser,
      data:userData


    })
    const{data:responseData}=response

    if(responseData.success){
      toast.success(responseData.message)
      const userData=await fetchUserDetails()
      dispatch(setUserDetails(userData.data))
    }
    
  } catch (error) {
    AxiosToastError(error)
    
  }finally{
    setLoading(false)
  }


}

  return (
    <div className='px-4'>
      <div className='w-20 h-20 text-pink-600 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm' >
      {
        user.avatar?(
          <img alt={user.name}
          src={user.avatar} 
          className='w-full h-full' 
          />

        ):(
          <FaRegUserCircle size={65}/>

        )
      }

      </div>
      <button onClick={()=>setProfileAvatarEdit(true)} className='text-sm rounded-full min-w-20 border border-pink-400 hover:border-pink-800 hover:bg-pink-500 px-3 py-1 mt-3'>Edit </button>
       {
        openProfileAvatarEdit &&(
          <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)}/>
        )
       }
        {/**name, email, mobile and change password */}
                  <form onSubmit={handleSubmit} action=""className='my-4 grid gap-4 '>
                    <div className='grid gap-1'>
                      <label htmlFor="">Name :</label>
                      <input 
                      type="text"
                      placeholder='Enter your Name'
                      className=' bg-blue-50 p-2 border border-blue-100 focus-within:border-pink-400 outline-none rounded'
                      value={userData.name}
                      name='name'
                      onChange={handleOnChange}
                      required

                       />
                    </div>
                    <div className='grid gap-1'>
                      <label htmlFor="email">Email :</label>
                      <input 
                      type="email"
                      id='email'
                      placeholder='Enter your Name'
                      className='bg-blue-50 p-2 border border-blue-100 focus-within:border-pink-400 outline-none rounded'
                      value={userData.email}
                      name='email'
                      onChange={handleOnChange}

                       />
                    </div>
                    <div className='grid gap-1'>
                      <label htmlFor="mobile">Mobile :</label>
                      <input 
                      type="mobile"
                      id='mobile'
                      placeholder='Enter your Name'
                      className='bg-blue-50 p-2 border border-blue-100 focus-within:border-pink-400 outline-none rounded'
                      value={userData.mobile}
                      name='mobile'
                      onChange={handleOnChange}
                      required

                       />
                    </div>
                    <button className='border lg:w-full w-80 border-pink-400 px-4 py-2 mt-3 font-semibold text-pink-400 hover:text-neutral-800 hover:bg-pink-400 rounded'>
                      {
                        loading ? "Loading":"Submit"
                      }
                      </button>
                
                  </form>
    </div>
  )
}

export default Profile
