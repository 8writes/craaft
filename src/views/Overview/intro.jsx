/** @format */

import { useState } from 'react'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded'
import StoreRoundedIcon from '@mui/icons-material/StoreRounded'
import Link from 'next/link'
import { useDataContext } from '@/context/dataContext'

const Intro = () => {
  const session = useDataContext()
  const [isCopied, setIsCopied] = useState(false)

  console.log(session)

  const handleCopyLink = () => {
    const textField = document.createElement('textarea')
    textField.innerText = `mystore.craaft.shop`
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
  const storeName = session?.store_name

  return (
    <section className='grid gap-10'>
      <div>
        <p className='text-3xl font-semibold text-slate-600'>
          Welcome, {firstName}
        </p>
        <p className='text-base font-semibold text-indigo-700'>
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
      </div>
      <div className='grid gap-5'>
        <p className='text-2xl font-semibold text-gray-600'>Quick Actions</p>
        <div className='flex flex-wrap gap-5'>
          <Link href='#'>
            <button className='flex text-base font-semibold hover:text-green-500 text-green-600 items-center'>
              <AddCircleOutlineIcon />
              New Product
            </button>
          </Link>
          <Link href='#'>
            <button className='flex text-base font-semibold hover:text-blue-800 text-blue-900 items-center'>
              <AddBusinessRoundedIcon />
              Subscription
            </button>{' '}
          </Link>
          <Link href='#'>
            <button className='flex text-base font-semibold hover:text-yellow-500 text-yellow-600 items-center'>
              <StoreRoundedIcon />
              Manage Store
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Intro
