/** @format */
'use client'

import OverviewLayout from '@/layout/UserLayout'
import Table from '@/views/Products/table'


export default function Products() {
  return (
    <OverviewLayout>
      <p className='text-2xl uppercase md:text-3xl font-semibold text-indigo-600'>
        Products
      </p>
      <Table />
    </OverviewLayout>
  )
}
