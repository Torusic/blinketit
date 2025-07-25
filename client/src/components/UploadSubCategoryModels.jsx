import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useState } from 'react'
import uploadImage from '../utils/uploadImage'
import { useSelector } from 'react-redux'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
const UploadSubCategoryModels = ({close}) => {
    const[subCategoryData,setSubCategoryData]=useState({
           name:"",
           image:"",
           category:[]
  })
  const allCategory=useSelector((state)=>state.product.allCategory)
  console.log("all category",allCategory)
  const handleChange=async(e)=>{
    const{name,value}=e.target

    setSubCategoryData((preve)=>{
        return{
            ...preve,
            [name]:value
        }
    })

  }
  const handleRemoveCategorySelected=(categoryId)=>{
    const index=subCategoryData.category.findIndex(el=>el.id===categoryId)
    subCategoryData.category.splice(index,1)
    setSubCategoryData((preve)=>{
        return{
            ...preve,

        }
    })

  }
  const handleUploadSubCategoryImage=async(e)=>{
    const file=e.target.files[0];
    if(!file){
        return
    }
    const response=await uploadImage(file);
    const{data:ImageResponse}=response;

    setSubCategoryData((preve)=>{
        return{
            ...preve,
            image:ImageResponse.url
        }
    })

  }
  const handleSubmitSubCategory=async(e)=>{
    e.preventDefault()
    try {
        const response=await Axios({
            ...SummaryApi.createSubCategory,
            data:subCategoryData
        })
        const{data:responseData}=response;
       
        if(responseData.success){
            toast.success(responseData.message)
            if(close){
                close()
            }
        }
        
    } catch (error) {
        AxiosToastError(error)
        
    }
  }
  console.log("subcategory",subCategoryData)
  return (
    <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-950/65 p-4 flex items-center justify-center '>
        <div className='w-full bg-white max-w-6xl p-4 rounded'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-slate-700'>Add Sub Category</h2>
                <button onClick={close}>
                    <IoClose size={25}/>
                </button>
            </div>
           <form action="" onSubmit={handleSubmitSubCategory}>
        
               <div className='grid my-3 gap-2'>
                <label htmlFor="name" className='p-1'> Name</label>
                <input type="text"
                id='name'
                name='name'
                value={subCategoryData.name}
                onChange={handleChange}
                className='p-2 rounded border-blue-100 bg-blue-50 border outline-none focus-within:border-pink-400'


                placeholder=''
                
                />
            </div>
            <div className='grid gap-1'>
                <p> Image</p>
                <div className='flex flex-col lg:flex-row items-center gap-3'>
                    <div className='border h-36 lg:w-36 w-full rounded bg-blue-50 border-blue-100 focus-within:border-pink-400 flex items-center justify-center'>
                    {
                        !subCategoryData.image ? (
                            <p className='text-sm text-neutral-400'>No Image</p>

                        ):(
                            <img 
                            alt=''
                            src={subCategoryData.image} 
                            className='w-full h-full object-scale-down '
                             />

                        )
                    }

                </div>
                <label htmlFor="uploadSubCategoryImage">
                    
                    <div className={`${!subCategoryData.name ? "bg-gray-300" : "border-pink-400 border  text-pink-400 hover:bg-pink-400 hover:text-neutral-600"} rounded cursor-pointer px-4 py-1 `}>
                    Upload Image
                    <input
                    disabled={!subCategoryData.name}
                     type="file"
                     className='hidden' 
                     id='uploadSubCategoryImage'
                     onChange={handleUploadSubCategoryImage}/>
                    </div>
                </label>
                </div>
                <div className='grid gap-1'>
                    <label className='my-1' htmlFor="">Select Category</label>
                    <div className='flex flex-wrap   gap-2'>
                        {
                        subCategoryData.category.map((cat,index)=>{
                            return(
                                <p key={cat._id+"selected value"}className='bg-white shadow-md px-2 m-1 flex items-center gap-3'>{cat.name}
                                <div className='cursor-pointer hover:text-red-600' onClick={()=>handleRemoveCategorySelected(cat._id)} >
                                    <IoClose size={15} />
                                </div>
                                
                                </p>
                            )
                            
                        })
                    }
                    </div>
                    
                    <select 
                    className='bg-blue-50 border p-2 outline-none focus-within:border-pink-400 rounded border-blue-100 '
                    name=""
                     id=""
                     onChange={(e)=>{
                        const value=e.target.value;
                        const categoryDetails=allCategory.find(el=>el._id==value);
                        setSubCategoryData((preve)=>{
                            return{
                                ...preve,
                                category:[...preve.category,categoryDetails]
                            }
                        })
                     }}
                    >
                        <option value="">Select</option>
                        {
                            allCategory.map((category,index)=>{
                                return(
                                    <option value={category._id} key={category._id+"Sub category"}>{category?.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className={`px-4 py-2 mt-3 border-gray-300 outline-none rounded
                ${subCategoryData.name && subCategoryData.image && subCategoryData.category[0] ?"bg-pink-400 hover:bg-pink-500":"bg-gray-300" }
                font-semibold `
                    
                }>
                  Submit
                </button>
                <div>
                    
                </div>
               
            </div>
        
           </form>

        </div>

    </section>
  )
}

export default UploadSubCategoryModels