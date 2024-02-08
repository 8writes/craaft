/** @format */

'use client'

import OverviewLayout from '@/layout/UserLayout'
import ProductForm from '@/views/AddProduct/form'
import Link from 'next/link'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'

export default function AddProduct() {
  return (
    <OverviewLayout>
      <div>
        <p className='flex items-center gap-10 text-indigo-600 text-xl font-semibold'>
          <Link href='products'>
            <ArrowBackIosNewOutlinedIcon />
          </Link>
          Add Product
        </p>
      </div>

      <ProductForm />
    </OverviewLayout>
  )
}
