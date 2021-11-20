import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/utils';

function AnalyticsCard08() {
  const chartData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        label: 'Sessions By Device',
        data: [12, 50, 38],
        backgroundColor: [
          tailwindConfig().theme.colors.purple[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.purple[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.purple[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.purple[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 border border-transparent focus:outline-none rounded shadow-2xl bg-white  appearance-none">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Sessions By Device</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default AnalyticsCard08;
