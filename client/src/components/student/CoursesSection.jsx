import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'
const CoursesSection = () => {

  const {allCourses}=useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-2 '>
      <h2 className='text-3xl font-medium text-gray-900 px-2'>Advance with Confidence</h2>
      <p className='text-sm md:text-base text-gray-800 mt-3 px-2'>Learn with our diverse course library in technology, creativity, and personal development-designed to help you reach your goals efficiently.</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-4 md:px-0 md:my-10 my-5 gap-3'>
        {allCourses.slice(0,4).map((course,i)=><CourseCard key={i} course={course}/>)}
      </div>
      <div className='mt-12 transition-transform duration-400  hover:drop-shadow-2xl'>
      <Link to={'/courses-list'} onClick={()=>scrollTo(0,0)} className='font-semibold text-gray-900 border border-black px-10 py-3 rounded-3xl hover:bg-gradient-to-tl hover:from-orange-600 hover:to-orange-800 hover:text-white hover:scale-105 hover:border-0'>Show all courses</Link>
      </div>
    </div>
  )
}

export default CoursesSection
