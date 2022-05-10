import React from 'react';
import LineChart from '../../charts/LineChart03';

// Import utilities
import {
  tailwindConfig,
  hexToRGB,
  formatThousands,
  formatDuration,
} from '../../utils/utils';

function AnalyticsCard01({
  uniqueVisitors,
  totalPageViews,
  visitDuration,
  bounceRate,
  visitorsDataset,
}) {
  const chartData = {
    labels: !!visitorsDataset ? visitorsDataset.map(ds => ds.key) : [],
    datasets: [
      // Indigo line
      {
        label: 'Current',
        data: !!visitorsDataset ? visitorsDataset.map(ds => ds.value) : [],
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
      },
      // Gray line
      {
        label: 'Previous',
        data: !!visitorsDataset ? visitorsDataset.map(ds => ds.value) : [],
        borderColor: tailwindConfig().theme.colors.gray[300],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.gray[300],
      },
    ],
  };
  return (
    <div className="flex flex-col col-span-full xl:col-span-8 border border-transparent focus:outline-none rounded-md shadow-lg bg-white  appearance-none">
      <header className="px-5 py-4 border-b border-gray-100 flex items-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Website</h2>
      </header>
      <div className="px-5 py-1">
        <div className="flex flex-wrap">
          {/* Unique Visitors */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-gray-800 mr-2">
                  {!!uniqueVisitors ? formatThousands(uniqueVisitors) : '-'}
                </div>
                {/* <div className="text-sm font-medium text-green-500">+49%</div> */}
              </div>
              <div className="text-sm text-gray-500">Unique Visitors</div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          {/* Total Pageviews */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-gray-800 mr-2">
                  {!!totalPageViews ? formatThousands(totalPageViews) : '-'}
                </div>
                {/* <div className="text-sm font-medium text-green-500">+7%</div> */}
              </div>
              <div className="text-sm text-gray-500">Total Pageviews</div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          {/* Bounce Rate */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-gray-800 mr-2">
                  {!!bounceRate ? `${bounceRate}%` : '-'}
                </div>
                {/* <div className="text-sm font-medium text-yellow-500">-7%</div> */}
              </div>
              <div className="text-sm text-gray-500">Bounce Rate</div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          {/* Visit Duration*/}
          <div className="flex items-center">
            <div>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-gray-800 mr-2">
                  {!!visitDuration ? formatDuration(visitDuration) : '-'}
                </div>
                {/* <div className="text-sm font-medium text-yellow-500">+7%</div> */}
              </div>
              <div className="text-sm text-gray-500">Visit Duration</div>
            </div>
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="flex-grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={800} height={300} />
      </div>
    </div>
  );
}

export default AnalyticsCard01;
