/** @format */

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { faker } from '@faker-js/faker'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
          },
      position: 'top',
    },
    y: {
      display: false,
    },
  },
}

const ChartComponent = () => {   

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const chartData = {
      labels,
      datasets: [
        {
          fill: true,
          label: 'Dataset 2',
          data: labels.map(() => faker.datatype.number({ min: 40, max: 80 })),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }

  return <Line options={options} type='line' data={chartData} />
}

export default ChartComponent

