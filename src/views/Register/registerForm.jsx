/** @format */

import Image from 'next/image'
import logo from '../../../public/logo.svg'
import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [password, setPassword] = useState('')
  const [storeName, setStoreName] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordChange = (e) => {
    const value = e.target.value

    const hasSpecialCharacters = /[!@#$%^&*()_+{}\[\]:<>,.?~\\]/.test(value)
    setPassword(value)
    if (value.length >= 6 && hasSpecialCharacters) {
      setPasswordError('')
    } else {
      setPasswordError(
        'Password must be at least 6 characters long and contain special characters.'
      )
    }
  }

  const isDisabled = !email || !password

  const handleRegister = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const response = await axios.post(
        'https://craaft.onrender.com/v1/api/signup',
        {
          withCredentials: true,
          email,
          password,
          firstName,
          lastName,
          storeName,
          tel,
        }
      )

      const { error } = response.data

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
        toast.success('Account Created Successfully!', {
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

        setTimeout(() => {
          router.push('/login')
        }, 700)
      }
    } catch (error) {
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex'>
      <ToastContainer />
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
              disabled={isLoading}
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='Enter your first name'
            />
          </div>{' '}
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Last Name
            </label>
            <input
              disabled={isLoading}
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='Enter your last name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Email
            </label>
            <input
              disabled={isLoading}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Phone Number
            </label>
            <input
              disabled={isLoading}
              type='tel'
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='9025654580'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Store Name
            </label>
            <input
              disabled={isLoading}
              type='text'
              value={storeName}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/[^a-zA-Z]/g, '')
                setStoreName(inputValue.toLowerCase())
              }}
              className='w-full lowercase px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
              placeholder='Enter your store name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-base py-2 font-semibold text-gray-600'>
              Password
            </label>
            <div className='relative'>
              <input
                disabled={isLoading}
                type={showPassword ? 'text' : 'password'}
                autoComplete='true'
                value={password}
                onChange={handlePasswordChange}
                className='w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500'
                placeholder='Enter your password'
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 text-indigo-500 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && (
              <p className='mt-5 font-semibold text-sm text-red-500'>
                {passwordError}
              </p>
            )}
          </div>
          <button
            type='submit'
            disabled={isDisabled || isLoading}
            onClick={handleRegister}
            className='w-full bg-indigo-500 text-white mt-4 py-2 px-4 font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600'>
            {isLoading ? 'Redirecting...' : 'Create Account'}
          </button>
          <p className='mt-5 font-semibold text-sm text-gray-500 text-center'>
            By clicking "Create Account" I agree to the{' '}
            <Link href='#' className='text-indigo-500'>
              terms and conditions.
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
