import { useContext } from 'react'

import { BookOpen } from "lucide-react";

import assets from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Navbar = () => {

    const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext)

    const isCourseListPage = location.pathname.includes('/course-list');
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const becomeEducator = async () => {
        try {
            if (isEducator) {
                navigate('/educator')
                return;
            }
            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/educator/update-role', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (data.success) {
                setIsEducator(true)
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-25 py-4 `}>
            <div onClick={() => navigate('/')} className="flex items-center space-x-3 cursor-pointer">
                <div className={`flex items-center justify-center bg-gradient-to-tl from-black to-orange-900 via-orange-900 text-white p-1 rounded-lg shadow-md transition-all duration-300 hover:scale-115 md:hover:scale-125 md:mt-3 md:scale-115 `}>
                    <BookOpen size={20} className="mr-1" />
                    <span className="font-semibold text-lg font-mono">L</span>
                </div>
            </div>

            <div className='hidden md:flex items-center gap-4 text-white'>
                <div className='flex items-center gap-3 '>
                    {user && <>
                        <button className='cursor-pointer bg-orange-600 p-2 rounded-3xl  transition-transform duration-300 hover:-translate-x-1 hover:drop-shadow-2xl hover:scale-115' onClick={becomeEducator}>{isEducator ? 'Educator dashboard' : 'Become Educator'}</button>
                        <Link to='/my-enrollments' className='cursor-pointer bg-orange-600 p-2 rounded-3xl transition-transform duration-300 hover:-translate-x-1 hover:drop-shadow-2xl hover:scale-115 '>My Enrollments</Link>
                    </>}
                </div>
                {user ? <UserButton /> : <button onClick={() => openSignIn()} className='bg-gradient-to-br from-orange-950 to-orange-800 text-white px-5 py-2 rounded-2xl cursor-pointer transition-transform duration-300 hover:-translate-x-2 hover:shadow-2xl hover:scale-110'>Create Account</button>}
            </div>
            {/* for phone screen */}
            <div className='md:hidden flex items-center gap-2 sm:gap-5 text-sm text-white/90'>
                <div className='flex items-center sm:gap-0.5 max-sm:text-xs'>
                    {user &&
                        <>
                            <button className='cursor-pointer bg-orange-600 p-1 rounded-3xl transition-transform duration-300 hover:-translate-x-1 hover:drop-shadow-2xl hover:scale-115' onClick={becomeEducator}>{isEducator ? 'Educator dashboard' : 'Become Educator'}</button>
                            <Link to='/my-enrollments' className='cursor-pointer bg-orange-600 p-1 rounded-3xl transition-transform duration-300 hover:-translate-x-0.5 hover:drop-shadow-2xl hover:scale-115 ml-2'>My Enrollments</Link>
                        </>
                    }
                </div>
                {user ? <UserButton /> : <button onClick={() => openSignIn()} className='flex-col justify-center items-center'>
                    <img src={assets.user_icon} alt="loginIcon" className='cursor-pointer hover:scale-115 ml-2.5' />
                    <span className='text-black font-mono font-semibold text-xs'>Sign Up</span>
                </button>}

            </div>

        </div>
    )
}

export default Navbar
