import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyCourses = () => {
  const { currency, backendUrl, isEducator, getToken, navigate } = useContext(AppContext)
  const [courses, setCourses] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchEducatorCourses = async () => {
    try {
      setIsLoading(true)
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/courses', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        setCourses(data.courses)
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch courses')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    }
  }, [isEducator])

  const calculateEarnings = (course) => {
    const price = course.coursePrice
    const discount = course.discount
    const studentCount = course.enrolledStudents.length
    return Math.floor(studentCount * (price - (discount * price / 100)))
  }

  if (isLoading) return <Loading />

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-orange-900">My Courses</h1>
        </div>

        {courses && courses.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-orange-100 overflow-hidden">
            <div className="overflow-x-auto">
              {/* Desktop Table View */}
              <table className="w-full hidden md:table">
                <thead>
                  <tr className="bg-orange-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-700">Course</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Earnings</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Students</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Published</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-orange-50 transition-colors duration-150 cursor-pointer" onClick={() => navigate(`/course/${course._id}`)}>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-16 w-24 flex-shrink-0 rounded-md overflow-hidden">
                            <img
                              src={course.courseThumbnail}
                              alt={course.courseTitle}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-800 font-medium line-clamp-2">{course.courseTitle}</span>
                            <span className="text-xs text-gray-500">{course.category || 'Uncategorized'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-700 font-medium">
                        {currency} {calculateEarnings(course)}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        <div className="flex items-center">
                          <span className="bg-orange-100 text-orange-800 py-1 px-2 rounded-full text-xs font-medium">
                            {course.enrolledStudents.length}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm">
                        {new Date(course.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Card Layout */}
              <div className="md:hidden">
                {courses.map((course) => (
                  <div key={course._id} className="cursor-pointer hover:bg-orange-50 p-4 border-b border-gray-300 last:border-b-0" onClick={() => navigate(`/course/${course._id}`)}>
                    <div className="flex flex-col space-y-4">
                      {/* Course Header Info */}
                      <div className="flex items-start space-x-3">
                        <div className="h-16 w-24 flex-shrink-0 rounded-md overflow-hidden">
                          <img
                            src={course.courseThumbnail}
                            alt={course.courseTitle}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <span className="text-gray-800 font-medium line-clamp-2">{course.courseTitle}</span>
                          <span className="text-xs text-gray-500">{course.category || 'Uncategorized'}</span>
                        </div>
                      </div>

                      {/* Course Details */}
                      <div className="flex flex-wrap gap-3">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Earnings</span>
                          <span className="text-gray-700 font-medium">{currency} {calculateEarnings(course)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Students</span>
                          <span className="bg-orange-100 text-orange-800 py-1 px-2 rounded-full text-xs font-medium">
                            {course.enrolledStudents.length}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Published</span>
                          <span className="text-gray-600 text-sm">
                            {new Date(course.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 md:py-16 bg-white rounded-lg border border-orange-100 shadow-sm">
            <div className="flex flex-col items-center px-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">No courses published yet...</h3>
              <p className="text-sm text-gray-500">Once you publish a course, it will appear here.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourses