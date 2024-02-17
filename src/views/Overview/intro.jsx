/** @format */

import { useState, useEffect } from 'react'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded'
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined'
import StoreRoundedIcon from '@mui/icons-material/StoreRounded'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import Link from 'next/link'
import { useDataContext } from '@/context/dataContext'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import Skeleton from '@mui/material/Skeleton'
import { toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const Intro = () => {
  const session = useDataContext()
  const [isCopied, setIsCopied] = useState(false)

  const firstName = session?.first_name
  const storeName = session?.store_url

  const handleCopyLink = () => {
    const textField = document.createElement('textarea')
    textField.innerText = `https://${storeName}`
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    document.body.removeChild(textField)

    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Visit my store',
          text: 'Check out my store!',
          url: `https://${storeName}`,
        })
      } else {
        toast.error('Share not supported', {
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
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <section>
      <ToastContainer />
      <div className='pb-5 px-4'>
        {!session ? (
          <Skeleton width={150} height={50} animation='wave' />
        ) : (
          <p className=' text-3xl md:text-4xl font-semibold text-gray-700'>
            Hi, <span className='font-mono'>{firstName}</span>
          </p>
        )}
      </div>
      <div className='grid gap-10'>
        <div className='bg-white flex justify-between rounded-md p-4 shadow-sm md:w-1/2'>
          {!session ? (
            <Skeleton width={200} animation='wave' />
          ) : (
            <p className='text-base font-mono lowercase font-semibold text-indigo-800'>
              <PublicOutlinedIcon />{' '}
              <a href={`https://${storeName}`} target='_blank' rel='noreferrer'>
                {storeName}
              </a>
              <ContentCopyOutlinedIcon
                sx={{
                  width: '17px',
                  cursor: 'pointer',
                  mx: '4px',
                  color: isCopied ? 'green' : 'inherit',
                }}
                onClick={handleCopyLink}
              />
              {isCopied && (
                <span className='mr-5 text-green-600 text-xs'>Copied!</span>
              )}
            </p>
          )}
          <div className='flex gap-3'>
            {!session ? (
              <Skeleton width={100} height={50} animation='wave' />
            ) : (
              <>
                <EqualizerOutlinedIcon className='text-green-600 cursor-pointer' />
                <ShareOutlinedIcon
                  onClick={handleShareClick}
                  className='text-indigo-600 cursor-pointer'
                />
              </>
            )}
          </div>
        </div>
        <div className='grid bg-white rounded-md md:w-1/2 p-4 shadow-sm  gap-5 md:px-4'>
          {!session ? (
            <Skeleton width={150} height={50} animation='wave' />
          ) : (
            <p className='text-2xl font-bold text-indigo-700'>Quick Actions</p>
          )}
          <div className='flex flex-wrap gap-1 justify-between md:gap-5 md:justify-start'>
            {!session ? (
              <Skeleton width={55} height={40} animation='wave' />
            ) : (
              <Link
                href='add-product'
                className='grid hover:text-indigo-600 text-gray-700 items-center'>
                <span className='mx-auto bg-gray-200 px-3 py-2 rounded-xl'>
                  <ControlPointDuplicateOutlinedIcon />
                </span>
                <button className=' text-sm font-semibold '>Add Product</button>
              </Link>
            )}

            {!session ? (
              <Skeleton width={55} height={40} animation='wave' />
            ) : (
              <Link
                href='orders'
                className='grid  hover:text-indigo-600 text-gray-700  items-center'>
                <span className='mx-auto bg-gray-200 px-3 py-2 rounded-xl'>
                  <ListAltRoundedIcon />
                </span>
                <button className=' text-sm font-semibold '>Orders</button>
              </Link>
            )}

            {!session ? (
              <Skeleton width={55} height={40} animation='wave' />
            ) : (
              <Link
                href='#'
                className='grid cursor-not-allowed hover:text-gray-300 text-gray-300 items-center'>
                <span className='mx-auto bg-gray-200 px-3 py-2 rounded-xl'>
                  <StoreRoundedIcon />
                </span>
                <button className='cursor-not-allowed text-sm font-semibold '>
                  Manage Store
                </button>
              </Link>
            )}
            {!session ? (
              <Skeleton width={55} height={40} animation='wave' />
            ) : (
              <Link
                href='products  '
                className='grid  hover:text-indigo-600 text-gray-700  items-center'>
                <span className='mx-auto bg-gray-200 px-3 py-2 rounded-xl'>
                  <CategoryRoundedIcon />
                </span>
                <button className=' text-sm font-semibold '>Products</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Intro
