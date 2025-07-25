import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 z-50 right-0 bg-neutral-950/75 p-4  flex justify-center items-center '> 
      <div className='bg-white max-w-md w-full p-4  rounded'>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold'>Permanent Delete</h1>
            <button>
              <IoClose size={25} className='block w-fit ml-auto' onClick={close} />
            </button>
          </div>
          <p className='my-4'>Are you sure ?</p>
          <div className='ml-auto flex items-center w-fit gap-2'>
            <button onClick={cancel} className='px-3 py-1 border rounded border-red-400 text-red-500 hover:bg-red-500 hover:text-white'>Cancel</button>
            <button onClick={confirm} className='px-3 py-1 border rounded border-green-600 text-green hover:bg-green-600 hover:text-white'>Confirm</button>
          </div>
      </div>
      </div>
  )
}

export default ConfirmBox