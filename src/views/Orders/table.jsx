/** @format */

import Image from 'next/image'
import searchIcon from '../../../public/searchIcon.svg'
import { useState, useMemo, useRef, useEffect } from 'react'
import avatar from '../../../public/avatar.svg'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useDataContext } from '@/context/dataContext'
import axios from 'axios'
import { Skeleton } from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

const columns = [
  { id: 'sn', label: 'S/N' },
  { id: 'full_name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'reference', label: 'ReferenceId' },
  { id: 'order_date', label: 'Date' },
  {
    id: 'price',
    label: 'Price(₦)',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'status', label: 'Status' },
  { id: 'action', label: '' },
]

const Table = () => {
  const session = useDataContext()
  const [page, setPage] = useState(0)
  const [loading, setIsLoading] = useState(false)
  const rowsPerPage = useMemo(() => 10, [])
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false)
  const [selectedValue, setSelectedValue] = useState('Filter')
  const [searchTerm, setSearchTerm] = useState('')
  const [normalData, setNormalData] = useState([])
  const [searchData, setSearchData] = useState([])

  const store_order_id = session?.store_order_id

  const toggleDropdown2 = () => {
    setIsDropdownOpen2((prevState) => !prevState)
  }

  const value2 = ['Filter', 'Delivered', 'Pending', 'Refunded']

  const fetchData = async (searchTerm) => {
    try {
      setIsLoading(true)
      if (session) {
        const response = await axios.get(
          `https://craaft.onrender.com/v1/api/fetch?store_order_id=${store_order_id}`
        )

        const { error, data } = response.data

        if (error) {
          console.log(error)
        }

        let idCounter = 0

        const formattedData = data.map((item) => ({
          ...item,
          sn: ++idCounter,
        }))


        setNormalData(formattedData)

        const dataToUse = formattedData.filter((item) =>
          item.reference.toLowerCase().includes(searchTerm.toLowerCase())
        )

        setSearchData(dataToUse)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(searchTerm)
  }, [session, searchTerm])

  const handleSearch = () => {
    fetchData(searchTerm)
  }

  const dataToUse = useMemo(() => {
    return searchTerm.length > 0
      ? searchData
      : normalData.filter((row) => {
          if (selectedValue === 'Filter') {
            return true
          } else {
            return row.status.toLowerCase() === selectedValue.toLowerCase()
          }
        })
  }, [searchTerm, selectedValue, normalData, searchData])

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(dataToUse.length / rowsPerPage) - 1)
    )
  }

  return (
    <section className='font-noto z-10'>
      <div className='Table-Header px-1'>
        <div className='flex my-5 gap-5 justify-between items-center'>
          <span className='flex justify-end w-full md:w-1/3 gap-2 border-b border-gray-500 '>
            <input
              type='text'
              className='outline-none font-semibold bg-transparent w-full text-base md:text-sm'
              placeholder='Search reference id'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Image
              src={searchIcon}
              alt='Search icon'
              className='cursor-pointer'
              width={19}
              height={19}
              onClick={handleSearch}
            />
          </span>
          <div className='flex gap-2 items-center'>
            <span
              onClick={toggleDropdown2}
              className='text-indigo-600 flex text-xl md:text-base relative items-center w-32 cursor-pointer rounded-sm font-semibold'>
              <FilterAltOutlinedIcon className='text-2xl' />{' '}
              <span className='inline-block text-gray-500'>
                {selectedValue}
              </span>
              {isDropdownOpen2 && (
                <div className='absolute z-20 left-0 right-0 top-8 rounded-b-md w-full shadow-md bg-white'>
                  {value2.map((value, index) => (
                    <p
                      role='button'
                      onClick={() => setSelectedValue(value)}
                      key={index.id}
                      className={` px-3 py-2 text-gray-500 text-xs hover:bg-gray-100 ${
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
        <div>
          <div className='overflow-x-auto rounded-md shadow-md'>
            <table className='your-table-styles table-auto w-full'>
              <thead className='bg-indigo-500 p-4 '>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      className='text-start font-semibold text-sm p-4 text-white'>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              {loading ? (
                <tbody className='bg-gray-100 font-semibold'>
                  <tr>
                    {columns.slice(0, -2).map((column) => (
                      <td key={column.id}>
                        <Skeleton width={150} height={35} animation='wave' />
                      </td>
                    ))}
                  </tr>
                </tbody>
              ) : (
                <tbody className='bg-gray-100 font-semibold'>
                  {dataToUse
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row) => (
                      <tr key={row.sn} className='border-b-2'>
                        {columns.slice(0, -2).map((column) => {
                          if (column.id === 'image') {
                            return (
                              <td
                                key={column.id}
                                className='text-start text-sm p-4 text-gray-600'>
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
                        })}
                        <td className='flex items-center py-5 text-xs'>
                          <div
                            className={`flex flex-1 items-center gap-2 py-2 px-4 ${
                              row.status === 'Pending'
                                ? 'text-yellow-500'
                                : row.status === 'Delivered'
                                ? 'text-green-500'
                                : 'text-gray-400'
                            }`}>
                            <span className=' w-3 h-3 inline-block bg-current rounded-full'></span>{' '}
                            {row.status}
                          </div>
                          <MoreVertIcon className='text-gray-600 cursor-pointer' />
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
            {loading ||
              (dataToUse.length === 0 && (
                <div className='text-center my-10'>
                  <p className='flex justify-center font-semibold text-xl text-gray-600'>
                    No Data Available
                  </p>
                </div>
              ))}
          </div>
          <div className='pagination flex items-center text-gray-600 font-semibold justify-between my-5'>
            <span className='text-sm px-2'>
              {dataToUse.length} of {dataToUse.length} entries
            </span>
            <span className=' flex items-center border-2 rounded-sm text-sm px-1'>
              <button
                className=' border-r-2 p-1'
                onClick={handlePrevPage}
                disabled={page === 0}>
                Previous
              </button>
              <span className='py-1 px-3  bg-indigo-300'>{page + 1}</span>
              <span className='py-1 px-3'>
                {Math.ceil(dataToUse.length / rowsPerPage)}
              </span>
              <button
                className=' border-l-2 p-1'
                onClick={handleNextPage}
                disabled={
                  page === Math.ceil(dataToUse.length / rowsPerPage) - 1
                }>
                Next
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Table
