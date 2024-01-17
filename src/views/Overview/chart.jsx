/** @format */

import ChartComponent from '@/components/chart'

const Chart = () => {
  const barStyle = () => ({
    display: 'inline-block',
    width: `100%`,
    height: '5px',
    borderRadius: '10px',
    background: `linear-gradient(to right, green 80%, orange 20%)`,
  })

  return (
    <section className='flex font-noto gap-1 px-1'>
      <section className='bg-white grid p-5 w-2/3'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-base font-semibold text-gray-600'>
              Today: {new Date().toDateString()}
            </p>
          </div>
          <div className='flex gap-4 items-center'>
            <div className='flex items-center border p-2 gap-10 cursor-pointer mx-4 rounded-md border-gray-200'>
              <p className='text-xs text-gray-500'>1 Jan - 1 jun </p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='#CCCFD4'
                className='w-3 h-3'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m19.5 8.25-7.5 7.5-7.5-7.5'
                />
              </svg>
            </div>
            <button className='bg-gray-100 rounded-md border border-gray-300 px-1 h-fit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='#CCCFD4'
                className='w-6 h-5.1'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5 8.25 12l7.5-7.5'
                />
              </svg>
            </button>
            <button className='bg-gray-100 rounded-md border border-gray-300 px-1 h-fit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='#CCCFD4'
                className='w-6 h-5.1'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m8.25 4.5 7.5 7.5-7.5 7.5'
                />
              </svg>
            </button>
          </div>
        </div>
        <ChartComponent />
      </section>
      <section className='grid gap-1 w-1/3'>
        <div className='grid bg-white p-5'>
          <p className='font-semibold'>Orders</p>
          <span style={barStyle()}></span>
          <p className='text-sm'>
            Pending Orders:{' '}
            <span className='text-orange-400 font-semibold'>20</span>
          </p>
          <p className='text-sm'>
            Reconciled Orders:{' '}
            <span className='text-green-600 font-semibold'>80</span>
          </p>
          <p className='text-sm'>
            Total Orders:{' '}
            <span className='text-blue-700 font-semibold'>100</span>
          </p>
        </div>
        <div className='grid bg-white p-5'>
          <p className='font-semibold'>Payments</p>
          <span style={barStyle()}></span>
          <p className='text-sm'>
            Un-reconciled Payments:{' '}
            <span className='text-orange-400 font-semibold'>20</span>
          </p>
          <p className='text-sm'>
            Reconciled Payments:{' '}
            <span className='text-green-600 font-semibold'>80</span>
          </p>
          <p className='text-sm'>
            Total Payments:{' '}
            <span className='text-blue-700 font-semibold'>100</span>
          </p>
        </div>
      </section>
    </section>
  )
}

export default Chart
