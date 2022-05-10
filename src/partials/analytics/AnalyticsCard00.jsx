import useShop from 'hooks/use-shop';
import React from 'react';
import { mToCurrency, mToSFormatted, sToCurrency, sToM, sToMFromCents } from 'utils/money';

// Import utilities
import { formatThousands } from 'utils/utils';

function AnalyticsCard01({
  grossRevenue,
  netRevenue,
  volume,
  aov,
  totalNewCustomers,
}) {
  const { shop } = useShop();
  return (
    <div className="flex flex-col col-span-full xl:col-span-8 border border-transparent focus:outline-none rounded-md shadow-lg bg-white appearance-none">
      <header className="px-5 py-4 border-b border-gray-100 flex items-center">
        <h2 className="font-semibold text-gray-800">Store</h2>
      </header>
      <div className="px-5 py-5">
        <div className="flex flex-wrap ">
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="text-2xl font-medium text-gray-500 mr-2 mb-2">
                Total Sales
              </div>
              <div className="flex items-center">
                <div className="text-3xl font-medium text-gray-800">
                  {!!grossRevenue
                    ? mToSFormatted(sToMFromCents(grossRevenue, shop?.currency?.iso_code))
                    : '-'}
                </div>
                {/* <div className="text-sm font-medium text-green-500">+49%</div> */}
              </div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="text-2xl font-medium text-gray-500 mr-2 mb-2">
                Net Revenue
              </div>
              <div className="flex items-center">
                <div className="text-3xl font-medium text-gray-800">
                  {!!netRevenue
                    ? mToSFormatted(sToMFromCents(netRevenue, shop?.currency?.iso_code))
                    : '-'}
                </div>
                {/* <div className="text-sm font-medium text-green-500">+49%</div> */}
              </div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="text-2xl font-medium text-gray-500 mr-2 mb-2">
                Total Orders
              </div>
              <div className="flex items-center">
                <div className="text-3xl font-medium text-gray-800">
                  {!!volume ? formatThousands(volume) : '-'}
                </div>
                {/* <div className="text-sm font-medium text-green-500">+7%</div> */}
              </div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="text-2xl font-medium text-gray-500 mr-2">
                AOV
              </div>
              <div className="flex items-center">
                <div className="text-3xl font-medium text-gray-800">
                  {!!aov
                    ? mToSFormatted(sToMFromCents(aov, shop?.currency?.iso_code))
                    : '-'}
                </div>
                {/* <div className="text-sm font-medium text-yellow-500">-7%</div> */}
              </div>
            </div>
            <div
              className="hidden md:block w-px h-8 bg-gray-200 mr-5"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard01;
