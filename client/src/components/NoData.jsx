import React from 'react'
import noData from '../assets/noData.png'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center py-19'>
        <img src={noData} alt="no data"className='w-48'/>
    </div>
  )
}

export default NoData