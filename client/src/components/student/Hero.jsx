import React from 'react'
import assets from '../../assets/assets'
import SearchBar from './SearchBar'
const Hero = () => {
  return (<>
    <div className='flex flex-col items-center justify-center w-full md:pt-30 pt-20 px-7 md:px-0 space-y-7 text-center  bg-gradient-to-b from-fuchsia-300 to-fuchsia-200 mb-0'>
      <h1 className='md:text-home-heading -large text-home-heading-small relative font-bold md:max-w-3xl lg:max-w-4xl mx-auto text-4xl md:text-5xl lg:text-6xl transition-all hover:'>
        Take control of your future with courses that<span className='text-fuchsia-900'> fit your choice.</span><img
          src={assets.sketch}
          alt="sketch"
          className='md:block hidden absolute -bottom-8 right-10 filter'
          style={{ filter: 'invert(17%) sepia(100%) saturate(5000%) hue-rotate(290deg) brightness(95%) contrast(71%)' }}
        />
      </h1>
      <p className="md:block hidden text-gray-600 max-w-2xl mx-auto md:text-3xl lg:text-4xl">Learn what matters to you, on your schedule—with expert guidance and practical content.</p>
      <p className='md:hidden text-gray-800 max-w-sm mx-auto '>
        Courses that fit your goals, your pace, and your interests—with expert guidance and real support.
      </p>
      <SearchBar />
    </div>
  </>
  )
}

export default Hero
