/** @format */

'use client'

import Chart from '@/views/Overview/chart'
import Stats from '@/views/Overview/stats'
import Table from '@/views/Overview/table'

const Overview = () => {
  return (
    <section className='px-4 pt-20 pb-10 mx-auto h-screen overflow-y-auto w-full hidden lg:block'>
      <Stats />
      <Chart />
      <Table />
    </section>
  )
}

export default Overview
