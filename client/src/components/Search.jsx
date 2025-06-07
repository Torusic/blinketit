import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hook/useMobile';
const Search = () => {
const navigate=useNavigate()
const location=useLocation()
const [isSearchPage,setIsSearchPage]=useState(false)
const [isMobile]=useMobile()

useEffect(()=>{
  const isSearch=location.pathname==="/search"
  setIsSearchPage(isSearch)

},[location])

const redirectToSearchPage=()=>{
  navigate("/search")
}



  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px]h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-100 focus-within:border-[#ec4899]'>
      
      {
        (isMobile && isSearchPage)?(
            <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 focus-within:text-[#ec4899] bg-white rounded-full shadow-md'>
        <FaArrowLeft size={20}/>

      </Link> 
        ):(
          <button className='flex justify-center items-center  h-full p-3 focus-within:text-[#ec4899]'>
        <FaSearch size={22}/>
         </button>
        )
      }

      
       <div className='w-full h-full'>
        {
          !isSearchPage ?(
            <div onClick={redirectToSearchPage} className='w-full h-full flex items-center '>
        <TypeAnimation
       sequence={[
        // Same substring at the start will only be typed out once, initially
        'Search "milk"',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Search "bread"',
        1000,
        'Search "sugar"',
        1000,
        'Search "yorghout"',
        1000,
        'Search "chocolate"',
        1000, 
        'Search "crisps"',
        1000,
        'Search "biscuits"',
        1000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />

      </div>

          ):(
            <div className='w-full h-full'>
              <input
               type="text"
               placeholder='search for sugar and more'
               autoFocus
               className='bg-transparent w-full h-full outline-none'
               />
              </div>
            
          )
        }
      </div>
      
    </div>
  )
}

export default Search
