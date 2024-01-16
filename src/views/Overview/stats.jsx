/** @format */

import Image from 'next/image'
import graph from '../../../public/graph.svg'

const Stats = () => {
  const statsItems = [
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
    <section className='mx-auto my-10 px-5 md:flex flex-wrap h-fit hidden'>
      {statsItems.map((item, index) => (
        <div key={index}>
          <div
            className={`stats-item bg-white text-sm px-2 2xl:mx-3 py-3 gap-4 flex mx-1 my-2`}>
            <div className='grid'>
              <p className='text-xs'>{item.title}</p>
              <p className='font-semibold text-gray-700'>{item.value}</p>
            </div>
            <Image src={item.icon} alt='' width={60} height={60} />
          </div>
        </div>
      ))}
    </section>
  )
}

export default Stats
