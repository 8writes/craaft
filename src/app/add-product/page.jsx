/** @format */

'use client'

import OverviewLayout from '@/layout/UserLayout'
import ProductForm from '@/views/AddProduct/form'

export default function AddProduct() {
  return (
    <OverviewLayout>
      <p className='text-2xl uppercase md:text-3xl font-semibold text-gray-600'>
        Add Product
      </p>
      <ProductForm />
    </OverviewLayout>
  )
}
