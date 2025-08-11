import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../../context/AppContext'
const CallToAction = () => {
  const{userData,navigate}=useContext(AppContext);
  return (
    <div className='flex flex-col items-center gap-4 pt-10 mb-0 pb-24 px-8 md:px-0 '>
     <h1 className='text-xl md:text-4xl text-gray-900 font-semibold'>Learn anything, anytime, anywhere</h1>
     <p className='text-gray-800 sm:text-sm'>Unlock your potential with flexible learning tailored to your pace and passion. Whether you're at home or on the move, your next skill is just a click away.</p>
     <div className='flex items-center font-medium gap-6 mt-4'>
      <button onClick={()=>{
        if(!userData) (toast.warn('Please sign in'));
        else {scrollTo(0,0)}
      }} className='transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-xl px-10 py-3 rounded-3xl hover:scale-105 text-white bg-gradient-to-tl from-orange-600 to-orange-800 cursor-pointer'>
        Get started
      </button>
      <button className='flex items-center gap-2'>
       Learn more <img src="/arrow_icon.svg" alt="arrow_icon" />
      </button>
     </div>
    </div>
  )
}

export default CallToAction
