/** @format */

import Image from 'next/image'
import logo from '../../../public/logo.svg'
import Link from 'next/link'

const ForgotPasswordForm = () => {
  return (
    <div className='flex h-screen'>
      <div className='hidden md:block flex-1 bg-indigo-500'></div>
      <div className='flex-1 flex items-center justify-center bg-gray-100 px-5'>
        <form className='bg-white p-8 rounded w-full md:w-2/3 border-2 border-gray-200'>
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
              Forgot Password
            </p>
          </div>
          <span className='text-base flex flex-wrap items-center justify-center gap-2 text-gray-600 font-semibold  mb-4'>
            Remembered password?{' '}
            <Link href='login'>
              <p className='text-sm text-indigo-600'>Login here</p>
            </Link>
          </span>

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
          <Link href='login'>
            <button className='w-full bg-indigo-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600'>
              Request password change
            </button>{' '}
          </Link>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
