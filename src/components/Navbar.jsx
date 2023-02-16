import React from 'react'
import Account from '../pages/Account'

const Navbar = () => {
  return (
    <div className='w-screen flex justify-between items-center px-8 py-2 bg-purple-500 top-0 sticky'>
        <div className='text-2xl text-white font-bold hover:cursor-pointer'>Link🔗Shrink</div>
        <Account/>
    </div>
  )
}

export default Navbar