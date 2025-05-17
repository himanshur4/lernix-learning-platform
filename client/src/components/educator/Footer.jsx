import React from 'react'
import assets from '../../assets/assets'
import { BookOpen, Facebook, LucideInstagram, TwitterIcon } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8  bg-orange-500'>
      <div className='flex items-center gap-4'>
        <div onClick={() => navigate('/')} className="flex items-center space-x-3 cursor-pointer">
          <div className={`flex items-center justify-center bg-gradient-to-tl from-black to-orange-900 via-orange-900 text-white p-1 rounded-lg shadow-md transition-all duration-300 hover:scale-110`}>
            <BookOpen size={20} className="mr-1" />
            <span className="font-semibold text-lg font-mono">L</span>
          </div>
        </div>
      <div className="hidden md:block h-7 w-px bg-white"></div>
      <p className='py-4 text-center text-xs md:text-sm text-white'>Copyright {new Date().getFullYear()} © Lernix. All Right Reserved.</p>
      </div>
      <div className='flex items-center gap-3 max-md:mt-4 border-black rounded-full'>
        <a href="#" className='border-black rounded-full'>
          <Facebook/>
        </a>
        <a href="#">
          <TwitterIcon/>
        </a>
        <a href="#">
         <LucideInstagram/>
        </a>
      </div>
    </footer>

  )
}

export default Footer
 