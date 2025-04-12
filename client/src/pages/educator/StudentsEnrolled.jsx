import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../components/student/Loading'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const StudentsEnrolled = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext)
  const [enrolledStudents, setEnrolledStudents] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchEnrolledStudents = async () => {
    try {
      setIsLoading(true)
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students', { 
        headers: { Authorization: `Bearer ${token}` } 
      })

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isEducator) { 
      fetchEnrolledStudents() 
    }
  }, [isEducator])

  if (isLoading) return <Loading />

  return enrolledStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-3 pt-6 pb-0 bg-gradient-to-b from-fuchsia-100'>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-2 mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-fuchsia-900">Students Enrolled</h1>
          <p className="text-sm md:text-base text-fuchsia-700">View all students enrolled in your courses</p>
        </div>
        
        <div className="bg-white p-3 md:p-6 rounded-xl shadow-md border-t-4 border-fuchsia-600">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-fuchsia-900">Enrollment List</h2>
            <span className="px-3 py-1 text-xs bg-fuchsia-100 text-fuchsia-700 rounded-full font-medium w-fit">
              {enrolledStudents.length} Students
            </span>
          </div>
          
          {enrolledStudents.length > 0 ? (
            <div className='w-full overflow-x-auto'>
              <div className='min-w-full rounded-lg bg-white border border-fuchsia-100'>
                <table className='w-full'>
                  <thead className="text-fuchsia-900 bg-fuchsia-50 text-xs md:text-sm text-left">
                    <tr>
                      <th className='px-2 md:px-6 py-3 md:py-4 font-semibold text-center hidden sm:table-cell'>#</th>
                      <th className="px-2 md:px-6 py-3 md:py-4 font-semibold">Student</th>
                      <th className="px-2 md:px-6 py-3 md:py-4 font-semibold">Course</th>
                      <th className="px-2 md:px-6 py-3 md:py-4 font-semibold hidden sm:table-cell">Enrolled</th>
                    </tr>
                  </thead>
                  <tbody className='text-xs md:text-sm divide-y divide-fuchsia-100'>
                    {enrolledStudents.map((item, index) => (
                      <tr key={index} className='hover:bg-fuchsia-50 transition-all duration-200'>
                        <td className="px-2 md:px-6 py-3 md:py-4 text-center hidden sm:table-cell text-fuchsia-700">{index + 1}</td>
                        <td className='px-2 md:px-6 py-3 md:py-4 flex items-center gap-2 md:gap-3'>
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-fuchsia-200 flex-shrink-0">
                            <img 
                              src={item.student.imageUrl} 
                              alt={`${item.student.name}'s profile`} 
                              className='w-full h-full object-cover' 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/40?text=User';
                              }}
                            />
                          </div>
                          <span className='font-medium text-fuchsia-900 truncate max-w-16 sm:max-w-32 md:max-w-40'>
                            {item.student.name}
                          </span>
                        </td>
                        <td className='px-2 md:px-6 py-3 md:py-4 text-fuchsia-700 truncate max-w-16 sm:max-w-32 md:max-w-40'>{item.courseTitle}</td>
                        <td className='px-2 md:px-6 py-3 md:py-4 hidden sm:table-cell text-fuchsia-700 whitespace-nowrap'>
                          {new Date(item.purchaseDate).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-fuchsia-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#9333EA"/>
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-medium text-fuchsia-900">No students enrolled yet</h3>
              <p className="text-sm md:text-base text-fuchsia-600 mt-2 max-w-md">
                When students enroll in your courses, they will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default StudentsEnrolled