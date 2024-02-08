/** @format */

'use client'

import OverviewLayout from '@/layout/UserLayout'
import ProductForm from '@/views/AddProduct/form'
import Link from 'next/link'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'

export default function AddProduct() {
  return (
    <OverviewLayout>
      <div className='flex items-center gap-10 '>
        <Link href='products'>
          <span >
            <ChevronLeftRoundedIcon className='font-semibold text-6xl text-indigo-600'/>
          </span>
        </Link>
        <p className=' text-indigo-600 text-2xl font-semibold'>Add Product</p>
      </div>

      <ProductForm />
    </OverviewLayout>
  )
}
