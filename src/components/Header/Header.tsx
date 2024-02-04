import React from 'react'
import SearchBar from './SearchBar'
import reactLogo from '../../assets/react.svg'

function Header() {
  return (
    <div className='flex justify-center items-center h-12 w-full px-10'>
      <img src={reactLogo} className="logo react" alt="React logo" />      
      <SearchBar>🔍Search for 100,000 plus games</SearchBar>
    </div>
  )
}

export default Header