import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user=useSelector((state)=>state.user)
  console.log("user",user)
  return (
   <section className='bg-white'>
    <div className='container mx-auto p-3 lg:flex'>
     
              {/**left for menu**/}
              <div className='w-250 p-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r border-pink-500'>
                <UserMenu/>

              </div>

              {/**right for menu**/}
              <div className='bg-white w-1000 min-h-[75vh] '>
                <Outlet/>
              </div>
        
      

    </div>

   </section>
  )
}

export default Dashboard