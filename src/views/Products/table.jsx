/** @format */

import Image from 'next/image'
import { useState, useMemo } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import searchIcon from '../../../public/searchIcon.svg'
import avatar from '../../../public/avatar.svg'

const columns = [
  { id: 'sn', label: 'S/N' },
  { id: 'image', label: 'Preview' },
  { id: 'item', label: 'Product' },
  { id: 'date', label: 'Date' },
  {
    id: 'price',
    label: 'Price(₦)',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'inventory', label: 'Inventory' },
  { id: 'action', label: '' },
]

const Table = () => {
  const [page, setPage] = useState(0)
  const rowsPerPage = useMemo(() => 10, [])

  const generateDummyData = () => {
    const dummyData = []

    for (let i = 1; i <= 20; i++) {
      const inventory =
        i % 2 === 0 ? 'Pending' : i % 3 === 0 ? 'Refunded' : 'Shipped'

      const row = {
        sn: i,
        item: 'Redmagic 7',
        size: 'xl',
        date: '2022-02-01',
        price: 73430,
        inventory,
      }

      dummyData.push(row)
    }

    return dummyData
  }

  const data = generateDummyData()

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
        <p className=' text-2xl md:text-3xl font-semibold text-gray-600'>Products</p>
        <div className='flex my-5 gap-2 justify-between items-center'>
          <span className='flex w-full md:w-1/3 gap-2 border-b border-gray-500 '>
            <input
              type='text'
              className='outline-none bg-transparent w-full text-base md:text-sm'
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
            <button className='text-gray-700 text-sm md:text-base'>
              <AddRoundedIcon /> Add product
            </button>
          </div>
        </div>
      </div>
      <div className='Table-Body'>
        {data && data.length > 0 ? (
          <>
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
                  {data
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
                              row.inventory === 'Pending'
                                ? 'text-yellow-500'
                                : row.inventory === 'Shipped'
                                ? 'text-green-500'
                                : 'text-gray-400'
                            }`}>
                            <span className=' w-3 h-3 inline-block bg-current rounded-full'></span>{' '}
                            {row.inventory}
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
                10 of {data.length} entries
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
                  {Math.ceil(data.length / rowsPerPage)}
                </span>
                <button
                  className=' border-l-2 p-1'
                  onClick={handleNextPage}
                  disabled={page === Math.ceil(data.length / rowsPerPage) - 1}>
                  Next
                </button>
              </span>
            </div>
          </>
        ) : (
          <p className='text-center'>No data available</p>
        )}
      </div>
    </section>
  )
}

export default Table
