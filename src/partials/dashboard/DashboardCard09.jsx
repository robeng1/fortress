import React from "react"
import Tooltip from "../../components/tooltip"
import BarChart from "../../charts/BarChart02"

// Import utilities
import { tailwindConfig } from "../../utils/utils"

function DashboardCard09() {
  const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
    ],
    datasets: [
      // Light purple bars
      {
        label: "Stack 1",
        data: [6200, 9200, 6600, 8800, 5200, 9200],
        backgroundColor: tailwindConfig().theme.colors.purple[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // purple bars
      {
        label: "Stack 2",
        data: [-4000, -2600, -5350, -4000, -7500, -2000],
        backgroundColor: tailwindConfig().theme.colors.purple[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100 flex items-center">
        <h2 className="font-semibold text-gray-800">Sales VS Refunds</h2>
        <Tooltip className="ml-2" size="lg">
          <div className="text-sm">
            Sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit.
          </div>
        </Tooltip>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 mr-2">+$6,796</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full">
            -34%
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="flex-grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={248} />
      </div>
    </div>
  )
}

export default DashboardCard09
