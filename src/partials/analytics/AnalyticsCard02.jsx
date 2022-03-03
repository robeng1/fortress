import React from 'react';
import LineChart from '../../charts/LineChart04';
import { Link } from 'react-router-dom';

// Import utilities
import { tailwindConfig, hexToRGB, formatThousands } from '../../utils/utils';

function AnalyticsCard02({ liveVisitors, topPages }) {
  const chartData = {
    labels: !!topPages ? topPages.map(s => s.key) : [],
    datasets: [
      // Indigo line
      {
        data: !!topPages ? topPages.map(s => s.value) : [],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.purple[500],
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.purple[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.purple[500],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full xl:col-span-4 border border-transparent focus:outline-none rounded-md shadow-lg bg-white  appearance-none">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Active Users Right Now</h2>
      </header>
      {/* Card content */}
      <div className="flex flex-col h-full">
        {/* Live visitors number */}
        <div className="px-5 py-3">
          <div className="flex items-center">
            {/* Red dot */}
            <div
              className="relative flex items-center justify-center w-4 h-4 rounded-full bg-red-100 mr-3"
              aria-hidden="true"
            >
              <div className="absolute w-1.5 h-1.5 rounded-full bg-red-500"></div>
            </div>
            {/* Vistors number */}
            <div>
              <div className="text-3xl font-bold text-gray-800 mr-2">
                {!!liveVisitors ? formatThousands(liveVisitors) : '-'}
              </div>
              <div className="text-sm text-gray-500">Live visitors</div>
            </div>
          </div>
        </div>

        {/* Chart built with Chart.js 3 */}
        <div>
          {/* Change the height attribute to adjust the chart height */}
          <LineChart data={chartData} width={389} height={70} />
        </div>

        {/* Table */}
        <div className="flex-grow px-5 pt-3 pb-1">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs uppercase text-gray-400">
                <tr>
                  <th className="py-2">
                    <div className="font-semibold text-left">Top pages</div>
                  </th>
                  <th className="py-2">
                    <div className="font-semibold text-right">Active users</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100">
                {!!topPages &&
                  topPages.map(({ key, value }, index) => (
                    <tr key={index}>
                      <td className="py-2">
                        <div className="text-left">{key}</div>
                      </td>
                      <td className="py-2">
                        <div className="font-medium text-right text-gray-800">
                          {formatThousands(value)}
                        </div>
                      </td>
                    </tr>
                  ))}
                {/* Row */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card footer */}
        <div className="text-right px-5 pb-4">
          <Link
            className="text-sm font-medium text-purple-500 hover:text-purple-600"
            to="#0"
          >
            Real-Time Report -&gt;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard02;
