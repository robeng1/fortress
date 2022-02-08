import React from 'react';

// Import utilities
import { formatThousands } from 'utils/utils';

function AnalyticsCard01({
  grossRevenue,
  netRevenue,
  totalSales,
  totalCustomers,
  totalNewCustomers,
}) {
  return (
    <div className="flex flex-col col-span-full xl:col-span-8 border border-transparent focus:outline-none rounded-md shadow-lg bg-white appearance-none">
      <header className="px-5 py-4 border-b border-gray-100 flex items-center">
        <h2 className="font-semibold text-gray-800">Store</h2>
      </header>
      <div className="px-5 py-5">
        <div className="flex flex-wrap ">
          {/* Unique Visitors */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="text-2xl font-medium text-gray-500 mr-2 ">
                Gross revenue
              </div>
              <div className="flex items-center">
                <div className="text-sm text-gray-500">
                  {!!grossRevenue
                    ? formatThousands(grossRevenue)
                    : 'No earnings yet'}
                </div>
                {/* <div className="text-sm font-medium text-green-500">+49%</div> */}
              </div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          {/* Unique Visitors */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="text-2xl font-medium text-gray-500 mr-2 ">
                Net revenue
              </div>
              <div className="flex items-center">
                <div className="text-sm text-gray-500">
                  {!!netRevenue
                    ? formatThousands(netRevenue)
                    : 'No revenue yet'}
                </div>
                {/* <div className="text-sm font-medium text-green-500">+49%</div> */}
              </div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          {/* Total Pageviews */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="text-2xl font-medium text-gray-500 mr-2">
                Sales
              </div>
              <div className="flex items-center">
                <div className="text-sm text-gray-500">
                  {!!totalSales ? formatThousands(totalSales) : 'No orders yet'}
                </div>
                {/* <div className="text-sm font-medium text-green-500">+7%</div> */}
              </div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          {/* Bounce Rate */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="text-2xl font-medium text-gray-500 mr-2">
                Total customers
              </div>
              <div className="flex items-center">
                <div className="text-sm text-gray-500">
                  {!!totalCustomers
                    ? formatThousands(totalCustomers)
                    : 'No customers yet'}
                </div>
                {/* <div className="text-sm font-medium text-yellow-500">-7%</div> */}
              </div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          {/* Visit Duration*/}
          <div className="flex items-center">
            <div>
              <div className="text-2xl font-medium text-gray-500 mr-2">
                New customers
              </div>
              <div className="flex items-center">
                <div className="text-sm text-gray-500">
                  {!!totalNewCustomers
                    ? formatThousands(totalNewCustomers)
                    : 'No new customers'}
                </div>
                {/* <div className="text-sm font-medium text-yellow-500">+7%</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard01;
