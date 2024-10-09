import React from 'react'
import { Link } from 'react-router-dom'

function Lognav() {
  return (
      <nav className='absolute left-0 flex w-[80%] right-0 z-20 mx-auto justify-between'>
          <Link to={'/login'}> 
              <img src="/assets/images/logo.png" className="h-[40px]" alt="" />
          </Link>
          <div className='flex gap-2 items-center'>
              <select
                  name=""
                  className='bg-transparent text-white py-1 px-5 border-[1px] border-white rounded border-opacity-50 outline-none'
                  style={{ color: 'white' }}>
                  <option value="" className='text-black'>English</option>
                  <option value="" className='text-black'>Russian</option>
              </select>
          </div>
      </nav>
  )
}

export default Lognav
