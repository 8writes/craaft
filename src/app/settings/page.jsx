/** @format */

'use client'

import OverviewLayout from '@/layout/UserLayout'
import PasswordForm from '@/views/Settings/passwordForm'

export default function Settings() {
  return (
    <OverviewLayout>
      <p className='text-2xl uppercase md:text-3xl font-semibold text-gray-600'>
       Settings
      </p>
      <PasswordForm />
    </OverviewLayout>
  )
}
