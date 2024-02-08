/** @format */
'use client'

import OverviewLayout from '@/layout/UserLayout'
import Table from '@/views/Orders/table'

export default function Orders() {
  return (
    <OverviewLayout>
      <p className='text-2xl uppercase md:text-3xl font-semibold text-indigo-600'>
        Orders
      </p>
      <Table />
    </OverviewLayout>
  )
}
