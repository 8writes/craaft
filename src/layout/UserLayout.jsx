/** @format */
'use client'

import HorizontalNav from '@/navigation/horizontal'
import VerticalNav from '@/navigation/vertical'

export default function OverviewLayout({ children }) {
  return (
    <section className='grid '>
      <HorizontalNav />
      <div className='flex bg-gray-100'>
        <VerticalNav />
        {children}
      </div>
    </section>
  )
}
