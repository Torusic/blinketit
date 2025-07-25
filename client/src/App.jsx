import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import { setUserDetails } from './store/userSlice'
import { useDispatch } from 'react-redux'
import { setAllCategory } from './store/productSlice'
import Axios from './utils/Axios'
import SummaryApi from './common/SummaryApi'

function App() {
  const dispatch=useDispatch()

  const fetchUser=async()=>{
    const userData=await fetchUserDetails();
    console.log("user details",userData)

    dispatch(setUserDetails(userData.data))
  }
    const fetchCategory=async(req,res)=>{
        try {
       
           const response=await Axios({
              ...SummaryApi.getCategory,
  
           })
           const{data:responseData}=response;
           if(responseData.success){
            dispatch(setAllCategory(responseData.data))
            //setCategoryData(responseData.data)
           }
           
        } catch (error) {
           
        }finally{
          
        }
     }
     

  useEffect(()=>{
    fetchUser()
    fetchCategory()

  },[])


  return (
    <>
    <Header/>
    <main className='min-h-[78vh] '>
      <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App
