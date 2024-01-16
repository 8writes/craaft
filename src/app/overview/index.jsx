/** @format */

'use client'

import Graph from '@/views/Overview/graph'
import Stats from '@/views/Overview/stats'
import Table from '@/views/Overview/table'
import OverviewLayout from './layout'

const Overview = () => {
  return (
    <OverviewLayout>
      <Stats />
      <Graph />
      <Table />
    </OverviewLayout>
  )
}

export default Overview
