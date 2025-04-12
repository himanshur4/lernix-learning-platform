import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'
const CoursesSection = () => {

  const {allCourses}=useContext(AppContext)

  return (
    <div className='py-16 md:px-40 px-8 bg-gradient-to-b from-fuchsia-100 to-fuchsia-50'>
      <h2 className='text-3xl font-medium text-gray-800'>Advance with Confidence</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>Learn from leading professionals in every field. Our diverse course library spans technology,creativity and personal development—designed to help you reach your goals efficiently.</p>
      {/* grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] */}
      <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] px-4 md:px-0 md:my-10 my-5 gap-3'>
        {allCourses.slice(0,4).map((course,i)=><CourseCard key={i} course={course}/>)}
      </div>
      <div className='mt-12'>
      <Link to={'/courses-list'} onClick={()=>scrollTo(0,0)} className='text-gray-600 border border-gray-700/30 px-10 py-3 rounded hover:bg-fuchsia-600 hover:text-white hover:transition-all hover:duration-100 '>Show all courses</Link>
      </div>
    </div>
  )
}

export default CoursesSection
