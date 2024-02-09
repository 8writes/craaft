/** @format */

import Image from 'next/image'
import { useState, useMemo, useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import searchIcon from '../../../public/searchIcon.svg'
import axios from 'axios'
import { useDataContext } from '@/context/dataContext'
import { Dialog, DialogTitle } from '@mui/material'
import { Skeleton } from '@mui/material'
import Link from 'next/link'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import TrendingFlatOutlinedIcon from '@mui/icons-material/TrendingFlatOutlined'

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
  const [isLoading, setIsLoading] = useState(false)
  const rowsPerPage = useMemo(() => 10, [])
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false)
  const [selectedValue, setSelectedValue] = useState('Filter')
  const [searchTerm, setSearchTerm] = useState('')
  const [normalData, setNormalData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [isEditing, setEditing] = useState(false)
  const [editStock, setEditStock] = useState('')
  const [editName, setEditName] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [editSize, setEditSize] = useState([])
  const [editColor, setEditColor] = useState([])
  const [editProductId, setEditProductId] = useState(null)

  const handleOpenDialog = (rowData) => {
    setSelectedRowData(rowData)
    setEditProductId(rowData.id)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setSelectedRowData(null)
    setEditing(false)
    setOpenDialog(false)
    setEditProductId('')
    setEditPrice('')
    setEditStock('')
    setEditName('')
    setEditColor('')
    setEditSize('')
  }

  const user_id = session?.id
  const store_name_id = session?.store_name_id
  const store_bucket_id = session?.store_bucket_id

  const toggleDropdown2 = () => setIsDropdownOpen2((prevState) => !prevState)

  const value2 = ['Filter', 'In Stock', 'Low Stock', 'Out Of Stock']

  const fetchData = async () => {
    try {
      setIsLoading(true)
      if (session) {
        const response = await axios.get(
          `https://craaft.onrender.com/v1/api/fetch?store_name_id=${store_name_id}`
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

        setNormalData(formattedData)

        const dataToUse = formattedData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

        setSearchData(dataToUse)
      }
    } catch (error) {
      console.error('Error fetching data:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle editing
  const handleEdit = (id, price, stock, name, color, size) => {
    setEditProductId(id)
    setEditPrice(price)
    setEditStock(stock)
    setEditName(name)
    setEditColor(color)
    setEditSize(size)
    setEditing(!isEditing)
  }

  // Handle saving edit
  const handleSaveEdit = async () => {
    setIsLoading(true)

    try {
      const response = await axios.post(
        ` http://localhost:3000/v1/api/update?store_name_id=${store_name_id}&user_id=${user_id}`,
        {
          editPrice,
          editStock,
          editSize,
          editName,
          editColor,
          editProductId,
        }
      )

      const { error } = response.data

      if (error) {
        console.log(error.message)
      } else {
        await fetchData()
        handleCloseDialog()
      }
    } catch (error) {
      console.error('Error updating data:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle deleting product

  const handleDelete = async (id) => {
    try {
      selectedRowData

      await deleteImage(selectedRowData.image)

      const response = await axios.post(
        ` https://craft.onrender.com/v1/api/delete?store_name_id=${store_name_id}&id=${id}&user_id=${user_id}`
      )

      const { error } = response.data

      if (error) {
        console.log(error.message)
      } else {
        console.log('success')
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      fetchData()
    }
  }

  const deleteImage = async (imageUrls) => {
    try {
      const response = await axios.post(
        ` https://craft.onrender.com/v1/api/remove?store_bucket_id=${store_bucket_id}&modified_urls=${imageUrls}`
      )

      const { error } = response.data

      if (error) {
        console.log(error.message)
      }
    } catch (error) {
      console.error('Error deleting images:', error.message)
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
            return row.stock.toLowerCase() === selectedValue.toLowerCase()
          }
        })
  }, [searchTerm, selectedValue, normalData, searchData])

  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0))
  const handleNextPage = () =>
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(dataToUse.length / rowsPerPage) - 1)
    )

  return (
    <section className='font-noto'>
      <div className='Table-Header px-1'>
        <div className='flex my-5 gap-2 justify-between items-center'>
          <span className='flex w-full md:w-1/3 gap-2 border-b border-gray-500 '>
            <input
              type='text'
              className='outline-none bg-transparent font-semibold w-full text-base md:text-sm'
              placeholder='Search products'
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

          <div className='flex justify-end w-full gap-1 md:w-1/3 items-center'>
            <span
              onClick={toggleDropdown2}
              className='text-indigo-600 font-semibold flex w-28 md:w-32 relative items-center cursor-pointer text-sm md:text-base'>
              <FilterAltOutlinedIcon />
              <span>{selectedValue}</span>
              {isDropdownOpen2 && (
                <div className='absolute z-20 left-0 right-0 w-32 top-8 rounded-b-md shadow-md bg-white'>
                  {value2.map((value, index) => (
                    <p
                      role='button'
                      onClick={() => setSelectedValue(value)}
                      key={index}
                      className={` px-3 py-2 text-gray-500 text-xs hover:bg-gray-100 ${
                        value === selectedValue ? 'bg-gray-100' : ''
                      }`}>
                      {value}
                    </p>
                  ))}
                </div>
              )}
            </span>
            <Link href='add-product'>
              <button className='flex text-indigo-600 font-semibold text-base'>
                <AddCircleOutlineOutlinedIcon />
                New
                <span className='hidden md:inline-block'></span>
              </button>
            </Link>
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
            {isLoading ? (
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
                    <tr
                      key={row.sn}
                      className='border-b-2 uppercase hover:bg-indigo-100 cursor-pointer'
                      onClick={() => handleOpenDialog(row)}>
                      {columns.slice(0, -2).map((column) => {
                        if (column.id === 'image' && row.image) {
                          return (
                            <td
                              key={column.id}
                              className='text-start text-sm p-4 text-gray-600'>
                              <img
                                src={`${row.image[0]}`}
                                alt='Product Image'
                                style={{
                                  width: '55px',
                                  height: '55px',
                                  borderRadius: '4px',
                                }}
                                loading='lazy'
                              />
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
                          className={`flex flex-1 w-32 my-auto md:w-fit items-center gap-2 py-2 px-4 ${
                            row.stock === 'Low Stock'
                              ? 'text-yellow-600'
                              : row.stock === 'In Stock'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}>
                          <span className=' w-3 h-3 inline-block bg-current rounded-full'></span>{' '}
                          {row.stock}
                        </div>
                        <MoreVertIcon
                          onClick={() => handleOpenDialog(row)}
                          className='text-gray-600 cursor-pointer'
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
          {isLoading ||
            (dataToUse.length === 0 && (
              <div className='text-center my-10'>
                <p className='flex justify-center font-semibold text-xl text-gray-600'>
                  No Data Available
                </p>
              </div>
            ))}
        </div>
        <div className='pagination flex items-center justify-between text-gray-600 font-semibold  my-5'>
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
            <span className='py-1 px-3 bg-indigo-300'>{page + 1}</span>
            <span className='py-1 px-3'>
              {Math.ceil(dataToUse.length / rowsPerPage)}
            </span>
            <button
              className=' border-l-2 p-1'
              onClick={handleNextPage}
              disabled={page === Math.ceil(dataToUse.length / rowsPerPage) - 1}>
              Next
            </button>
          </span>
        </div>
      </div>
      <Dialog
        maxWidth='sm'
        fullWidth
        open={openDialog}
        onClose={handleCloseDialog}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}>
          <p className='text-xl uppercase font-semibold text-indigo-700'>
            {selectedRowData?.name}
          </p>
          <button className='text-gray-700' onClick={handleCloseDialog}>
            <CloseOutlinedIcon />
          </button>
        </DialogTitle>
        <span
          className={`${
            !isEditing ? 'hidden' : ''
          }  text-indigo-600 text-base px-7 font-semibold`}>
          Editing Product
        </span>{' '}
        <span className='overflow-x-hidden p-7'>
          {selectedRowData && (
            <>
              <div className='flex overflow-y-auto'>
                {selectedRowData.image.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Product Image ${index + 1}`}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '4px',
                      marginRight: '8px',
                    }}
                    loading='lazy'
                  />
                ))}
              </div>
              <div className='grid mt-5'>
                Product Name
                <p className='text-xl uppercase font-bold text-gray-800'>
                  {selectedRowData?.name}
                </p>
                {isEditing && (
                  <input
                    type='text'
                    className={`${
                      !isEditing ? '' : 'uppercase outline-none border px-2'
                    }`}
                    disabled={!isEditing}
                    placeholder='Input New Colors'
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                )}
              </div>
              <div className='mt-5'>
                Date Uploaded
                <p className='text-sm font-semibold'>{selectedRowData?.date}</p>
              </div>
              <div className='flex gap-2 overflow-hidden flex-wrap justify-between'>
                <div className='grid mt-5'>
                  Price
                  <p className='text-xl font-bold text-gray-800'>
                    ₦{selectedRowData?.price.toLocaleString('en-US')}
                  </p>
                  {isEditing && (
                    <input
                      type='tel'
                      className={`${
                        !isEditing ? '' : 'uppercase outline-none border px-2'
                      }`}
                      disabled={!isEditing}
                      placeholder='Input New Price'
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                  )}
                </div>
                <div className='grid mt-5'>
                  Sizes
                  <p className='text-xl font-bold text-gray-800'>
                    {selectedRowData?.size?.toLocaleString('en-US')}
                  </p>
                  {isEditing && (
                    <input
                      type='tel'
                      className={`${
                        !isEditing ? '' : 'outline-none uppercase border px-2'
                      }`}
                      disabled={!isEditing}
                      value={editSize}
                      placeholder='e.g., 40,XL,45'
                      onChange={(e) => {
                        const inputSizes = e.target.value
                          .split(',')
                          .map((item) => item.trim())
                        if (inputSizes.length <= 10) {
                          setEditSize(
                            inputSizes.map((size) => size.toUpperCase())
                          )
                        }
                      }}
                    />
                  )}
                </div>
                <div className='grid mt-5'>
                  Colors
                  <p className='text-xl font-bold text-gray-800'>
                    {selectedRowData?.color?.toLocaleString('en-US')}
                  </p>
                  {isEditing && (
                    <input
                      type='text'
                      className={`${
                        !isEditing ? '' : 'uppercase outline-none border px-2'
                      }`}
                      disabled={!isEditing}
                      placeholder='e.g., RED,BLACK,BLUE'
                      value={editColor}
                      onChange={(e) => {
                        const inputSizes = e.target.value
                          .split(',')
                          .map((item) => item.trim())
                        if (inputSizes.length <= 10) {
                          setEditColor(
                            inputSizes.map((size) => size.toUpperCase())
                          )
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              <div className='grid mt-5'>
                Stock Count
                <p
                  className={`text-base outline-none font-bold ${
                    selectedRowData.stock === 'Low Stock'
                      ? 'text-yellow-600'
                      : selectedRowData.stock === 'In Stock'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                  {selectedRowData?.stock}
                  <span
                    className={`${
                      !isEditing ? 'hidden' : ''
                    }  text-gray-600 text-sm px-3`}>
                    <TrendingFlatOutlinedIcon />
                  </span>
                  <span
                    className={`text-base ${
                      !isEditing ? 'hidden' : ''
                    }  outline-none font-bold ${
                      editStock === 'Low Stock'
                        ? 'text-yellow-600'
                        : editStock === 'In Stock'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                    {editStock}
                  </span>
                </p>
                {isEditing && (
                  <select
                    disabled={!isEditing}
                    value={editStock}
                    className={`${
                      !isEditing ? '' : 'mt-3 cursor-pointer border px-2'
                    }`}
                    onChange={(e) => setEditStock(e.target.value)}>
                    <option value='' className='text-gray-600'>
                      Select Stock Update
                    </option>
                    <option value='In Stock' className='text-green-600'>
                      In Stock (above 5)
                    </option>
                    <option value='Low Stock' className='text-yellow-600'>
                      Low Stock (below 5)
                    </option>
                    <option value='Out Of Stock' className='text-red-600'>
                      Out Of Stock (0)
                    </option>
                  </select>
                )}
              </div>
            </>
          )}
        </span>
        <span className='flex overflow-hidden justify-between p-7'>
          <button
            className={`${
              !isEditing ? '' : 'hidden'
            } text-xl font-semibold text-red-600`}
            onClick={handleDelete}>
            Delete
          </button>

          <button
            className='text-xl font-semibold text-indigo-600'
            onClick={() =>
              handleEdit(
                selectedRowData?.id,
                selectedRowData?.price,
                selectedRowData?.stock,
                selectedRowData?.name,
                selectedRowData?.color,
                selectedRowData?.size
              )
            }>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && (
            <button
              className='text-xl font-semibold text-green-600'
              onClick={handleSaveEdit}>
              {isLoading ? 'Save...' : 'Save'}
            </button>
          )}
        </span>
      </Dialog>
    </section>
  )
}

export default Table
