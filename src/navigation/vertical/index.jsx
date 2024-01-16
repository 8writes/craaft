/** @format */

import React from 'react'
import Image from 'next/image'
import x33 from '../../../public/x33.svg'
import list_check from '../../../public/list-check.svg'
import list_pending from '../../../public/list-pending.svg'
import list from '../../../public/list.svg'
import manual from '../../../public/manual.svg'
import merchant from '../../../public/merchant.svg'
import wallet_cancel from '../../../public/wallet-cancel.svg'
import wallet_check from '../../../public/wallet-check.svg'
import wallet from '../../../public/wallet.svg'
import Link from 'next/link'

const VerticalNav = () => {
  const navigationItems = [
    {
      sectionTitle: 'Main',
    },
    {
      title: 'Overview',
      icon: x33,
      path: '/',
    },
    {
      sectionTitle: 'Payments',
    },
    {
      title: 'All Payments',
      icon: wallet,
      path: '#',
    },
    {
      title: 'Reconciled Payments',
      icon: wallet_check,
      path: '#',
    },
    {
      title: 'Un - Reconciled Payments',
      icon: wallet_cancel,
      path: '#',
    },
    {
      title: 'Manual Settlement',
      icon: manual,
      path: '#',
    },
    {
      sectionTitle: 'Orders',
    },
    {
      title: 'All Orders',
      icon: list,
      path: '#',
    },
    {
      title: 'Pending Orders',
      icon: list_pending,
      path: '#',
    },
    {
      title: 'Reconciled Orders',
      icon: list_check,
      path: '#',
    },
    {
      title: 'Merchant Profile',
      icon: merchant,
      path: '#',
    },
  ]

  return (
    <section className='bg-white lg:grid py-12  text-gray-500 hidden'>
      <>
        <button className='bg-green-600 px-8 w-fit mx-10 py-3 cursor-pointer rounded-full text-xs font-semibold uppercase text-white'>
          Generate Invoice
        </button>
      </>
      <nav>
        {navigationItems.map((item, index) => (
          <div key={index}>
            {item.sectionTitle ? (
              <div className='section-title px-10 mt-7 mb-3'>
                {item.sectionTitle}
              </div>
            ) : (
              <Link href={item.path}>
                <div
                  className={`nav-item text-sm px-10 py-2 flex gap-4 my-1
                    ${
                      item.path === '/'
                        ? 'bg-blue-100 border-l-4 border-blue-600'
                        : 'border-l-4 border-transparent'
                    } 
                    ${index === navigationItems.length - 1 ? 'mt-7' : ''}
                  `}>
                  <Image src={item.icon} alt='' width={20} height={20} />
                  <span>{item.title}</span>
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
