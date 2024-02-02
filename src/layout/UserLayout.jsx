/** @format */
'use client'

import HorizontalNav from '@/navigation/horizontal'
import VerticalNav from '@/navigation/vertical'
import PropTypes from 'prop-types'

export default function OverviewLayout({ children }) {
  return (
    <>
      <HorizontalNav />
      <div className='flex bg-gray-100'>
        <div className='hidden lg:block'>
          <VerticalNav />
        </div>
        <div className='pt-24 pb-10 px-2 md:px-10 mx-auto h-screen overflow-y-auto w-full'>
          {children}
        </div>
      </div>
    </>
  )
}

OverviewLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
