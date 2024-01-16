/** @format */

import Stats from '@/views/Overview/stats'
import Graph from '@/views/Overview/graph'
import Table from '@/views/Overview/table'
import UserLayout from '../layout/UserLayout'

export default function Home() {
  return (
    <UserLayout>
      <Stats />
      <Graph />
      <Table />
    </UserLayout>
  )
}
