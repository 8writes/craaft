/** @format */

import Image from 'next/image'
import notificationBell from '../../../public/bell.svg'
import userImage from '../../../public/user.svg'
import logo from '../../../public/logo.svg'
import Link from 'next/link'
import VerticalNav from '../vertical'
import { useState, useEffect, useRef } from 'react'

const HorizontalNav = () => {
  const [isActive, setIsActive] = useState(false)
  const navigationRef = useRef(null)

  const handleActive = () => {
    setIsActive((prevState) => !prevState)

    const body = document.body
    body.classList.toggle('no-scroll')
  }

  useEffect(() => {
    const closeNavOnClickOutside = (event) => {
      if (
        isActive &&
        navigationRef.current &&
        !navigationRef.current.contains(event.target)
      ) {
        setIsActive(false)
      }
    }

    document.addEventListener('click', closeNavOnClickOutside)

    return () => {
      document.removeEventListener('click', closeNavOnClickOutside)
    }
  }, [isActive])

  return (
    <section className='fixed bg-white z-50 flex font-noto text-gray-500 justify-between w-full shadow-lg shadow-slate-300/50 px-5 2xl:px-10 py-3 items-center gap-5'>
      <div className='flex items-center gap-5'>
        <span className='Mobile Navigation lg:hidden' onClick={handleActive}>
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
              className={`absolute -left-5 w-screen transition-all ease-in-out ${
                isActive ? '' : ' -left-96'
              }`}>
              <VerticalNav />
            </div>
          </div>
        </span>
        <section
          ref={navigationRef}
          className=' justify-between items-center gap-24 hidden md:inline-block'>
          <Link href='/'>
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
        <div className='User flex items-center gap-5'>
          <div className='Notification relative flex cursor-pointer'>
            <span className='bg-blue-700 absolute -top-1 right-0 text-white px-1 rounded-full text-xs'>
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
            <p className='text-base'>Ozoemena E.</p>
          </span>
          <Image
            src={userImage}
            alt='User Profile Image'
            width={45}
            height={35}
            loading='lazy'
            className='rounded-full cursor-pointer'
          />
        </div>
      </section>
    </section>
  )
}

export default HorizontalNav
