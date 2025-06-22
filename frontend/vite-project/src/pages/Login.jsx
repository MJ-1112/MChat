import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='flex items-center justify-center flex-col mt-10 font-sans'>
        <h1 className='text-4xl font-bold font-sans'>Welcome to MChat</h1>
        <h2 className='mt-5 text-3xl font-medium'>Login</h2>
        <form className='flex  flex-col mt-10 gap-2  w-130 h-80 p-5' >
            <label className='font-medium'>Email</label>
            <input type='email' name='email'placeholder='Enter you email' className='rounded bg-gray-200 h-10 p-2 outline-none'/>
            <label className='font-medium'>Password</label>
             <div className="relative">
    <input
      type='password'
      name='password'
      placeholder='Enter your password'
      className='rounded bg-gray-200 h-10 p-2 pr-16 outline-none w-full'
    />
    <span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 font-medium cursor-pointer'>
      Show
    </span>
  </div>
            <button type='submit ' className='mt-5 rounded-3xl bg-blue-400 font-medium p-2'>Log in</button>
            <span className='ml-33'>Don't have an account?<Link to='/signup' className='text-purple-600'>Signup</Link></span>
        </form>
    </div>
  )
}

export default Login