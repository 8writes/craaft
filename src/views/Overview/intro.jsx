/** @format */

import { useState, useEffect } from 'react'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded'
import StoreRoundedIcon from '@mui/icons-material/StoreRounded'
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
          <p className='text-2xl font-semibold text-slate-600'>
            Welcome, {firstName}
          </p>
        )}

        {!session ? (
          <Skeleton width={200} animation='wave' />
        ) : (
          <p className='text-base lowercase font-semibold text-indigo-700'>
            <a href={`https://${storeName}`} target='_blank' rel='noreferrer'>
              {storeName}
              <ArrowOutwardRoundedIcon sx={{ width: '20px' }} />
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
          <p className='text-2xl font-semibold text-slate-500'>Quick Actions</p>
        )}
        <div className='flex justify-between gap-1 md:justify-start flex-wrap'>
          {!session ? (
            <Skeleton width={100} height={40} animation='wave' />
          ) : (
            <Link href='add-product'>
              <button className='grid text-base font-semibold hover:text-green-500 text-green-600 items-center'>
                <AddCircleOutlineIcon className='mx-auto' />
                New Product
              </button>
            </Link>
          )}

          {!session ? (
            <Skeleton width={100} height={40} animation='wave' />
          ) : (
            <Link href='#'>
              <button className='grid text-base font-semibold hover:text-blue-700 text-blue-900 items-center'>
                <AddBusinessRoundedIcon className='mx-auto' />
                Subscription
              </button>
            </Link>
          )}

          {!session ? (
            <Skeleton width={100} height={40} animation='wave' />
          ) : (
            <Link href='#'>
              <button className='grid text-base font-semibold hover:text-yellow-500 text-yellow-600 items-center'>
                <StoreRoundedIcon className='mx-auto' />
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
