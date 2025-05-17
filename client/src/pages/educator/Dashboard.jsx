import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import assets from '../../assets/assets'
import Loading from '../../components/student/Loading'
import { toast } from 'react-toastify'
import axios from 'axios'

const Dashboard = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        setDashboardData(data.dashboardData)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) { fetchDashboardData() }
  }, [isEducator])

  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-4 md:gap-8 md:p-8 md:pb-0 p-3 pt-6 pb-6'>
      <div className="w-full space-y-4 md:space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-orange-900">Dashboard</h1>
          <p className="text-sm md:text-base text-orange-700">Welcome back to your educator dashboard!</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5'>
          <div className="flex items-center gap-3 md:gap-4 bg-white p-4 md:p-5 w-full rounded-xl shadow-md border-l-4 border-orange-600 transition-all duration-300 hover:shadow-lg">
            <img
              src={assets.patients_icon}
              alt="Students icon"
              className="w-6 h-6 md:w-8 md:h-8"
            />
            <div>
              <p className="text-xl md:text-2xl font-semibold text-orange-900">{dashboardData.enrolledStudentsData.length}</p>
              <p className='text-xs md:text-sm text-orange-700'>Total Enrollments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 bg-white p-4 md:p-5 w-full rounded-xl shadow-md border-l-4 border-orange-600 transition-all duration-300 hover:shadow-lg">
            <img
              src={assets.appointments_icon}
              alt="Courses icon"
              className="w-6 h-6 md:w-8 md:h-8"
            />
            <div>
              <p className="text-xl md:text-2xl font-semibold text-orange-900">{dashboardData.totalCourses}</p>
              <p className='text-xs md:text-sm text-orange-700'>Total Courses</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 bg-white p-4 md:p-5 w-full rounded-xl shadow-md border-l-4 border-orange-600 transition-all duration-300 hover:shadow-lg">
            <img
              src={assets.earning_icon}
              alt="Earnings icon"
              className="w-6 h-6 md:w-8 md:h-9 rounded-full"
            />
            <div>
              <p className="text-xl md:text-2xl font-semibold text-orange-900">{currency} {dashboardData.totalEarnings.toFixed(2)}</p>
              <p className='text-xs md:text-sm text-orange-700'>Total Earnings</p>
            </div>
          </div>
        </div>

        <div className='bg-white p-3 md:p-6 rounded-xl shadow-md border-t-4 border-orange-600'>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-orange-900">Latest Enrollments</h2>
            <span className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full font-medium w-fit">
              {dashboardData.enrolledStudentsData.length} Students
            </span>
          </div>

          <div className='w-full overflow-x-auto'>
            <div className='min-w-full rounded-lg bg-white border border-orange-100'>
              <table className='w-full'>
                <thead className="text-orange-900 bg-orange-50 text-xs md:text-sm text-left">
                  <tr>
                    <th className="px-2 md:px-6 py-3 md:py-4 font-semibold text-center hidden sm:table-cell">#</th>
                    <th className="px-2 md:px-6 py-3 md:py-4 font-semibold">Student</th>
                    <th className="px-2 md:px-6 py-3 md:py-4 font-semibold">Course</th>
                  </tr>
                </thead>
                <tbody className='text-xs md:text-sm divide-y divide-orange-100'>
                  {dashboardData.enrolledStudentsData.map((item, index) => (
                    <tr key={index} className='hover:bg-orange-50 transition-colors duration-200'>
                      <td className='px-2 md:px-6 py-3 md:py-4 text-center hidden sm:table-cell text-orange-700'>{index + 1}</td>
                      <td className='px-2 md:px-6 py-3 md:py-4 flex items-center gap-2 md:gap-3'>
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-orange-200 flex-shrink-0">
                          <img 
                            src={item.student.imageUrl} 
                            alt="Profile" 
                            className='w-full h-full object-cover'
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/40?text=User';
                            }}
                          />
                        </div>
                        <span className='font-medium text-orange-900 truncate max-w-16 sm:max-w-32 md:max-w-40'>
                          {item.student.name}
                        </span>
                      </td>
                      <td className="px-2 md:px-6 py-3 md:py-4 text-orange-700 truncate max-w-16 sm:max-w-32 md:max-w-40">{item.courseTitle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {dashboardData.enrolledStudentsData.length === 0 && (
            <div className="text-center py-6 md:py-8 text-orange-700 text-sm md:text-base">
              No enrollments found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default Dashboard