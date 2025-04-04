import React, { useContext } from 'react'
import assets from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext';
const Navbar = () => {
    const {navigate,isEducator} =useContext(AppContext)

    const isCourseListPage = location.pathname.includes('/course-list');

    const { openSignIn } = useClerk()
    const { user } = useUser()
    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-1 border-gray-500 border-l-0 border-r-0 py-4 ${isCourseListPage ? 'bg-white' : 'bg-fuchsia-200'}`}>
            <img onClick={()=>navigate('/')} src={assets.gurukulLogo} alt="Logo" className=" w-9 lg:w-13 cursor-pointer" />
            <div className='hidden md:flex items-center gap-5 text-gray-800'>
                <div className='flex items-center gap-5'>
                    {user && <>
                        <button className='cursor-pointer' onClick={()=>{navigate('/educator ')}}>{isEducator?'Educator dashboard':'Become Educator'}</button>|
                        <Link to='/my-enrollments'>My Enrollments</Link>
                    </>}
                </div>
                {user ? <UserButton /> : <button onClick={() => openSignIn()} className='bg-fuchsia-950 text-white px-5 py-2 rounded-2xl cursor-pointer'>Create Account</button>}
            </div>
            {/* for phone screen */}
            <div className='md:hidden flex items-center gap-2 sm:gap-5 text-sm text-gray-700'>
                <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
                    {user &&
                        <>
                            <button className='cursor-pointer' onClick={()=>{navigate('/educator')}}>{isEducator?'Educator dashboard':'Become Educator'}</button>|
                            <Link to='/my-enrollments'>My Enrollments</Link>
                        </>
                    }
                </div>
                {user ? <UserButton /> : <button onClick={()=>openSignIn()}>
                    <img src={assets.user_icon} alt="loginIcon" />
                </button>}

            </div>

        </div>
    )
}

export default Navbar
