import React, { useContext } from 'react'
import assets, { dummyEducatorData } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const NavbarEdu = () => {
  const educatorData = dummyEducatorData
  const { user } = useUser()
  const { navigate } = useContext(AppContext)
  return (
    <div className="bg-gradient-to-b from-fuchsia-300 via-fuchsia-300 to-fuchsia-300 w-full">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 w-full">

        <div onClick={() => navigate('/')} className="flex items-center space-x-3">

          <img src={assets.gurukulLogo} alt="Logo" className=" w-9 lg:w-13 cursor-pointer" />
          <span className="hidden md:block md:text-xl lg:text-2xl ml-1 font-semibold text-amber-950 cursor-pointer">Lernix</span>

        </div>


        {/* Right Side - User Info & Actions */}
        <div className="flex items-center space-x-4">


          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-800">
                Hi, {user ? user.fullName : 'Educator'}
              </p>
              <p className="text-xs text-gray-600">
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