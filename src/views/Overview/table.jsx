/** @format */

import Image from 'next/image'
import searchIcon from '../../../public/searchIcon.svg'
import { useState } from 'react'
import avatar from '../../../public/avatar.svg'

const columns = [
  { id: 'item', label: 'Item Type' },
  { id: 'price', label: 'Price' },
  { id: 'transaction', label: 'Transaction No' },
  { id: 'time', label: 'Time' },
  { id: 'status', label: '' },
]

const Table = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(10)

  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false)
  const [selectedValue, setSelectedValue] = useState('All')

  const toggleDropdown2 = () => {
    setIsDropdownOpen2((prevState) => !prevState)
  }

  const value2 = ['All', 'Reconciled', 'Un-Reconciled', 'Settled', 'Unsettled']

  const generateDummyData = () => {
    const dummyData = []

    for (let i = 1; i <= 20; i++) {
      const status =
        i % 2 === 0 ? 'Pending' : i % 3 === 0 ? 'Un-reconciled' : 'Reconciled'

      const row = {
        id: i,
        item: 'Apple Mac Book 15” 250 SSD 12GB',
        price: '$73430',
        transaction: '1234567890',
        time: '12:30',
        status,
      }

      dummyData.push(row)
    }

    return dummyData
  }

  const data = generateDummyData()

  const filteredData = data.filter((row) => {
    if (selectedValue === 'All') {
      return true
    } else {
      return row.status.toLowerCase() === selectedValue.toLowerCase()
    }
  })

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredData.length / rowsPerPage) - 1)
    )
  }

  return (
    <section className='font-noto'>
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
              className='flex relative items-center border w-32 p-2 justify-between cursor-pointer rounded-sm border-gray-200'>
              <p className='text-xs text-gray-500'>{selectedValue}</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='#1251bf'
                className='w-3 h-4'>
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
      <div className='Table-Body overflow-y-auto'>
        {filteredData && filteredData.length > 0 ? (
          <div>
            <table className='your-table-styles w-full'>
              <thead className='bg-gray-200 p-4'>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      className='text-start text-base font-normal p-4 text-gray-500'>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='bg-white'>
                {filteredData
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((row) => (
                    <tr key={row.id} className='border-b-2'>
                      <td className='inline-flex items-center text-sm '>
                        <Image
                          src={avatar}
                          alt='Image'
                          width={35}
                          height={35}
                          className='mx-4'
                        />
                        {row.item}
                      </td>
                      {columns.slice(1, -1).map((column) => (
                        <td
                          key={column.id}
                          className='text-start text-sm p-4 text-gray-600'>
                          {column.format && typeof row[column.id] === 'number'
                            ? column.format(row[column.id])
                            : row[column.id]}
                        </td>
                      ))}
                      <td className='flex items-center justify-between py-4 text-xs '>
                        <div
                          className={`flex flex-1 items-center gap-2 border-2 rounded-full py-2 px-4 ${
                            row.status === 'Pending'
                              ? 'text-yellow-500'
                              : row.status === 'Reconciled'
                              ? 'text-green-500'
                              : 'text-gray-400'
                          }`}>
                          <span className=' w-3 h-3 inline-block bg-current rounded-full'></span>{' '}
                          {row.status}
                        </div>

                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='#b2b1b1'
                          className='w-6 h-5 cursor-pointer flex-1'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m19.5 8.25-7.5 7.5-7.5-7.5'
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className='pagination flex justify-between my-5'>
              <span className='text-sm'>
                showing 1 to 10 of {filteredData.length} entries
              </span>
              <span className=' flex items-center border-2 rounded-sm text-sm px-1'>
                <button
                  className=' border-r-2 p-1'
                  onClick={handlePrevPage}
                  disabled={page === 0}>
                  Previous
                </button>
                <span className='py-1 px-3 bg-blue-600 text-white'>
                  {page + 1}
                </span>
                <span className='py-1 px-3'>
                  {Math.ceil(filteredData.length / rowsPerPage)}
                </span>
                <button
                  className=' border-l-2 p-1'
                  onClick={handleNextPage}
                  disabled={
                    page === Math.ceil(filteredData.length / rowsPerPage) - 1
                  }>
                  Next
                </button>
              </span>
            </div>
          </div>
        ) : (
          <p className='text-center'>No data available</p>
        )}
      </div>
    </section>
  )
}

export default Table
