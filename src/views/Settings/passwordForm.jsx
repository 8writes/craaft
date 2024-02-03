/** @format */

import React, { useState } from 'react'

const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form data, for example, check if new password matches confirmation
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation don't match.")
      return
    }

    // Perform password change logic here, for example, call an API endpoint
    console.log('Password change submitted:', {
      currentPassword,
      newPassword,
    })

    // Reset form fields
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='max-w-md my-8 shadow-sm p-6 bg-white rounded-md'>
      <p className='text-xl font-semibold text-gray-500  pb-7'>
        Change Password
      </p>
      <form onSubmit={handleSubmit} className='font-semibold text-gray-600'>
        <label className='block mb-4'>
          Current Password
          <input
            type='password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className='w-full px-4 py-2 mt-1 border rounded-sm focus:outline-none focus:border-indigo-500'
          />
        </label>

        <label className='block mb-4'>
          New Password
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className='w-full px-4 py-2 mt-1 border rounded-sm focus:outline-none focus:border-indigo-500'
          />
        </label>

        <label className='block mb-4'>
          Confirm New Password
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='w-full px-4 py-2 mt-1 border rounded-sm focus:outline-none focus:border-indigo-500'
          />
        </label>

        <button
          type='submit'
          className='w-full bg-indigo-500 text-white py-2 px-4 rounded-sm hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600'>
          Change Password
        </button>
      </form>
    </div>
  )
}

export default PasswordForm
