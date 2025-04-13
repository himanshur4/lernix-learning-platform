import React from 'react'
import assets from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t bg-gradient-to-b from-fuchsia-300 via-fuchsia-300 to-fuchsia-300'>
      <div className='flex items-center gap-4'>
      <img src={assets.gurukulLogo} alt="Logo" className='w-9 lg:w-15'/>
      <div className="hidden md:block h-7 w-px bg-gray-700/80"></div>
      <p className='py-4 text-center text-xs md:text-sm text-gray-500'>Copyright {new Date().getFullYear()} © Lernix. All Right Reserved.</p>
      </div>
      <div className='flex items-center gap-3 max-md:mt-4'>
        <a href="#">
          <img src={assets.facebook_icon} alt="facebook_icon" />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="twitter_icon" />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="instagram_icon" />
        </a>
      </div>
    </footer>

  )
}

export default Footer
 