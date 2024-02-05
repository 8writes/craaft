/** @format */

'use client'

import { Noto_Sans } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@/context/dataContext'

const noto = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
})

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={` ${noto.variable}`}>
    <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  )
}
