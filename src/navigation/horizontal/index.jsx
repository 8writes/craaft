/** @format */

import Image from 'next/image'
import notificationBell from '../../../public/bell.svg'
import userImage from '../../../public/user.svg'
import logo from '../../../public/logo.svg'
import searchIcon from '../../../public/searchIcon.svg'
import Link from 'next/link'

const HorizontalNav = () => {
  return (
    <section className='bg-white z-50 flex font-noto text-gray-500 justify-between w-full shadow-lg shadow-slate-300/50 px-7 2xl:px-10 py-3 items-center gap-5'>
      <section className='flex items-center gap-24'>
        <Link href='/'>
          <Image
            src={logo}
            className='Logo'
            alt='TransMonitor Logo'
            width={160}
            height={160}
          />
        </Link>

        <div className='SearchBar flex gap-4'>
          <Image
            src={searchIcon}
            alt='Search icon'
            className=' cursor-pointer'
            width={17}
            height={17}
          />
          <input
            type='text'
            className='outline-none text-base md:text-sm'
            placeholder='Search...'
          />
        </div>
      </section>

      <section className='Mobile Navigation lg:hidden'>
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
      </section>

      <section className='Navigation-Links hidden lg:flex gap-10 items-center'>
        <p className='text-sm cursor-pointer'>Support</p>
        <p className='text-sm cursor-pointer'>FAQ</p>
        <div className='Notification relative flex w-fit cursor-pointer'>
          <span className='bg-blue-700 absolute -top-1 right-0 text-white px-1  rounded-full text-xs'>
            8
          </span>
          <Image
            src={notificationBell}
            alt='Notification bell'
            width={24}
            height={24}
          />
        </div>
        <div className='User flex gap-4'>
          <span className='text-end hidden lg:block'>
            <p className='text-sm'>Hello</p>
            <p className='text-base'>Oluwaleke Ojo</p>
          </span>
          <Image
            src={userImage}
            alt='User Profile Image'
            width={45}
            height={40}
            className='rounded-full cursor-pointer'
          />
        </div>
      </section>
    </section>
  )
}

export default HorizontalNav
