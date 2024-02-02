/** @format */

import React, { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const UserProfileForm = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [subscriptionType, setSubscriptionType] = useState('')
  const [isEditing, setEditing] = useState(false)

  const handleEditClick = () => {
    setEditing(!isEditing)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Perform your form submission logic here, e.g., send data to the server
    console.log('Form submitted:', { fullName, email, subscriptionType })
  }

  return (
    <div className='px-4'>
      <p className='text-2xl md:text-3xl font-semibold text-gray-600'>
        Personal Info
      </p>
      <div className='grid gap-20 py-10'>
        <form
          onSubmit={handleSubmit}
          className='grid gap-5 text-base w-full md:text-xl md:w-2/4 font-semibold text-gray-600'>
          <label className='grid md:flex'>
            <p className='md:flex-1'>Name</p>
            <input
              type='text'
              value={fullName}
              className='md:flex-1 bg-gray-100'
              onChange={(e) => setFullName(e.target.value)}
              disabled={true}
              placeholder='emmanuel chisom'
            />
          </label>

          <label className='grid md:flex'>
            <p className='md:flex-1'>Primary Email</p>
            <input
              type='email'
              value={email}
              className='md:flex-1'
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              placeholder='mailemmanuel00@gmail.com'
            />
          </label>
          <label className='grid md:flex'>
            <p className='md:flex-1'>Phone Number</p>
            <input
              type='number'
              value={phoneNumber}
              className='md:flex-1 text-gray-600'
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={!isEditing}
              placeholder='0807462838'
            />
          </label>
          <div className='flex gap-2 justify-end '>
            {isEditing && (
              <button
                className='border-2 py-1 px-6 text-gray-600 text-xs rounded-sm'
                onClick={handleEditClick}>
                Save
              </button>
            )}
            <button
              className='border-2 py-1 px-6 text-xs uppercase text-gray-600 rounded-sm'
              onClick={handleEditClick}>
              {isEditing ? 'Cancel' : 'Update Info'}
            </button>
          </div>
          <label className='grid md:flex'>
            <p className='md:flex-1 text-xl'>Subscription</p>
            <input
              type='text'
              value={subscriptionType}
              className='md:flex-1 text-xl bg-gray-100'
              onChange={(e) => setSubscriptionType(e.target.value)}
              disabled={true}
              placeholder='Trial 14 days'
            />
          </label>
          <label className='grid md:flex'>
            <p className='md:flex-1 text-base'>Active Since</p>
            <input
              type='text'
              className='md:flex-1 text-base bg-gray-100'
              disabled={true}
              placeholder='1/11/2018'
            />
          </label>
        </form>
        <div>
          <button className='border-2 py-1 px-6 border-red-500 uppercase text-base text-red-600 rounded-sm'>
            <DeleteOutlineIcon /> Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfileForm
