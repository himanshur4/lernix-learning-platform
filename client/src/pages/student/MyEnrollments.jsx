import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AlertCircle } from 'lucide-react';


const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate, userData, fetchUserEnrolledCourses, backendUrl, getToken, calculateNoOfLectures } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([]);
  
  const getCourseProgress = async () => {
    try {
      const token = await getToken()
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(`${backendUrl}/api/user/get-course-progress`, { courseId: course._id }, { headers: { Authorization: `Bearer ${token}` } })
          let totalLectures = calculateNoOfLectures(course)
          const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
          return { totalLectures, lectureCompleted }
        })
      )
      setProgressArray(tempProgressArray)
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(userData){
      fetchUserEnrolledCourses()
    }
  },[userData])

  useEffect(()=>{
    if(enrolledCourses.length>0){
      getCourseProgress()
    }
  },[enrolledCourses])

  return (
    <div className="flex flex-col min-h-screen">
      <div className='flex-grow px-4 sm:px-6 md:px-12 lg:px-36 pt-6 md:pt-10'>
        <h1 className='text-xl md:text-2xl font-semibold'>My Enrollments</h1>

        {enrolledCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-16 p-6 bg-orange-50 rounded-lg border border-orange-200">
            <AlertCircle size={48} className="text-orange-500 mb-4" />
            <h2 className="text-lg font-medium text-gray-800 mb-2">No Courses Enrolled</h2>
            <p className="text-gray-600 text-center mb-4">You haven't enrolled in any courses yet. Browse our catalog to find courses that interest you.</p>
            <button 
              onClick={() => navigate('/courses')} 
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
            >
              Browse Courses
            </button>
          </div>
        )}

        {/* Desktop/Tablet View */}
        {enrolledCourses.length > 0 && (
          <div className='hidden sm:block w-full overflow-x-auto mt-6 md:mt-10'>
            <table className='min-w-full'>
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold'>Course</th>
                  <th className='px-4 py-3 font-semibold'>Duration</th>
                  <th className='px-4 py-3 font-semibold'>Completed</th>
                  <th className='px-4 py-3 font-semibold'>Status</th>
                </tr>
              </thead>
              <tbody>
                {enrolledCourses.map((course, index) => (
                  <tr key={index} className='border-b border-gray-500/20'>
                    <td className='px-4 py-3'>
                      <div className='flex items-center space-x-3'>
                        <img src={course.courseThumbnail} alt="" className='w-20 md:w-28 object-cover rounded' />
                        <div className='flex-1 min-w-0'>
                          <p className='mb-2 text-sm md:text-base font-medium truncate'>{course.courseTitle}</p>
                          <Line
                            strokeWidth={2}
                            percent={progressArray[index] ? ((progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures) : 0}
                            className='bg-gray-300 rounded-full'
                          />
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-3 text-sm'>
                      {calculateCourseDuration(course)}
                    </td>
                    <td className='px-4 py-3 text-sm'>
                      {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`} <span>Lectures</span>
                    </td>
                    <td className='px-4 py-3'>
                      <button
                        className='px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors cursor-pointer'
                        onClick={() => navigate('/player/' + course._id)}
                      >
                        {progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? 'Completed' : 'Ongoing...'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile View */}
        {enrolledCourses.length > 0 && (
          <div className='sm:hidden mt-4'>
            {enrolledCourses.map((course, index) => (
              <div key={index} className='bg-white rounded-lg shadow-sm mb-4 p-3 border border-gray-200'>
                <div className='flex items-start space-x-3'>
                  <img src={course.courseThumbnail} alt="" className='w-16 object-cover rounded' />
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium mb-1 line-clamp-2'>{course.courseTitle}</p>
                    <div className='flex justify-between text-xs text-gray-600 mb-2'>
                      <span>{calculateCourseDuration(course)}</span>
                      <span>
                        {progressArray[index] && `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`} Lectures
                      </span>
                    </div>
                    <Line
                      strokeWidth={2}
                      percent={progressArray[index] ? ((progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures) : 0}
                      className='bg-gray-300 rounded-full mb-2'
                    />
                    <div className='flex justify-end'>
                      <button
                        className='px-3 py-1.5 bg-orange-600 text-white text-xs rounded-3xl hover:bg-orange-700 hover:transition-all hover:duration-200 cursor-pointer'
                        onClick={() => navigate('/player/' + course._id)}
                      >
                        {progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? 'Completed' : 'Ongoing...'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default MyEnrollments;


































































// import React, { useContext, useEffect, useState } from 'react';
// import { AppContext } from '../../context/AppContext';
// import { Line } from 'rc-progress';
// import Footer from '../../components/student/Footer';
// import axios from 'axios';
// import { toast } from 'react-toastify';


// const MyEnrollments = () => {
//   const { enrolledCourses, calculateCourseDuration, navigate, userData, fetchUserEnrolledCourses, backendUrl, getToken, calculateNoOfLectures } = useContext(AppContext);
//   const [progressArray, setProgressArray] = useState([]);
  
//   const getCourseProgress = async () => {
//     try {
//       const token = await getToken()
//       const tempProgressArray = await Promise.all(
//         enrolledCourses.map(async (course) => {
//           const { data } = await axios.post(`${backendUrl}/api/user/get-course-progress`, { courseId: course._id }, { headers: { Authorization: `Bearer ${token}` } })
//           let totalLectures = calculateNoOfLectures(course)
//           const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
//           return { totalLectures, lectureCompleted }
//         })
//       )
//       setProgressArray(tempProgressArray)
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }
//   useEffect(()=>{
//     if(userData){
//       fetchUserEnrolledCourses()
//     }
//   },[userData])

//   useEffect(()=>{
//     if(enrolledCourses.length>0){
//       getCourseProgress()
//     }
//   },[enrolledCourses])

//   return (
//     <>
//       <div className='px-4 sm:px-6 md:px-12 lg:px-36 pt-6 md:pt-10'>
//         <h1 className='text-xl md:text-2xl font-semibold'>My Enrollments</h1>

//         {/* Desktop/Tablet View */}
//         <div className='hidden sm:block w-full overflow-x-auto mt-6 md:mt-10'>
//           <table className='min-w-full'>
//             <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
//               <tr>
//                 <th className='px-4 py-3 font-semibold'>Course</th>
//                 <th className='px-4 py-3 font-semibold'>Duration</th>
//                 <th className='px-4 py-3 font-semibold'>Completed</th>
//                 <th className='px-4 py-3 font-semibold'>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {enrolledCourses.map((course, index) => (
//                 <tr key={index} className='border-b border-gray-500/20'>
//                   <td className='px-4 py-3'>
//                     <div className='flex items-center space-x-3'>
//                       <img src={course.courseThumbnail} alt="" className='w-20 md:w-28 object-cover rounded' />
//                       <div className='flex-1 min-w-0'>
//                         <p className='mb-2 text-sm md:text-base font-medium truncate'>{course.courseTitle}</p>
//                         <Line
//                           strokeWidth={2}
//                           percent={progressArray[index] ? ((progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures) : 0}
//                           className='bg-gray-300 rounded-full'
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className='px-4 py-3 text-sm'>
//                     {calculateCourseDuration(course)}
//                   </td>
//                   <td className='px-4 py-3 text-sm'>
//                     {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`} <span>Lectures</span>
//                   </td>
//                   <td className='px-4 py-3'>
//                     <button
//                       className='px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors cursor-pointer'
//                       onClick={() => navigate('/player/' + course._id)}
//                     >
//                       {progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? 'Completed' : 'Ongoing...'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile View */}
//         <div className='sm:hidden mt-4'>
//           {enrolledCourses.map((course, index) => (
//             <div key={index} className='bg-white rounded-lg shadow-sm mb-4 p-3 border border-gray-200'>
//               <div className='flex items-start space-x-3'>
//                 <img src={course.courseThumbnail} alt="" className='w-16 object-cover rounded' />
//                 <div className='flex-1 min-w-0'>
//                   <p className='text-sm font-medium mb-1 line-clamp-2'>{course.courseTitle}</p>
//                   <div className='flex justify-between text-xs text-gray-600 mb-2'>
//                     <span>{calculateCourseDuration(course)}</span>
//                     <span>
//                       {progressArray[index] && `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`} Lectures
//                     </span>
//                   </div>
//                   <Line
//                     strokeWidth={2}
//                     percent={progressArray[index] ? ((progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures) : 0}
//                     className='bg-gray-300 rounded-full mb-2'
//                   />
//                   <div className='flex justify-end'>
//                     <button
//                       className='px-3 py-1.5 bg-orange-600 text-white text-xs rounded-3xl hover:bg-orange-700 hover:transition-all hover:duration-200 cursor-pointer'
//                       onClick={() => navigate('/player/' + course._id)}
//                     >
//                       {progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? 'Completed' : 'Ongoing...'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyEnrollments;