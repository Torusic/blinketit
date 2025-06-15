import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
   <section className='bg-white'>
    <div className='container mx-auto p-3 lg:flex'>
     
              {/**left for menu**/}
              <div className='w-250 p-4 sticky top-24 overflow-y-auto hidden lg:block'>
                <UserMenu/>

              </div>

              {/**right for menu**/}
              <div className='bg-white w-1000 p-4 '>
                <Outlet/>
              </div>
        
      

    </div>

   </section>
  )
}

export default Dashboard