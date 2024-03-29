import React from "react"
import PolarChart from "../../charts/PolarChart"

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/utils"

function AnalyticsCard10() {
  const chartData = {
    labels: ["Males", "Females", "Unknown"],
    datasets: [
      {
        label: "Sessions By Gender",
        data: [500, 326, 242],
        backgroundColor: [
          `rgba(${hexToRGB(tailwindConfig().theme.colors.purple[500])}, 0.8)`,
          `rgba(${hexToRGB(tailwindConfig().theme.colors.purple[400])}, 0.8)`,
          `rgba(${hexToRGB(tailwindConfig().theme.colors.green[500])}, 0.8)`,
        ],
        hoverBackgroundColor: [
          `rgba(${hexToRGB(tailwindConfig().theme.colors.purple[600])}, 0.8)`,
          `rgba(${hexToRGB(tailwindConfig().theme.colors.purple[500])}, 0.8)`,
          `rgba(${hexToRGB(tailwindConfig().theme.colors.green[600])}, 0.8)`,
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 border border-transparent focus:outline-none rounded-md shadow-lg bg-white  appearance-none">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Sessions By Gender</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <PolarChart data={chartData} width={389} height={260} />
    </div>
  )
}

export default AnalyticsCard10
