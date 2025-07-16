import SearchBar from './SearchBar'
import { useEffect, useState } from 'react';
const Hero = () => {
const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300); // slight delay to trigger animation
  }, []);

  const animationStyle = {
    opacity: animate ? 1 : 0,
    transform: animate ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 1s ease, transform 1s ease',
  };

  return (<>
    <div className='flex flex-col items-center justify-center w-full sm:pt-23 md:pt-27 lg:pt-30 pt-20 px-7 md:px-0 space-y-7 text-center mb-0'>
      <h1 className='md:text-home-heading -large text-home-heading-small relative font-bold sm:max-w-xl md:max-w-2xl lg:max-w-3/5 mx-auto text-3xl md:text-4xl lg:text-5xl  transition-all '  style={animationStyle}>
        Take control of your future with courses that<span className='text-orange-900'> fit your choice...</span>
      </h1>
      <p  style={animationStyle} className="md:block hidden text-gray-600 max-w-3/6 mx-auto md:text-xl lg:text-2xl">Learn what matters to you, on your schedule, with expert guidance and practical content.</p>
      <p  style={animationStyle} className='md:hidden text-gray-800 max-w-sm mx-auto text-xl'>
        Courses that fit your goals, your pace, and your interests.
      </p>
      <SearchBar />
      
    </div>
  </>
  )
}

export default Hero
