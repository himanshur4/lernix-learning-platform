import React, { useContext } from 'react'
import assets, { dummyEducatorData } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { BookOpen } from 'lucide-react'

const NavbarEdu = () => {
  const educatorData = dummyEducatorData
  const { user } = useUser()
  const { navigate } = useContext(AppContext)
  return (
    <div className="bg-gradient-to-l from-orange-700 via-orange-500 to-orange-500 w-full">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 w-full">

        <div onClick={() => navigate('/')} className="flex items-center space-x-3 cursor-pointer">
          <div className={`flex items-center justify-center bg-gradient-to-tl from-black to-orange-900 via-orange-900 text-white p-1 rounded-lg shadow-md transition-all duration-300 hover:scale-110`}>
            <BookOpen size={20} className="mr-1" />
            <span className="font-semibold text-lg font-mono">L</span>
          </div>
        </div>


        {/* Right Side - User Info & Actions */}
        <div className="flex items-center space-x-4">


          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-white">
                Hi, {user ? user.fullName : 'Educator'}
              </p>
              <p className="text-xs text-white">
                {educatorData?.title || 'Instructor'}
              </p>
            </div>
            <div>
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarEdu