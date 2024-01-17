/** @format */

import Image from 'next/image'
import searchIcon from '../../../public/searchIcon.svg'
import { useState } from 'react'



const Table = () => {
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false)
  const [selectedValue, setSelectedValue] = useState('All')

  const toggleDropdown2 = () => {
    setIsDropdownOpen2((prevState) => !prevState)
  }

  const value2 = ['All', 'Reconciled', 'Un Reconciled', 'Settled', 'Unsettled']

  return (
    <section>
      <div className='Table-Header my-5 px-1'>
        <p className='text-3xl'>Payments</p>
        <div className='flex my-5 justify-between items-center'>
          <div className='flex gap-4 text-sm'>
            Showing{' '}
            <span className='flex cursor-pointer relative items-center gap-1 text-blue-500'>
              20
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='#3975dc'
                className='w-3 h-3'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m19.5 8.25-7.5 7.5-7.5-7.5'
                />
              </svg>
            </span>
            out of 500 payments
          </div>
          <span className='flex w-1/3 gap-2 border-b border-gray-500 '>
            <Image
              src={searchIcon}
              alt='Search icon'
              className=' cursor-pointer'
              width={15}
              height={15}
            />
            <input
              type='text'
              className='outline-none bg-transparent w-full text-base md:text-sm'
              placeholder='Search payments'
            />
          </span>
          <div className='flex gap-2 items-center'>
            <p className='text-sm'>show</p>
            <span
              onClick={toggleDropdown2}
              className='flex relative items-center border p-2 gap-20 cursor-pointer rounded-sm border-gray-200'>
              <p className='text-xs text-gray-500'>{selectedValue}</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='#2b57a3'
                className='w-3 h-3'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m19.5 8.25-7.5 7.5-7.5-7.5'
                />
              </svg>
              {isDropdownOpen2 && (
                <div className='absolute left-0 right-0 top-8 rounded-b-md w-full shadow-md bg-white'>
                  {value2.map((value, index) => (
                    <p
                      onClick={() => setSelectedValue(value)}
                      key={index}
                      className={` px-3 py-2 text-black text-xs hover:bg-gray-100 ${
                        value === selectedValue ? 'bg-gray-100' : ''
                      }`}>
                      {value}
                    </p>
                  ))}
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className='Table-Body'></div>
    </section>
  )
}

export default Table
