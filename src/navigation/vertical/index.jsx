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
      path: '/overview',
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
      path: '/settings',
    },
    {
      title: 'Subscription',
      icon: <AddBusinessRoundedIcon />,
      path: '#',
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
    <div className='w-screen md:w-fit z-20 bg-transparent'>
      <section
        className={`mt-6 lg:mt-16 md:pt-10 z-20 pb-32 md:pb-1 bg-white transition-all ease-in-out lg:block text-gray-500 h-screen overflow-y-auto w-56`}>
        <nav>
          <section className='flex pt-7 pb-10 px-6 md:hidden'>
            <Link href='overview'>
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
                        : 'border-l-4 border-transparent md:hover:border-indigo-600 md:hover:bg-indigo-100'
                    } 
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
    </div>
  )
}

export default VerticalNav
