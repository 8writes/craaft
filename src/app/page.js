/** @format */

'use client'

import { useEffect } from 'react'
import OverviewLayout from '@/layout/UserLayout'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/overview')
  }, [])

  return null
}
