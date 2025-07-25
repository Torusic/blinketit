import React, { useEffect } from 'react'
import { useState } from 'react'
import NoData from '../components/NoData'
import UploadSubCategoryModels from '../components/UploadSubCategoryModels'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'

const SubCategoryPage = () => {
  const[openAddSubCategory,setOpenAddSubCategory]=useState(false)
  const[data,setData]=useState([])
  const[loading,setLoading]=useState(false)
  const fetchSubCategory=async(e)=>{
   

    try {
      setLoading(true)
      const response=await Axios({
        ...SummaryApi.getSubCategory,
      })
      const{data:responseData}=response;
      if(responseData.success){
        setData(responseData.data)
      }
      
    } catch (error) {
      AxiosToastError(error)
      
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchSubCategory()

  },[])
  console.log("subCategory",data)
  

  return (
  <section className=''>
        <div className='p-2  bg-white shadow-md flex items-center lg:justify-between mx-auto gap-35 '>
            <h2 className='font-semibold'> Sub Category</h2>
            <button onClick={()=>setOpenAddSubCategory(true)}  className=' border border-pink-500 hover:bg-pink-500 px-3 py-2  cursor-pointer rounded  '>Add SubCategory</button>
        </div> 
        
        {
          openAddSubCategory &&(
            <UploadSubCategoryModels close={()=>setOpenAddSubCategory(false)}/>
          )
        }

        </section>
  )
}

export default SubCategoryPage