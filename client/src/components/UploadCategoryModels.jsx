import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/uploadImage'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError.js'
import toast from 'react-hot-toast'

const UploadCategoryModels = ({close,fetchData}) => {
  const[data,setData]=useState({
    name:"",
    image:""
  })
const [loading,setLoading]=useState(false)
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const response=await Axios({
        ...SummaryApi.addCategory,
        data:data
      })
      const{data:responseData}=response;
      if(responseData.success){
        toast.success(responseData.message)
        close()
        fetchData()
      }

      
    } catch (error) {
      
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  const handleUploadCategory=async(e)=>{
    const file=e.target.files[0];

    if(!file){
      return
    };
    const response=await uploadImage(file)

    const {data:ImageResponse}=response;

    setData((preve)=>{
      return{
        ...preve,
        image:ImageResponse.url
      }
    })



    console.log(Image)
  }
  const handleOnChange=(e)=>{
    const{name,value}=e.target
    setData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
  }
  return (
    <section  className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-800/60 p-4 flex items-center justify-center '>
      <div className='bg-white max-w-4xl w-full p-4 rounded'>
         <div className='flex items-center justify-between'>
          <h2 className='font-semibold py-4'>Category</h2>
          <button onClick={close} className=' w-fit block ml-auto'>
          <IoClose size={25} />
         </button>
         </div>
         <form action=""className='my-3 grid gap-2' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label id='categoryName'>Name</label>
            <input
             type="text"
             id='categoryName'
             placeholder='Enter category name'
             value={data.name}
             name='name'
             onChange={handleOnChange}
             className='bg-blue-50 p-2 border border-blue-100 focus-within:border-pink-400 outline-none rounded'
              />
          </div>
          <div>
            <div>
              <p>Image</p>
              <div className='flex  gap-3 flex-col lg:flex-row items-center '>
                <div className='flex items-center justify-center bg-blue-50 h-36 w-full lg:w-36 outline-none border border-blue-100  focus-within:border-pink-400 rounded'>
                  {
                    data.image ?(
                      <img  alt="category" src={data.image} className='w-full h-full object-scale-down '/>

                    ):(
                       <p className='text-sm text-neutral-500'>No Image</p>

                    )
                  }
                
              </div>
             <label htmlFor="uploadCategoryImage">
               <div  className=
              {`
                ${!data.name ? "bg-gray-300" :"border-pink-500"}
                px-4 py-2 rounded cursor-pointer border hover:bg-pink-400 font-medium
                `}>Upload Image
                <input disabled={!data.name} onChange={handleUploadCategory} type="file" id='uploadCategoryImage' className='hidden'/>
              </div>
             </label>
              </div>
            </div>
      
          </div>
          <button
          className={
            `  ${data.name && data.image ? "bg-pink-400 hover:bg-pink-500":"bg-gray-300"}
            py-2 font-semibold rounded
            
            `
          }
          
          >Add Category
          </button>
         </form>

      </div>
    </section>
  )
}

export default UploadCategoryModels