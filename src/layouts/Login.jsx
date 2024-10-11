import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Lognav from '../components/Lognav'

function Login() {
  return (
    <div className='bg-black  md:bg-[url(/public/assets/images/loginbg.jpg)] object-cover object-center h-[100vh] md:h-[100vh]'>
        <div className='container mx-auto py-5 pb-12 h-full'>
            <div className='absolute  inset-0 overlay bg-black opacity-60 h-[90vh]'></div>
            <Lognav />
            <Outlet />
        </div>
    </div>
  )
}

export default Login
