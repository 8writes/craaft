/** @format */

import { useState } from 'react'
import axios from 'axios'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import { useDataContext } from '@/context/dataContext'
import { toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Link from 'next/link'

const ProductForm = () => {
  const session = useDataContext()
  const [isLoading, setIsLoading] = useState('')
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productUnit, setProductUnit] = useState('')
  const [productStock, setProductStock] = useState('')
  const [productSize, setProductSize] = useState([])
  const [productColor, setProductColor] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [productDescription, setProductDescription] = useState('')

  const isDisabled =
    !productName ||
    selectedImages.length === 0 ||
    !productPrice ||
    productSize.length === 0 ||
    !productStock

  const user_id = session?.id
  const email = session?.email
  const store_name_id = session?.store_name_id
  const validity = session?.plan_validity || 0
  const store_bucket_id = session?.store_bucket_id

  const handleImageUpload = () => {
    if (selectedImages.length < 6) {
      const newInput = document.createElement('input')
      newInput.type = 'file'
      newInput.accept = 'image/*'
      newInput.multiple = true
      newInput.style.display = 'none'
      newInput.addEventListener('change', handleFilesSelected)
      document.body.appendChild(newInput)
      newInput.click()
    }
  }

  const handleFilesSelected = (e) => {
    const selectedFiles = e.target.files

    if (selectedFiles.length > 0) {
      const newImages = Array.from(selectedFiles).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }))
      setSelectedImages((prevImages) => [...prevImages, ...newImages])
    }

    e.target.remove()
  }

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages]
    updatedImages.splice(index, 1)
    setSelectedImages(updatedImages)
  }

  // Function to handle form data insertion
  const handleUploadForm = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const currentDate = new Date()
      const date = currentDate.toISOString().split('T')[0]

      //Upload Images
      const ImgUrls = await Promise.all(
        selectedImages.map((image) => uploadImage(image.file))
      )

      // Check if ImgUrls is null
      if (!ImgUrls || ImgUrls.includes(null)) {
        console.log('Error uploading image')
        return null
      }

      // Prepare an array to store individual data objects
      const formData = {
        user_id,
        name: productName,
        description: productDescription,
        price: productPrice,
        size: productSize,
        email,
        color: productColor,
        stock: productStock,
        date,
        uploaded_image_urls: ImgUrls,
      }

      const response = await axios.post(
        ` https://craaft.onrender.com/v1/api/insert?store_name_id=${store_name_id}`,
        {
          withCredentials: true,
          formData,
        }
      )

      const { error } = response.data

      if (error) {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
        return null
      } else {
        toast.success('Uploaded Successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })

        clearForm()
      }
    } catch (error) {
       toast.error('Invalid Price Input (only numbers allowed)', {
         position: 'top-right',
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: 'light',
         transition: Bounce,
       })
    } finally {
      setIsLoading(false)
    }
  }

  const uploadImage = async (file) => {
    try {
      if (!file) {
        return null
      }

      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post(
        ` https://craaft.onrender.com/v1/api/uploadfile?id=${user_id}&store_bucket_id=${store_bucket_id}`,
        formData,
        {
          withCredentials: true,
        }
      )

      const { error, url } = response.data

      if (error) {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
        return null
      }

      return url
    } catch (error) {
      console.error('Error uploading image:', error.message)
    }
  }

  // Function to clear form fields
  const clearForm = () => {
    setProductName('')
    setProductDescription('')
    setProductPrice('')
    setProductStock('')
    setProductUnit('')
    setProductSize([])
    setProductColor([])
    setSelectedImages([])
  }

  return (
    <div className='pt-10'>
      <ToastContainer />
      <form className='grid bg-white rounded-md shadow-sm p-5 md:p-10 '>
        <p className='font-semibold text-gray-600'>Product Image(s)</p>
        <div className='flex flex-wrap gap-2 mt-2 mb-5'>
          {selectedImages.length > 0 && (
            <div className='flex flex-wrap md:mx-1 mx-auto items-center gap-2'>
              {selectedImages.map((image, index) => (
                <div key={index} className=' relative'>
                  <span
                    className=' cursor-pointer absolute text-red-500 top-0 right-0'
                    onClick={() => handleRemoveImage(index)}>
                    <CloseOutlinedIcon />
                  </span>
                  <img
                    src={image?.url}
                    alt={`Selected Image ${index + 1}`}
                    className='my-auto w-20 h-20'
                  />
                </div>
              ))}
            </div>
          )}

          <label
            onClick={handleImageUpload}
            className={`grid text-sm cursor-pointer border my-2 p-4 font-semibold text-gray-600 bg-slate-100 ${
              selectedImages.length >= 6 &&
              'opacity-50 hidden pointer-events-none'
            }`}>
            <FileUploadOutlinedIcon className='mx-auto' /> Add Image(s)
          </label>
        </div>

        <label>
          <p className='font-semibold text-gray-600'>Product Name</p>
          <input
            className='w-full p-2 outline-none border my-2'
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder='Enter product name'
            required
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
            required
          />
        </label>
        <label>
          <p className='font-semibold text-gray-600'>Product Description</p>
          <textarea
            className='w-full p-2 outline-none border my-2 h-28'
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
            <select
              required
              className='w-full p-2 outline-none border my-2 cursor-pointer'
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}>
              <option value=''>Select Quantity</option>
              <option value='In Stock'>In Stock (above 5)</option>
              <option value='Low Stock'>Low Stock (below 5)</option>
              <option value='Out Of Stock'>Out Of Stock (0)</option>
            </select>
          </label>
          <label className='flex-1'>
            <p className='text-sm font-semibold text-gray-600'>Product Unit</p>
            <select
              className='w-full p-2 outline-none border my-2 cursor-pointer'
              value={productUnit}
              onChange={(e) => setProductUnit(e.target.value)}>
              <option value=''>Select Unit</option>
              <option value='kg'>Kilogram</option>
              <option value='pair'>Pair</option>
              <option value='yd'>Yard</option>
              <option value='box'>Box</option>
              <option value='lb'>Pound</option>
              <option value='bag'>Bag</option>
              <option value='ft'>Feet</option>
              <option value='plate'>Plate</option>
            </select>
          </label>
        </div>
        <div className='flex gap-5'>
          <label className='flex-1'>
            <p className='text-sm font-semibold text-gray-600'>Size(s)</p>
            <input
              className='w-full uppercase outline-none border px-1  py-1 my-2 font-semibold'
              type='text'
              placeholder='e.g, 40,XL,64gb'
              value={productSize}
              onChange={(e) => {
                const inputSizes = e.target.value
                  .split(',')
                  .map((item) => item.trim())
                if (inputSizes.length <= 10) {
                  setProductSize(inputSizes.map((size) => size.toUpperCase()))
                }
              }}
              required
            />
          </label>
          <label className='flex-1'>
            <p className='text-sm font-semibold text-gray-600'>Color(s)</p>
            <input
              className='w-full uppercase outline-none border px-1  py-1 my-2 font-semibold'
              type='text'
              placeholder='e.g, RED,BLUE,GREEN'
              value={productColor}
              onChange={(e) => {
                const inputSizes = e.target.value
                  .split(',')
                  .map((item) => item.trim())
                if (inputSizes.length <= 10) {
                  setProductColor(inputSizes.map((size) => size.toUpperCase()))
                }
              }}
              required
            />
          </label>
        </div>
        <button
          className={`
          ${
            validity === 0 || isDisabled
              ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed'
              : ''
          } bg-green-800 rounded-sm font-semibold my-4 hover:bg-green-700 p-2 text-white`}
          type='submit'
          disabled={validity === 0 || isDisabled}
          onClick={handleUploadForm}>
          {isLoading ? 'Uploading...' : 'Upload Product'}
        </button>
        {validity === 0 && (
          <div>
            <p className='text-red-500 font-semibold text-center text-xl'>
              Kindly Renew your subscription{' '}
              <Link href='#' className=' underline'>
                here
              </Link>
            </p>
          </div>
        )}
      </form>
    </div>
  )
}

export default ProductForm
