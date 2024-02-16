/** @format */

import { useState, useEffect } from 'react'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded'
import StoreRoundedIcon from '@mui/icons-material/StoreRounded'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import Link from 'next/link'
import { useDataContext } from '@/context/dataContext'
import Skeleton from '@mui/material/Skeleton'

const Intro = () => {
  const session = useDataContext()
  const [isCopied, setIsCopied] = useState(false)

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

  const firstName = session?.first_name
  const storeName = session?.store_url

  return (
    <section className='grid gap-10'>
      <div className='bg-white rounded-lg p-4 shadow-sm md:w-1/2'>
        {!session ? (
          <Skeleton width={150} height={50} animation='wave' />
        ) : (
          <p className='text-2xl my-2 font-semibold text-slate-600'>
            Hi, {firstName}
          </p>
        )}

        {!session ? (
          <Skeleton width={200} animation='wave' />
        ) : (
          <p className='text-base lowercase font-semibold text-indigo-800'>
            <a href={`https://${storeName}`} target='_blank' rel='noreferrer'>
              <PublicOutlinedIcon /> {storeName}
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
      </div>
      <div className='grid gap-5 md:px-4'>
        {!session ? (
          <Skeleton width={150} height={50} animation='wave' />
        ) : (
          <p className='text-2xl font-bold text-indigo-700'>Quick Actions</p>
        )}
        <div className='flex justify-between gap-1 md:gap-5 md:justify-start flex-wrap'>
          {!session ? (
            <Skeleton width={100} height={40} animation='wave' />
          ) : (
            <Link
              href='add-product'
              className='grid hover:text-indigo-600 text-gray-700 items-center'>
              <span className='mx-auto bg-gray-200 px-3 py-2 rounded-xl'>
                <AddCircleOutlineIcon />
              </span>
              <button className=' text-sm font-semibold '>Add Product</button>
            </Link>
          )}

          {!session ? (
            <Skeleton width={100} height={40} animation='wave' />
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
            <Skeleton width={100} height={40} animation='wave' />
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
        </div>
      </div>
    </section>
  )
}

export default Intro
