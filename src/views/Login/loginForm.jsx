/** @format */

import Image from 'next/image'
import axios from 'axios'
import logo from '../../../public/logo.svg'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isDisabled = !email || !password

  const handleLogin = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const response = await axios.post(
        'https://craftserver.onrender.com/v1/api/login',
        {
          email: email,
          password: password,
        }
      )

      const { error, session } = response.data

      if (error) {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
      } else {
        toast.success('Login Successful!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })

        localStorage.setItem('auth-token', JSON.stringify(session))

        setTimeout(() => {
          router.push('/overview')
        }, 500)
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Invalid Password!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
      } else {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex h-screen'>
      <ToastContainer />
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
              Login to your account
            </p>
          </div>
          <span className='text-base flex flex-wrap items-center justify-center gap-2 text-gray-600 font-semibold  mb-4'>
            Don't have an account?{' '}
            <Link href='register'>
              <p className='text-sm text-indigo-600'>Create Account</p>
            </Link>
          </span>

          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Email
            </label>
            <input
              type='email'
              autoFocus
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete='true'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
                placeholder='Enter your password'
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 text-indigo-500 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <>
            <Link
              href='forgot-password'
              className='text-base font-semibold text-indigo-600 py-4'>
              Forgot Password?
            </Link>
          </>

          <button
            type='submit'
            disabled={isDisabled || isLoading}
            onClick={handleLogin}
            className='w-full bg-indigo-500 text-white mt-4 py-2 px-4 font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600'>
            {isLoading ? 'Redirecting...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
