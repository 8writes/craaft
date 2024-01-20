/** @format */
'use client'

import HorizontalNav from '@/navigation/horizontal'
import VerticalNav from '@/navigation/vertical'

export default function OverviewLayout({ children }) {
  return (
    <>
      <div className='lg:hidden flex justify-center my-20'>
        <p className='text-2xl'>Only available on laptop view 1024px upwards</p>
      </div>
      <section className='lg:grid hidden'>
        <HorizontalNav />
        <div className='flex bg-gray-100'>
          <VerticalNav />
          {children}
        </div>
      </section>
    </>
  )
}
