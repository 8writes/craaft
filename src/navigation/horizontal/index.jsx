/** @format */

import Image from 'next/image'
import notificationBell from '../../../public/bell.svg'
import userImage from '../../../public/basic-info.png'
import logo from '../../../public/logo.svg'
import Link from 'next/link'
import VerticalNav from '../vertical'
import { useState, useEffect, useRef } from 'react'
import { toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import LogoutIcon from '@mui/icons-material/Logout'
import { useDataContext } from '@/context/dataContext'
import { Skeleton } from '@mui/material'

const HorizontalNav = () => {
  const session = useDataContext()
  const [isActive, setIsActive] = useState(false)
  const navigationRef = useRef(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const lastName = session?.last_name
  const firstName = session?.first_name

  const firstLetterOfFirstName = firstName ? firstName.slice(0, 1) : ''

  const handleActive = () => {
    setIsActive((prevState) => !prevState)
    setShowDropdown(false)

    const body = document.body
    body.classList.toggle('no-scroll')
  }

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  useEffect(() => {
    const closeNavOnClickOutside = (event) => {
      if (
        (isActive || showDropdown) &&
        navigationRef.current &&
        !navigationRef.current.contains(event.target)
      ) {
        setIsActive(false)
        setShowDropdown(false)
      }
    }

    document.addEventListener('click', closeNavOnClickOutside)

    return () => {
      document.removeEventListener('click', closeNavOnClickOutside)
    }
  }, [isActive, showDropdown])

  const handleLogout = async () => {
    try {
      localStorage.removeItem('auth-token')

      const response = await axios.post(
        'https://craaft.onrender.com/v1/api/signout',
        {
          withCredentials: true,
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
        toast.success('Logged out!', {
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
    }
  }

  return (
    <section
      ref={navigationRef}
      className='fixed bg-white z-50 flex font-noto text-gray-500 justify-between w-full shadow-lg shadow-gray-300/20 px-5 2xl:px-10 py-3 items-center gap-5'>
      <div className='flex items-center gap-5'>
        <div className='Mobile Navigation lg:hidden'>
          <span onClick={handleActive}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>

            <div className='relative'>
              <div
                className={`absolute -left-5 transition-all duration-300 delay-100 ease-linear 
                `}
                style={{
                  left: isActive ? '' : '-500px',
                }}>
                <VerticalNav />
              </div>
            </div>
          </span>
        </div>
        <section className=' justify-between items-center gap-24 hidden md:inline-block'>
          <Link href='overview'>
            <Image
              src={logo}
              className='Logo h-fit'
              alt='TransMonitor Logo'
              width={100}
              height={45}
              loading='lazy'
            />
          </Link>
        </section>
      </div>
      <section className='Navigation-Links flex justify-between gap-10 items-center'>
        <div className='User flex items-center gap-5 relative'>
          <div className='Notification relative flex cursor-pointer'>
            <span className='bg-indigo-600 absolute -top-1 right-0 text-white px-1 rounded-full text-xs'>
              0
            </span>
            <Image
              src={notificationBell}
              alt='Notification bell'
              width={24}
              height={24}
            />
          </div>
          <span className='text-end hidden md:inline-block'>
            {!session ? (
              <Skeleton
                width={50}
                height={35}
                className='md:flex-1'
                animation='wave'
              />
            ) : (
              <p className='text-base font-semibold'>
                {lastName} .{firstLetterOfFirstName}
              </p>
            )}
          </span>
          <div className='relative'>
            <Image
              src={userImage}
              alt='User Profile Image'
              width={45}
              height={35}
              loading='lazy'
              className='rounded-full cursor-pointer bg-indigo-500'
              onClick={handleDropdown}
            />
            {showDropdown && (
              <div className='Dropdown mt-3 right-0 absolute w-48 bg-white border border-gray-200 rounded-b-md shadow-md'>
                <ul className='py-2 text-gray-500 font-semibold'>
                  <Link href='login' onClick={handleLogout}>
                    <li className='flex items-center px-4 py-2 cursor-pointer md:hover:bg-indigo-500 md:hover:text-white'>
                      <LogoutIcon /> Logout
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  )
}

export default HorizontalNav
