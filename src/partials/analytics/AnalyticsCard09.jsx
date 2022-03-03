import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/utils';

function AnalyticsCard09() {
  const chartData = {
    labels: ['<18', '18-24', '24-36', '>35'],
    datasets: [
      {
        label: 'Visit By Age Category',
        data: [30, 50, 5, 15],
        backgroundColor: [
          tailwindConfig().theme.colors.purple[500],
          tailwindConfig().theme.colors.purple[400],
          tailwindConfig().theme.colors.red[500],
          tailwindConfig().theme.colors.green[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.purple[600],
          tailwindConfig().theme.colors.purple[500],
          tailwindConfig().theme.colors.red[600],
          tailwindConfig().theme.colors.green[600],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 border border-transparent focus:outline-none rounded-md shadow-lg bg-white  appearance-none">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Sessions By Age</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default AnalyticsCard09;
