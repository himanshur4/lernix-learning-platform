import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer'
import YouTube from 'react-youtube'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BookOpenTextIcon, ChevronDownIcon, Clock3Icon, PlayCircle } from 'lucide-react'
const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null)

  const { allCourses, calculateRating, calculateNoOfLectures, calculateCourseDuration, calculateChapterTime, backendUrl, userData, getToken } = useContext(AppContext)
  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/course/' + id)
      if (data.success) {
        setCourseData(data.courseData)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.warn('Login to Enroll')
      }
      if(isOwncourse){
        return toast.warn('You cannot enroll in your own course')
      }
      if (isAlreadyEnrolled) {
        return toast.warn('Already Enrolled')
      }
      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/user/purchase', { courseId: courseData._id }, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        const { session_url } = data
        window.location.replace(session_url)
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }
  const isOwncourse = userData && courseData && userData._id === courseData.educator._id
  useEffect(() => {
    fetchCourseData()
  }, [])
  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
    }
  }, [userData, courseData])
  const toggleSection = (index) => {
    setOpenSections((prev) => (
      {
        ...prev,
        [index]: !prev[index],
      }
    ))
  }
  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left shaadow-lg rounded-2xl'>
        <div className='absolute top-0 left-0 w-full h-[500px] '></div>
        {/*left Column  */}
        <div className='max-w-xl z-10 text-gray-700'>
          <h1 className='text-[26px] md:text-[36px] lg:text-[44px] font-semibold text-gray-900'>{courseData.courseTitle}</h1>
          <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}></p>
          {/* review and ratings */}
          <div className='flex items-center space-x-2 pt-2 pb-1 text-sm'>
            <p>{calculateRating(courseData)}</p>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(calculateRating(courseData)) ? '/rating_star.svg' : '/star_dull_icon.svg'} alt='ratingStar' className='w-3.5 h-3.5' />
              ))}
            </div>
            <p className='text-orange-600'>({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>

            <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>

          </div>
          <p className='text-sm'>Course by <span className='text-orange-600 underline'>{courseData.educator.name}</span></p>
          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold '>Course structure</h2>
            <div className='pt-5'>
              {courseData.courseContent.map((chapter, index) => {
                return (
                  <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                    <div onClick={() => toggleSection(index)} className='flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-100 transition-colors duration-200'>
                      <div className='flex items-center gap-2'>
                        <ChevronDownIcon size={20} className={`text-gray-500 transition-transform ${openSections[index] ? 'rotate-180' : ''}`} />
                        <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                      </div>
                      <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>

                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-700 border-t border-gray-300'>

                        {chapter.chapterContent.map((lecture, i) => (
                          <li key={i} className='flex items-start gap-2 py-1'>
                            <PlayCircle size={17} className='text-gray-500' />
                            <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                              <p>
                                {lecture.lectureTitle}
                              </p>
                              <div className='flex gap-2'>
                                {lecture.isPreviewFree && <p onClick={() => setPlayerData({
                                  videoId: lecture.lectureUrl.split('/').pop()

                                })}
                                  className='text-orange-500 cursor-pointer'>Preview</p>}
                                <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                              </div>
                            </div>
                          </li>
                        ))}

                      </ul>
                    </div>
                  </div>)
              })}
            </div>
          </div>

          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
            <p className='pt-3 rich-text text-gray-900' dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></p>
          </div>

        </div>


        {/* right column */}
        <div className='max-w-[424px] z-10 shadow-[0px,4px,15px,2px rgba(0,0,0,0.1)] rounded-4xl overflow-hidden bg-white shadow-xl min-w-[300px] sm:min-w-[420px] transition-transform duration-500 hover:-translate-y-1 hover:drop-shadow-xl cursor-pointer mb-10'>
          {
            playerData ?
              <YouTube videoId={playerData.videoId} opts={{ playerVars: { autoplay: 1 } }} iframeClassName='w-full aspect-video' />
              :
              <img src={courseData.courseThumbnail} alt="" />

          }

          <div className='p-5'>
            <div className='flex items-center gap-2'>
              <Clock3Icon size={20} className='text-gray-500' />
              {/* <img className='w-3.5' src={assets.time_left_clock_icon} alt="time left clock icon" /> */}
              <p className='text-red-500' ><span className='font-medium' >5 days</span> left at this price!</p>
            </div>
            <div className='flex gap-3 items-center pt-2'>
              <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>
                ${(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}
              </p>
              <p className='md:text-lg text-gray-500 line-through'>
                ${courseData.coursePrice}
              </p>
              <p className='md:text-lg text-gray-500 '>
                {courseData.discount}% off
              </p>
            </div>
            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">

              <div className='flex items-center gap-1' >

                <img src="/rating_star.svg" alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className='h-4 w-px bg-gray-500/40'>
              </div>                <div className='flex items-center gap-1' >
                <Clock3Icon size={16} className='text-gray-500' />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className='h-4 w-px bg-gray-500/40'>
              </div>
              <div className='flex items-center gap-1' >
                <BookOpenTextIcon size={16} className='text-gray-500' />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>

            </div>
            <button onClick={enrollCourse} className='md:mt-6 mt-4 w-full py-3  bg-orange-600 rounded-2xl text-white font-medium hover:transition-all hover:duration-200 cursor-pointer hover:bg-orange-700'>{isOwncourse?'Your Own Course':isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>
            <div className='pt-6' >
              <p className='md:text-xl text-lg font-medium text-gray-800' >What's in the course?</p>
              <ul className='ml-4 pt-2 text-sm md:text-default list-disc text-gray-700' >
                <li>Lifetime access with free updates.</li>
                <li>
                  Step-by-step, hands-on project guidance.
                </li>
                <li>
                  Downloadable resources and source code.
                </li>
                <li>
                  Quizzes to test your knowledge.
                </li>
                <li>
                  Certificate of completion.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  ) : <Loading />
}

export default CourseDetails
