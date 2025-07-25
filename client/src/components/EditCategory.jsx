import React, { useState } from 'react';
import uploadImage from '../utils/uploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { IoClose } from 'react-icons/io5';

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
  const [data, setData] = useState({
    _id: CategoryData._id,
    name: CategoryData.name,
    image: CategoryData.image,
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadCategory=async(e)=>{
    const file=e.target.files[0];

    if(!file){
      return
    };
    setLoading(true)
    const response=await uploadImage(file)

    const {data:ImageResponse}=response;
    setLoading(false)

    setData((preve)=>{
      return{
        ...preve,
        image:ImageResponse.url
      }
    })



    console.log(Image)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchData();  // ✅ Refresh UI first
        close();      // ✅ Then close modal
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  console.log('CategoryData',CategoryData)

  return (
    <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-800/60 p-4 flex items-center justify-center'>
      <div className='bg-white max-w-4xl w-full p-4 rounded'>
        <div className='flex items-center justify-between'>
          <h2 className='font-semibold py-4'>Update Category</h2>
          <button onClick={close} className='w-fit block ml-auto'>
            <IoClose size={25} />
          </button>
        </div>

        <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='categoryName'>Name</label>
            <input
              type='text'
              id='categoryName'
              placeholder='Enter category name'
              value={data.name}
              name='name'
              onChange={handleOnChange}
              className='bg-blue-50 p-2 border border-blue-100 focus-within:border-pink-400 outline-none rounded'
            />
          </div>

          <div>
            <p>Image</p>
            <div className='flex gap-3 flex-col lg:flex-row items-center'>
              <div className='flex items-center justify-center bg-blue-50 h-36 w-full lg:w-36 border border-blue-100 rounded'>
                {data.image ? (
                  <img
                    alt='category'
                    src={data.image}
                    className='w-full h-full object-scale-down'
                  />
                ) : (
                  <p className='text-sm text-neutral-500'>No Image</p>
                )}
              </div>

              <label htmlFor='uploadCategoryImage'>
                <div
                  className={`${
                    !data.name ? 'bg-gray-300' : 'border-pink-500'
                  } px-4 py-2 rounded cursor-pointer border hover:bg-pink-400 font-medium`}
                >
                  {loading ? 'Loading...' : 'Upload Image'}
                  <input
                    disabled={!data.name}
                    onChange={handleUploadCategory}
                    type='file'
                    id='uploadCategoryImage'
                    className='hidden'
                  />
                </div>
              </label>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading || !data.name || !data.image}
            className={`${
              data.name && data.image && !loading
                ? 'bg-pink-400 hover:bg-pink-500'
                : 'bg-gray-300 cursor-not-allowed'
            } py-2 font-semibold rounded`}
          >
            {loading ? 'Updating...' : 'Update Category'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
