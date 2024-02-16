import React from 'react'
import SearchBar from './SearchBar'

function Header() {
  return (
    <div className='flex justify-start my-3 items-center h-12 w-full px-10 '>
      <SearchBar>Search for 100,000 plus games🔍</SearchBar>
    </div>
  )
}

export default Header