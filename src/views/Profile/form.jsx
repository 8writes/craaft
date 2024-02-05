/** @format */

import React, { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useDataContext } from '@/context/dataContext'
import Skeleton from '@mui/material/Skeleton'

const UserProfileForm = () => {
  const session = useDataContext()
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isEditing, setEditing] = useState(false)

  const firstName = session?.first_name
  const lastName = session?.last_name
  const subscription = session?.subscription
  const createdAt = session?.created_at
  const primaryEmail = session?.email
  const tel = session?.tel

  const handleEditClick = () => {
    setEditing(!isEditing)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', { tel, email })
  }

  return (
    <div>
      <div className='grid gap-20 py-10 shadow-sm bg-white rounded-md mt-5 px-4 md:px-5'>
        <form
          onSubmit={handleSubmit}
          className='grid gap-5 w-full md:text-xl xl:w-2/4 font-semibold text-gray-600'>
          <label className='grid md:flex'>
            <p className='md:flex-1 text-xl'>Name</p>
            {!session ? (
              <Skeleton
                width={150}
                height={35}
                className='md:flex-1'
                animation='wave'
              />
            ) : (
              <p className='md:flex-1 text-gray-700'>
                {firstName} {lastName}
              </p>
            )}
          </label>
          <label className='grid md:flex'>
            <p className='md:flex-1 text-xl'>Active Since</p>
            {!session ? (
              <Skeleton
                width={150}
                height={35}
                className='md:flex-1'
                animation='wave'
              />
            ) : (
              <p className='md:flex-1 text-base text-gray-700'>
                {`${new Date(createdAt).toLocaleDateString()}`}
              </p>
            )}
          </label>
          <label className='grid md:flex'>
            <p className='md:flex-1 text-xl'>Primary Email</p>
            {!session ? (
              <Skeleton
                width={150}
                height={35}
                className='md:flex-1'
                animation='wave'
              />
            ) : (
              <input
                type='email'
                autoFocus
                className={`md:flex-1 ${
                  isEditing ? 'outline rounded-sm' : ''
                } text-gray-700`}
                defaultValue={primaryEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </label>
          <label className='grid md:flex'>
            <p className='md:flex-1 text-xl'>Phone Number</p>
            {!session ? (
              <Skeleton
                width={150}
                height={35}
                className='md:flex-1'
                animation='wave'
              />
            ) : (
              <input
                type='number'
                defaultValue={tel}
                className={`md:flex-1 ${
                  isEditing ? 'outline rounded-sm' : ''
                } text-gray-700`}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            )}
          </label>
          <div className='flex gap-2 justify-end '>
            {!session ? (
              <Skeleton width={150} height={35} animation='wave' />
            ) : (
              <>
                {isEditing && (
                  <button
                    className='border-2 border-green-600 py-1 px-6 text-gray-600 uppercase text-xs rounded-sm'
                    onClick={handleEditClick}>
                    Save
                  </button>
                )}
                <button
                  className='py-1 px-2 text-xs uppercase text-indigo-600 rounded-sm'
                  onClick={handleEditClick}>
                  {isEditing ? 'Cancel' : 'Update Info'}
                </button>
              </>
            )}
          </div>
          <label className='grid md:flex'>
            <p className='md:flex-1 text-xl'>Subscription</p>
            {!session ? (
              <Skeleton
                width={150}
                height={35}
                className='md:flex-1'
                animation='wave'
              />
            ) : (
              <p className='md:flex-1 text-gray-700'>{subscription}</p>
            )}
          </label>{' '}
          <label className='grid md:flex'>
            <p className='md:flex-1 text-xl'>Expires</p>
            {!session ? (
              <Skeleton
                width={150}
                height={35}
                className='md:flex-1'
                animation='wave'
              />
            ) : (
              <p className='md:flex-1 text-gray-700'>23/2/2024</p>
            )}
          </label>
        </form>
        <div className='flex justify-end'>
          {!session ? (
            <Skeleton width={160} height={60} animation='wave' />
          ) : (
            <button className='border-2 py-1 px-6 border-red-500 uppercase text-base text-red-600 rounded-md'>
              <DeleteOutlineIcon /> Delete Account
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfileForm
