import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';
import { BookOpenCheck, HomeIcon, Plus, UserCheckIcon } from 'lucide-react';

const Sidebar = () => {
  const { isEducator } = useContext(AppContext)
  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: <HomeIcon /> },
    { name: 'Add Course', path: '/educator/add-course', icon:<Plus size={20} className="text-white" /> },
    { name: 'My Courses', path: '/educator/my-courses', icon: <BookOpenCheck size={20} className="text-white" /> },
    { name: 'Student Enrolled', path: '/educator/students-enrolled', icon:<UserCheckIcon size={20} className="text-white" /> },
  ];
  
  return isEducator && (
    <div className="md:w-65 lg:w-72 w-20 min-h-screen text-base py-4 flex flex-col bg-gradient-to-br from-orange-900 via-orange-700 to-orange-500 shadow-lg">
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
                ? 'bg-white/10 text-white/90 border-l-4 border-orange-200' 
                : 'text-orange-100 hover:bg-white/5 hover:border-l-4 hover:border-orange-300/50'
              }
            `}
          >
            <div className="flex items-center justify-center w-8 h-10">
             {item.icon}
            </div>
            <p className="md:block hidden text-sm font-medium">{item.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar