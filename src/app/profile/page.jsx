/** @format */
'use client'

import OverviewLayout from '@/layout/UserLayout'
import UserProfileForm from '@/views/Profile/form'

export default function Profile() {
  return (
    <OverviewLayout>
      <p className='text-2xl uppercase md:text-3xl font-semibold text-gray-600'>
        Personal Info
      </p>
      <UserProfileForm />
    </OverviewLayout>
  )
}
