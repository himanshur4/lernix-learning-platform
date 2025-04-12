import React, { useContext } from 'react'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { isEducator } = useContext(AppContext)
  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/students-enrolled', icon: assets.person_tick_icon },
  ];
  
  return isEducator && (
    <div className="md:w-65 lg:w-72 w-20 min-h-screen text-base py-4 flex flex-col bg-gradient-to-br from-fuchsia-900 via-fuchsia-700 to-fuchsia-500 shadow-lg">
      <div className="px-4 mb-6">
        <h2 className="text-white font-bold text-xl md:block hidden">Educator Dashboard</h2>
      </div>
      
      <div className="flex flex-col gap-1 px-2">
        {menuItems.map((item) => (
          <NavLink 
            to={item.path} 
            key={item.name} 
            end={item.path === '/educator'} 
            className={({ isActive }) => `
              flex items-center md:flex-row flex-col md:justify-start justify-center 
              py-3 md:px-6 rounded-lg transition-all duration-100 gap-3
              ${isActive 
                ? 'bg-white/10 text-white/90 border-l-4 border-fuchsia-200' 
                : 'text-fuchsia-100 hover:bg-white/5 hover:border-l-4 hover:border-fuchsia-300/50'
              }
            `}
          >
            <div className="flex items-center justify-center w-8 h-10">
              <img src={item.icon} alt="" className="w-5 h-5 brightness-0 invert opacity-90" />
            </div>
            <p className="md:block hidden text-sm font-medium">{item.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar