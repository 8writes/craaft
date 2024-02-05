/** @format */

import Image from 'next/image'
import { useState, useMemo, useEffect } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import searchIcon from '../../../public/searchIcon.svg'
import axios from 'axios'
import { useDataContext } from '@/context/dataContext'
import { Skeleton } from '@mui/material'

const columns = [
  { id: 'sn', label: 'S/N' },
  { id: 'image', label: 'Preview' },
  { id: 'name', label: 'Product' },
  { id: 'date', label: 'Date' },
  {
    id: 'price',
    label: 'Price(₦)',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'stock', label: 'Inventory' },
  { id: 'action', label: '' },
]

const Table = () => {
  const session = useDataContext()
  const [page, setPage] = useState(0)
  const rowsPerPage = useMemo(() => 10, [])
  const [tableData, setTableData] = useState([])

  const store_name_id = session?.store_name_id

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        ` https://craaft.onrender.com/v1/api/fetch?store_name_id=${store_name_id}`
      )

      const { error, data } = response.data

      if (error) {
        console.log(error)
      }

      let idCounter = 0

      const formattedData = data.map((item) => ({
        ...item,
        sn: ++idCounter,
        image: item.uploaded_image_urls,
      }))

      setTableData(formattedData)
    } catch (error) {
      console.error('Error fetching data:', error.message)
    }
  }

    fetchData()
  }, [session])

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  const handleNextPage = () => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / rowsPerPage) - 1)
    )
  }

  return (
    <section className='font-noto'>
      <div className='Table-Header px-1'>
        <div className='flex my-5 gap-1 justify-between items-center'>
          <span className='flex w-full md:w-1/3 gap-2 border-b border-gray-500 '>
            <input
              type='text'
              className='outline-none bg-transparent font-semibold w-full text-base md:text-sm'
              placeholder='Search products'
            />{' '}
            <Image
              src={searchIcon}
              alt='Search icon'
              className='cursor-pointer'
              width={19}
              height={19}
            />
          </span>
          <div className='flex justify-end w-full md:w-1/3 gap-2 items-center'>
            <button className='text-gray-600 font-semibold text-sm md:text-base'>
              <AddRoundedIcon /> Add product
            </button>
          </div>
        </div>
      </div>
      <div className='Table-Body'>
        <div className='overflow-x-auto rounded-md shadow-md'>
          <table className='your-table-styles table-auto w-full'>
            <thead className='bg-indigo-500 p-4 '>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className='text-start text-sm font-semibold p-4 text-white'>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            {!session ? (
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
                {tableData
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((row) => (
                    <tr key={row.sn} className='border-b-2'>
                      {columns.slice(0, -2).map((column) => {
                        if (column.id === 'image' && row.image) {
                          return (
                            <td
                              key={column.id}
                              className='text-start text-sm p-4 text-gray-600 flex items-center'>
                              <>
                                <img
                                  src={`${row.image[0]}`}
                                  alt='Product Image'
                                  style={{
                                    width: '60px',
                                    height: '50px',
                                    borderRadius: '4px',
                                  }}
                                />
                              </>
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
                      <td className='flex items-center py-4 text-xs'>
                        <div
                          className={`flex flex-1 w-32 md:w-fit items-center gap-2 py-2 px-4 ${
                            row.stock === 'Out Of Stock'
                              ? 'text-red-600'
                              : row.stock === 'In Stock'
                              ? 'text-green-600'
                              : 'text-gray-400'
                          }`}>
                          <span className=' w-3 h-3 inline-block bg-current rounded-full'></span>{' '}
                          {row.stock}
                        </div>
                        <MoreVertIcon className='text-gray-600 cursor-pointer' />
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
          {!tableData && (
            <p className='flex justify-center font-semibold text-xl text-gray-600'>
              No Data Available{' '}
            </p>
          )}
        </div>
        <div className='pagination flex items-center justify-between text-gray-600 font-semibold  my-5'>
          <span className='text-sm px-2'>10 of {tableData.length} entries</span>
          <span className=' flex items-center border-2 rounded-sm text-sm px-1'>
            <button
              className=' border-r-2 p-1'
              onClick={handlePrevPage}
              disabled={page === 0}>
              Previous
            </button>
            <span className='py-1 px-3 bg-indigo-300'>{page + 1}</span>
            <span className='py-1 px-3'>
              {Math.ceil(tableData.length / rowsPerPage)}
            </span>
            <button
              className=' border-l-2 p-1'
              onClick={handleNextPage}
              disabled={page === Math.ceil(tableData.length / rowsPerPage) - 1}>
              Next
            </button>
          </span>
        </div>
      </div>
    </section>
  )
}

export default Table
