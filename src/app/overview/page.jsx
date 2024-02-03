/** @format */

'use client'

import OverviewLayout from '@/layout/UserLayout'
import Intro from '@/views/Overview/intro'

export default function Overview() {
  return (
    <main>
      <OverviewLayout>
        <Intro />
      </OverviewLayout>
    </main>
  )
}
