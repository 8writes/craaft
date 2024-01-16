/** @format */

import HorizontalNav from '@/navigation/horizontal'
import VerticalNav from '@/navigation/vertical'

export default function OverviewLayout({ children }) {
  return (
    <section className='grid'>
      <HorizontalNav />
      <div className='flex'>
        <VerticalNav />
        {children}
      </div>
    </section>
  )
}
