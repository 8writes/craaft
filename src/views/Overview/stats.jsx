/** @format */

import Image from 'next/image'
import graph from '../../../public/graph.svg'

const Stats = () => {
  const statsItems1 = [
    {
      title: 'Daily Transaction Volume',
      icon: graph,
      value: '2,342',
    },
    {
      title: 'Daily Transaction Volume',
      icon: graph,
      value: '4,000,000',
    },
  ]
  const statsItems2 = [
    {
      title: 'Total Transaction Volume',
      icon: graph,
      value: '452,000',
    },
    {
      title: 'Total Transaction Value',
      icon: graph,
      value: '4,000,000',
    },
  ]

  return (
    <section className='my-10 gap-5 2xl:gap-10 mx-auto w-full  justify-between font-noto md:flex h-fit hidden'>
      <div className='flex gap-2'>
        {statsItems1.map((item, index) => (
          <div key={index}>
            <div
              className={`stats-item bg-white w-full text-sm px-4 py-5 gap-4 flex my-2`}>
              <div className='grid'>
                <p className='text-xs text-gray-500'>{item.title}</p>
                <p className='font-semibold text-gray-700'>{item.value}</p>
              </div>
              <Image
                src={item.icon}
                alt=''
                width={70}
                height={45}
                loading='lazy'
              />
            </div>
          </div>
        ))}
      </div>
      <div className='flex gap-2'>
        {statsItems2.map((item, index) => (
          <div key={index}>
            <div
              className={`stats-item bg-white w-full text-sm px-4 py-5 gap-4 flex my-2`}>
              <div className='grid'>
                <p className='text-xs text-gray-500'>{item.title}</p>
                <p className='font-semibold text-gray-700'>{item.value}</p>
              </div>
              <Image
                src={item.icon}
                alt=''
                width={70}
                height={45}
                loading='lazy'
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
