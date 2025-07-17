import { BookOpen } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-br from-orange-600 to-orange-800 text-white md:px-36 text-left w-full mt-0 text-base'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'>
           <div onClick={() => navigate('/')} className="flex items-center space-x-3 cursor-pointer">
                <div className={`flex items-center justify-center bg-gradient-to-tl from-black to-orange-900 via-orange-900 text-white p-1 rounded-lg shadow-md transition-all duration-300 hover:scale-110`}>
                    <BookOpen size={20} className="mr-1" />
                    <span className="font-semibold text-lg font-mono">L</span>
                </div>
            </div>
          <p className='mt-6 text-center md:text-left text-sm '>Empowering learners through accessible, high-quality education.</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold mb-5'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm md:space-y-2 '>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold  mb-5'>Subscribe to our newsletter</h2>
          
          <p className='text-sm '>The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div className='flex items-center gap-2 pt-4'>
            <input type="email" placeholder='Enter your email' className='border  rounded-3xl border-gray-500 bg-gray-900 text-gray-300 placeholder-gray-400 outline-none w-64 h-9 px-2 text-sm' />
            <button className='bg-orange-950 w-24 h-9 rounded-3xl text-white cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-xl'>Subscribe</button>
          </div>
        </div>

      </div>
      <p className='py-4 text-center text-xs md:text-sm '>
        Copyright {new Date().getFullYear()} © Lernix. All Right Reserved.
      </p>

    </footer>
  )
}

export default Footer
