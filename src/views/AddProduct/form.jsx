/** @format */

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import ProductOptions from './product-options'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

const ProductForm = () => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productUnit, setProductUnit] = useState('')
  const [productStock, setProductStock] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [isOptionsDialogOpen, setOptionsDialogOpen] = useState(false)

  const handleOptionsButtonClick = () => {
    setOptionsDialogOpen(true)
  }

  const closeOptionsDialog = () => {
    setOptionsDialogOpen(false)
  }

  return (
    <div className='py-10'>
      <form className='grid bg-white rounded-md shadow-sm p-10'>
        <label>
          <p className='font-semibold text-gray-600'>Product Name</p>
          <input
            className='w-full p-2 outline-none border my-2'
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder='Enter product name'
            autoFocus
          />
        </label>
        <label>
          <p className='font-semibold text-gray-600'>Product Price</p>
          <input
            className='w-full p-2 outline-none border my-2'
            type='tel'
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder='Enter price'
          />
        </label>
        <label>
          <p className='font-semibold text-gray-600'>Product Description</p>
          <textarea
            className='w-full p-2 outline-none border my-2 h-2/3'
            type='text'
            style={{ resize: 'none' }}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder='Enter product description'
          />
        </label>
        <div className='flex w-full flex-wrap my-2  gap-5'>
          <label className='flex-1'>
            <p className='text-sm font-semibold text-gray-600'>
              Stock Quantity
            </p>
            <input
              className='w-full p-2 outline-none border my-2 cursor-text'
              type='tel'
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              placeholder='10'
            />
          </label>
          <label className='flex-1'>
            <p className='text-sm font-semibold text-gray-600'>Product Unit</p>
            <select
              className='w-full p-2 outline-none border my-2 cursor-pointer'
              value={productUnit}
              onChange={(e) => setProductUnit(e.target.value)}>
              <option value=''>Select unit</option>
              <option value='kg'>Kilogram</option>
              <option value='pair'>pair</option>
              <option value='yd'>yard</option>
              <option value='box'>box</option>
              <option value='lb'>Pound</option>
              <option value='bag'>bag</option>
              <option value='ft'>feet</option>
              <option value='plate'>plate</option>
            </select>
          </label>
        </div>
        <div>
          <button
            className='w-full p-2 font-semibold text-gray-600 outline-none border my-2'
            type='button'
            onClick={handleOptionsButtonClick}
            variant='contained'>
            Add Product Details
          </button>
          <p className='text-xs md:text-sm flex item-center text-center md:text-start text-gray-600 font-semibold'>
           <InfoOutlinedIcon /> Add product colors, sizes and more.
          </p>
        </div>
        <button
          className='bg-green-800 rounded-sm font-semibold my-4 hover:bg-green-600 p-2 text-white'
          type='submit'>
          Upload Product
        </button>
      </form>
      <Dialog
        open={isOptionsDialogOpen}
        onClose={closeOptionsDialog}
        maxWidth='sm'
        fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}>
          <p className='text-base font-semibold text-gray-600'>
            Manage Product Details
          </p>
          <button className='text-gray-700' onClick={closeOptionsDialog}>
            <CloseOutlinedIcon />
          </button>
        </DialogTitle>
        <DialogContent>
          <ProductOptions />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductForm
