import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className='border-t z-50 bg-slate-50'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2 '>
             <p>©All rights reserved 2025</p>
        
        <div className='flex items-center gap-4 justify-center text-2xl'>
             <a href=""className='hover:text-[#ec4899]'>
                <FaFacebook/>
             </a>
             <a href=""className='hover:text-[#ec4899]' >
                <FaInstagram/>
             </a>
             <a href=""className='hover:text-[#ec4899]' >
                <FaLinkedin/>
             </a>

        </div>
       </div>
    </footer>
  )
}

export default Footer
