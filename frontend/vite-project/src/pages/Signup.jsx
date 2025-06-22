import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
 <div className='flex items-center justify-center flex-col mt-7 font-sans'>
        <h1 className='text-4xl font-bold font-sans'>Welcome to MChat</h1>
        <h2 className='mt-5 text-3xl font-medium'>Get started for free</h2>
     <form className='flex flex-col mt-2 gap-4 w-130 h-auto p-5'>


  <label className='font-medium'>Name</label>
  <input type='text' name='FullName' placeholder='Enter your Full Name' className='rounded bg-gray-200 h-10 p-2 outline-none'/>


  <label className='font-medium'>Email</label>
  <input type='email' name='email' placeholder='Enter your email' className='rounded bg-gray-200 h-10 p-2 outline-none'/>

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


  <label className='font-medium'>Confirm Password</label>
  <div className="relative">
    <input
      type='password'
      placeholder='Confirm your password'
      className='rounded bg-gray-200 h-10 p-2 pr-16 outline-none w-full'
    />
    <span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 font-medium cursor-pointer'>
      Show
    </span>
  </div>

 
  <button type='submit' className='mt-5 rounded-3xl bg-blue-400 font-medium p-2'>
    Sign Up
  </button>
  <span className='text-sm ml-32'>
    Already have an account? <Link to='/login' className='text-purple-600'>Login</Link>
  </span>
</form>

    </div>
  )
}

export default Signup