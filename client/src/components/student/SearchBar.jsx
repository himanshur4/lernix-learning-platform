import React, { useState } from 'react'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
const SearchBar = ({ data }) => {
  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : '')

  const onSearchHandler = (e) => {
    e.preventDefault()
    navigate('/courses-list/' + input)
  }

  return (
    <><div className='flex justify-center w-full'>
      <form onSubmit={onSearchHandler} className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-900/30 rounded-3xl transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-xl'>
        <img src={assets.search_icon} alt="searchIcon" className="md:w-auto w-10 px-3" />
        <input type="text" onChange={e => setInput(e.target.value)} placeholder="Search for courses" value={input} className='w-full h-full outline-none text-gray-700/95 hover:focus' />
        <button type='submit' className='bg-orange-600 rounded-3xl text-white md:px-10 px-7 md:py-3 py-2 mx-1 cursor-pointer transition-transform duration-300 hover:-translate-x-1  hover:shadow-2xl hover:scale-110'>Search</button>
      </form>
      
    </div>
    </>
  )
}

export default SearchBar
