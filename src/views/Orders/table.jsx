/** @format */

import Image from 'next/image'
import searchIcon from '../../../public/searchIcon.svg'
import { useState, useMemo } from 'react'
import avatar from '../../../public/avatar.svg'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const columns = [
  { id: 'sn', label: 'S/N' },
  { id: 'image', label: 'Preview' },
  { id: 'item', label: 'Product' },
  { id: 'email', label: 'Email' },
  { id: 'reference_id', label: 'Reference Id' },
  { id: 'date', label: 'Date' },
  {
    id: 'price',
    label: 'Price(₦)',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'status', label: 'Status' },
  { id: 'action', label: '' },
]

const Table = () => {
  const [page, setPage] = useState(0)
  const rowsPerPage = useMemo(() => 10, [])

  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false)
  const [selectedValue, setSelectedValue] = useState('All')

  const toggleDropdown2 = () => {
    setIsDropdownOpen2((prevState) => !prevState)
  }

  const value2 = ['All', 'Delivered', 'Pending', 'Refunded' ]

  const generateDummyData = () => {
    const dummyData = []

    for (let i = 1; i <= 20; i++) {
      const status =
        i % 2 === 0 ? 'Pending' : i % 3 === 0 ? 'Refunded' : 'Shipped'

      const row = {
        sn: i,
        item: 'Apple MacBook ',
        reference_id: 84375393324,
        email: 'mailemmanuel00@gmail.com',
        date: '2022-02-01',
        price: 73430,
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
      <div className='Table-Header px-1'>
        <p className='text-2xl md:text-3xl font-semibold text-gray-600'>
          Orders
        </p>
        <div className='flex my-5 gap-2 justify-between items-center'>
          <span className='flex justify-end w-full md:w-1/3 gap-2 border-b border-gray-500 '>
            <input
              type='text'
              className='outline-none bg-transparent w-full text-base md:text-sm'
              placeholder='Search reference id'
            />{' '}
            <Image
              src={searchIcon}
              alt='Search icon'
              className=' cursor-pointer'
              width={19}
              height={19}
            />
          </span>
          <div className='flex gap-2 items-center'>
            <p className='text-sm text-gray-700 text-end justify-end w-1/2 md:w-1/3 '>
              Filter by
            </p>
            <span
              role='button'
              onClick={toggleDropdown2}
              className='flex relative items-center border w-44 md:w-32 p-2 justify-between cursor-pointer rounded-sm border-gray-200'>
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
                <div className='absolute z-20 left-0 right-0 top-8 rounded-b-md w-full shadow-md bg-white'>
                  {value2.map((value, index) => (
                    <p
                      role='button'
                      onClick={() => setSelectedValue(value)}
                      key={index.id}
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
      <div className='Table-Body'>
        {filteredData && filteredData.length > 0 ? (
          <div>
            <div className='overflow-x-auto'>
              <table className='your-table-styles table-auto w-full'>
                <thead className='bg-indigo-500 p-4'>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.id}
                        className='text-start text-base font-normal p-4 text-white'>
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='bg-gray-100'>
                  {filteredData
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row) => (
                      <tr key={row.sn} className='border-b-2'>
                        {columns.slice(0, -2).map((column) => {
                          if (column.id === 'image') {
                            return (
                              <td
                                key={column.id}
                                className='text-start text-sm p-4 text-gray-600 flex items-center'>
                                <div>
                                  <Image
                                    src={avatar}
                                    alt='Product Image'
                                    width={40}
                                    height={40}
                                  />
                                </div>
                              </td>
                            )
                          } else if (column.id === 'item') {
                            return (
                              <td
                                key={column.id}
                                className='text-start text-sm p-4 text-gray-600'>
                                {row[column.id]}
                              </td>
                            )
                          } else if (column.id !== 'action') {
                            return (
                              <td
                                key={column.id}
                                className='text-start text-sm p-4 text-gray-600'>
                                {column.format &&
                                typeof row[column.id] === 'number'
                                  ? column.format(row[column.id])
                                  : row[column.id]}
                              </td>
                            )
                          }
                          return null
                        })}
                        <td className='flex items-center py-4 text-xs'>
                          <div
                            className={`flex flex-1 items-center gap-2 py-2 px-4 ${
                              row.status === 'Pending'
                                ? 'text-yellow-500'
                                : row.status === 'Shipped'
                                ? 'text-green-500'
                                : 'text-gray-400'
                            }`}>
                            <span className=' w-3 h-3 inline-block bg-current rounded-full'></span>{' '}
                            {row.status}
                          </div>
                          <MoreVertIcon className='flex-1 text-gray-600 cursor-pointer' />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className='pagination flex items-center justify-between my-5'>
              <span className='text-sm px-2'>
                10 of {filteredData.length} entries
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
