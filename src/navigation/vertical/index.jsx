/** @format */

import React from 'react'
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded'
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import QuizRoundedIcon from '@mui/icons-material/QuizRounded'
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import StoreRoundedIcon from '@mui/icons-material/StoreRounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logo from '../../../public/logo.svg'
import Image from 'next/image'

const VerticalNav = ({ isActive }) => {
  const pathname = usePathname()

  const navigationItems = [
    {
      title: 'Overview',
      icon: <RoofingRoundedIcon />,
      path: '/',
    },
    {
      sectionTitle: 'Store',
    },
    {
      icon: <CategoryRoundedIcon />,
      title: 'Products',
      path: '/products',
    },
    {
      icon: <ListAltRoundedIcon />,
      title: 'Orders',
      path: '/orders',
    },
    {
      icon: <StoreRoundedIcon />,
      title: 'Manage Store',
      path: '#',
    },
    {
      sectionTitle: 'Account',
    },
    {
      icon: <PersonOutlineRoundedIcon />,
      title: 'Profile',
      path: '/profile',
    },
    {
      title: 'Settings',
      icon: <SettingsRoundedIcon />,
      path: '/account-settings',
    },
    {
      title: 'Subscription',
      icon: <AddBusinessRoundedIcon />,
      path: '/account-settings',
    },
    {
      sectionTitle: 'Customer Care',
    },
    {
      title: 'Support',
      icon: <SupportAgentRoundedIcon />,
      path: '#',
    },
    {
      title: 'How To?',
      icon: <QuizRoundedIcon />,
      path: '#',
    },
    {
      title: 'About',
      icon: <InfoRoundedIcon />,
      path: '#',
    },
  ]

  return (
    <section
      className={`mt-6 md:pt-14 pb-10 bg-white lg:block text-gray-500 ${
        isActive ? '' : 'hidden'
      } h-screen overflow-y-auto w-52`}>
      <nav>
        <section className='flex pt-5 pb-10 px-6 md:hidden'>
          <Link href='/'>
            <Image
              src={logo}
              className='Logo h-fit'
              alt='TransMonitor Logo'
              width={100}
              height={45}
              loading='lazy'
            />
          </Link>
        </section>
        {navigationItems.map((item, index) => (
          <div key={index}>
            {item.sectionTitle ? (
              <div className='section-title uppercase text-xs text-gray-400 font-semibold px-6 mt-7 mb-3'>
                {item.sectionTitle}
              </div>
            ) : (
              <Link href={item.path} passHref>
                <div
                  className={`nav-item text-sm px-5 py-2 flex gap-4 my-1
                    ${
                      pathname === item.path
                        ? 'bg-indigo-100 border-l-4 border-indigo-600'
                        : 'border-l-4 border-transparent hover:border-indigo-600 hover:bg-indigo-100'
                    } 
                    ${index === navigationItems.length - 1 ? 'mt-7' : ''}
                  `}>
                  {item.icon}
                  <span className='text-sm font-semibold text-slate-600'>
                    {item.title}
                  </span>
                </div>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </section>
  )
}

export default VerticalNav
