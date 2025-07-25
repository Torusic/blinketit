import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import AxiosToastError from '../utils/AxiosToastError'
import { logout } from '../store/userSlice'
import { LuExternalLink } from "react-icons/lu";
import isAdmin from '../utils/isAdmin'

const UserMenu = ({close}) => {
  const user=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout=async()=>{
    try {
      const response=await Axios({
        ...SummaryApi.logout

      })
      if(response.data.success){
        if(close){
          close()
        }
        dispatch(logout())
        localStorage.clear()
        toast.success(response.data.message)
        navigate("/")
      }

      
    } catch (error) {

      AxiosToastError(error)
      
    }

  }
  const handleClose=()=>{
    if(close){
      close()
    }
  }
  return (
    <div className=''>
      <div className='font-semibold'> My Account</div>
        <div className='font-light flex items-center gap-3'>
          <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}<span className='text-medium text-red-500 px-2'>{user.role==="ADMIN"?"(Admin)":""}</span></span>
          <Link onClick={handleClose} to={"/dashboard/profile"}>
            <LuExternalLink size={15} className='hover:text-pink-500'/>
          </Link>
          </div>
        <Divider/>
        <div className='grid font-light gap-2 px-2 mr-2'>
          {
            isAdmin(user.role) &&
            (
              <Link onClick={handleClose} to={"/dashboard/category"}  className='hover:bg-pink-400 px-2 rounded  '> Category</Link>
            )
          }
          {
            isAdmin(user.role) &&
            (
              <Link onClick={handleClose} to={"/dashboard/subcategory"}  className='hover:bg-pink-400 px-2 rounded '> Sub Category</Link>
            )
          }
          {
            isAdmin(user.role) &&
            (
             <Link onClick={handleClose} to={"/dashboard/upload-product"}  className='hover:bg-pink-400 px-2 rounded '> Upload Product</Link>
            )
          }
          {
            isAdmin(user.role) &&
            (
            <Link onClick={handleClose} to={"/dashboard/product"}  className='hover:bg-pink-400 px-2 rounded '> Product</Link>
            )
          }
          
          
          
          
          <Link onClick={handleClose} to={"/dashboard/myorders"}  className='hover:bg-pink-400 px-2 rounded '> My Orders</Link>
          <Link onClick={handleClose} to={"/dashboard/address"} className='hover:bg-pink-400 px-2 rounded ' >Save Address</Link>
         <button onClick={handleLogout} className='text-left hover:bg-red-400 px-2 rounded ' ><Link to={"/login"}></Link>Logout</button>

        </div>
      
    </div>
  )
}

export default UserMenu;
