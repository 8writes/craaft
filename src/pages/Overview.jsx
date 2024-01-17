/** @format */

'use client'

import Chart from '@/views/Overview/chart'
import Stats from '@/views/Overview/stats'
import Table from '@/views/Overview/table'

const Overview = () => {
  return (
    <section className='px-1 mx-auto'>
      <Stats />
      <Chart />
      <Table />
    </section>
  )
}

export default Overview
