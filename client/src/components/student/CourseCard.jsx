import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext)
  return (
    <Link to={'/course/' + course._id}  className='border border-gray-500/30 pb-6 overflow-hidden rounded-xl shadow-md bg-white transition-transform duration-400  hover:drop-shadow-xl hover:scale-105'>
        <div className="mb-0 rounded-xl w-full aspect-[16/9] md:aspect-[16/9]">
          <img
            className="object-cover w-full h-full rounded-t-lg"
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
                <img key={i} src={i < Math.floor(calculateRating(course)) ? '/rating_star.svg' : '/star_dull_icon.svg'} alt='ratingStar' className='w-3.5 h-3.5' />
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
