/** @format */

import Image from 'next/image'
import logo from '../../../public/logo.svg'
import Link from 'next/link'

const RegisterForm = () => {
  return (
    <div className='flex'>
      <div className='hidden md:block flex-1 bg-indigo-500'></div>
      <div className='flex-1 flex items-center justify-center bg-gray-100 px-5'>
        <form className='bg-white p-8 rounded w-full my-20 md:w-2/3 border-2 border-gray-200'>
          <div className='grid gap-5 justify-center'>
            <Image
              src={logo}
              className='Logo h-fit mx-auto'
              alt='TransMonitor Logo'
              width={100}
              height={45}
              loading='lazy'
            />
            <p className='text-2xl text-center text-indigo-500 font-semibold mb-4'>
              Create an account
            </p>
          </div>
          <span className='text-base flex flex-wrap items-center justify-center gap-2 text-gray-600 font-semibold  mb-4'>
            Already a member?{' '}
            <Link href='login'>
              <p className='text-sm text-indigo-600'>Login</p>
            </Link>
          </span>
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              First Name
            </label>
            <input
              type='text'
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='Enter your first name'
            />
          </div>{' '}
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Last Name
            </label>
            <input
              type='text'
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='Enter your last name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Email
            </label>
            <input
              type='email'
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Phone Number
            </label>
            <input
              type='tel'
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='9025654580'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Store Name
            </label>
            <input
              type='text'
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='Enter your store name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-base py-2  font-semibold text-gray-600'>
              Password
            </label>
            <input
              type='password'
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='Enter your password'
            />
          </div>
          <Link href='login'>
            <button className='w-full bg-indigo-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600'>
              Create account
            </button>{' '}
          </Link>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
