import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import assets from '../../assets/assets'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext)
  return (
  
      <Link to={'/course/' + course._id} onClick={() => scrollTo(0, 0,)} className='border border-gray-500/30 pb-6 overflow-hidden rounded-3xl shadow-md bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-105'>
        <div className="mb-0 rounded-2xl w-full aspect-[4/3] md:aspect-[16/9]">
          <img
            className="object-cover w-full h-full rounded-"
            src={course.courseThumbnail}
            alt="Course Thumbnail"
          />
        </div>
        <div className='p-3 text-left '>
          <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
          <p className='text-gray-500'>{course.educator.name}</p>
          <div className='flex items-center space-x-2'>
            <p>{calculateRating(course)}</p>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt='ratingStar' className='w-3.5 h-3.5' />
              ))}
            </div>
            <p className='text-gray-500'>{course.courseRatings.length}</p>
          </div>
          <p className='text-base font-semibold text-gray-800'>{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
        </div>
      </Link>
  
  )
}

export default CourseCard
