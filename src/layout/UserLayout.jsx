/** @format */
'use client'

import { UserProvider, useDataContext } from '@/context/dataContext'
import HorizontalNav from '@/navigation/horizontal'
import VerticalNav from '@/navigation/vertical'
import { redirect } from 'next/navigation'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

export default function UserLayout({ children }) {
  const session = useDataContext()

  useEffect(() => {
    const session = localStorage.getItem('auth-token')

    if (!session) {
      redirect('/login')
    }
  }, [session])

  return (
    <>
      <HorizontalNav />
      <div className='flex bg-slate-100'>
        <div className='hidden lg:block'>
          <VerticalNav />
        </div>
        <div className='pt-24 md:pb-10 pb-20 px-5 md:px-10 mx-auto h-screen overflow-y-auto w-full'>
          {children}
        </div>
      </div>
    </>
  )
}

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
