import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from '../hook/useMobile';
import { TiShoppingCart } from "react-icons/ti";



const Header = () => {
  const[isMobile]=useMobile();
  const location=useLocation();
  const navigate=useNavigate();

  const isSearchPage=location.pathname==='/search'
  const redirectToLoginPage=()=>{
    navigate("/login")

  }

    console.log("location",location)

  console.log("isMobile",isMobile)
  return (
    <header className='h-24  lg:h-20 lg:shadow-md sticky top-0 p-9 bg-white  flex  flex-col justify-center gap-1'>
     {
      !(isSearchPage && isMobile ) &&
      (
        <div className='container mx-auto flex items-center  px-2 justify-between'>
        
        {/**logo */}
        <div className='h-full'>
        < Link to={"/"} className=' flex justify-center items-center'>
          <img src={logo}width={170}height={60} alt="logo"className='hidden lg:block' />
           <img src={logo}width={120}height={60} alt="logo"  className='lg:hidden '/>
        </Link>
        </div>
       {/**search */}
       <div className='hidden lg:block'>
        <Search/>
       </div>
    


       {/**login */}
       <div>
        <button className='text-neutral-500 lg:hidden'>
          <FaRegUserCircle size={26}/>
        </button >
        <div className='hidden lg:flex items-center gap-10'>
        <button onClick={redirectToLoginPage} className='text-lg px-2'>
           Login
        </button>
       
        <button className='flex items-center gap-2 bg-pink-500 hover:bg-pink-600 px-3 py-3 rounded text-white'>
          <div className='animate-bounce'>
            <TiShoppingCart size={30}/>
          </div>
          <div className='font-semibold'>
           <p>My Cart</p>
          </div>
        </button>
     
       </div>
      </div>
       

      </div>
      )
     }
      <div className='container mx-auto px-2 lg:hidden'>
        <Search/>
      </div>
      
    </header>
  )
}

export default Header
