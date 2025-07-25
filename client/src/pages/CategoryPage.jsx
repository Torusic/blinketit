import React, { useState } from 'react'
import UploadCategoryModels from '../components/UploadCategoryModels'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'


const CategoryPage = ({fetchCategory}) => {
   const[openUploadCategory,setOpenUploadcategory]=useState(false)
   const[loading,setLoading]=useState(false)
   const[categoryData,setCategoryData]=useState([])
   const[openEdit,setOpenEdit]=useState(false)
   const[editData,setEditData]=useState({
      name:"",
      image:""
   })
const[openConfirmBox,setOpenConfirmBox]=useState(false)
const[deleteCategory,setDeleteCategory]=useState({
   _id:""
})

const handleDelete=async()=>{
   try {
      const response=await Axios({
         ...SummaryApi.deleteCategory,
         data:deleteCategory
      })
      const{data:responseData}=response;
      if(responseData.success){
         toast.success(responseData.message)
         setLoading(true)
         fetchCategory()
         setOpenConfirmBox(false)
      }
   } catch (error) {
      AxiosToastError(error)
      
   }finally{
      setLoading(false)
   }
}
const allCategory=useSelector(state=>state.product.allCategory)
console.log("all category",allCategory)
   {/**const fetchCategory=async(req,res)=>{
      try {
         setLoading(true)
         const response=await Axios({
            ...SummaryApi.getCategory,

         })
         const{data:responseData}=response;
         if(responseData.success){
            setCategoryData(responseData.data)
         }
         
      } catch (error) {
         
      }finally{
         setLoading(false)
      }
   }
   useEffect(()=>{
      fetchCategory()

   },[])**/}
   useEffect(()=>{
      setCategoryData(allCategory)

   },[allCategory])
  return (
     <section className=''>
        <div className='p-2  bg-white shadow-md flex items-center lg:justify-between mx-auto gap-35 '>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=>setOpenUploadcategory(true)} className=' border border-pink-500 hover:bg-pink-500 px-3 py-2  cursor-pointer rounded  '>AddCategory</button>
        </div> 
        {
         !categoryData[0]&& !loading &&(
            <NoData/>

         )
        }
        <div className='p-4 grid grid-cols-6 gap-2'>
         {
         categoryData.map((category,index)=>{
            return(
               <div key={category._id} className='w-40 h-56 rounded group bg-white shadow-md  transition-100'>
                  <img alt={category.name} 
                  src={category.image}
                  className='w-40 h-35 rounded  object-scale-down flex  p-2' />
                     <p className='p-2 flex items-center text-pink-600 font-semibold text-sm'>{category.name}</p>
                     <div className='items-center flex h-9 p-1 gap-2'>
                        <button onClick={()=>{setOpenEdit(true)
                           setEditData(category)
                        }} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium rounded'>
                           Edit
                        </button>
                        <button onClick={()=>{
                           setOpenConfirmBox(true) 
                           setDeleteCategory(category)}
                           } className='flex-1  bg-red-100 hover:bg-red-200 text-red-600 font-medium rounded'>
                           Delete
                        </button>
                     </div>
               </div>
            
            )
           

         })
        }
        </div>
        {
         loading && (
            <Loading/>
         )
        }
        {openUploadCategory && (

          <UploadCategoryModels fetchData={fetchCategory} close={()=>setOpenUploadcategory(false)}/>
        )
        }
        {
         openEdit &&(
            <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory} />
         )
        }
        {
         openConfirmBox &&(
            <ConfirmBox close={()=>setOpenConfirmBox(false)} cancel={()=>setOpenConfirmBox(false)} confirm={handleDelete}/>
         )
        }
     
     </section>
  )
}

export default CategoryPage