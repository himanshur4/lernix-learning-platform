import React from 'react'
import assets from '../../assets/assets'
import SearchBar from './SearchBar'
const Hero = () => {
  return (<>
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center text-gray-950 bg-gradient-to-b from-fuchsia-200 opacity-90'>
      <h1 className='md:text-home-heading -large text-home-heading-small relative font-bold max-w-3xl mx-auto text-4xl md:text-5xl'>
        Empower your future with the courses designed to<span className='text-fuchsia-800'> fit your choice.</span><img src={assets.sketch} alt="sketch" className='md:block hidden absolute -bottom-7 right-0'/>
      </h1>
      <p className="md:block hidden text-gray-600 max-w-2xl mx-auto md:text-3xl">We bring together world-class instructors, interactive content, and a supportive community to achieve your personal and professional goals.</p>
      <p className='md:hidden text-gray-700 max-w-sm mx-auto '>
        We bring together world-class instructors to provide you with the best learning experience.
      </p>
      <SearchBar/>
    </div>
    </>
  )
}

export default Hero
