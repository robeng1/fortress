import { formatThousands } from 'utils/utils';
import React from 'react';
import { Link } from 'react-router-dom';

function AnalyticsCard07({ topCities }) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 border border-transparent focus:outline-none rounded shadow-lg bg-white appearance-none">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Top Locations</h2>
      </header>
      <div className="flex-grow p-3">
        <div className="flex flex-col h-full">
          {/* Card content */}
          <div className="flex-grow">
            <ul className="flex justify-between text-xs uppercase text-gray-400 font-semibold px-2 space-x-2">
              <li>Source</li>
              <li>Sessions</li>
            </ul>

            <ul className="space-y-1 text-sm text-gray-800 mt-3 mb-4">
              {!!topCities &&
                topCities.map(({ key, value }, index) => (
                  <li className="relative px-2 py-1" key={index}>
                    <div
                      className="bg-light-purple-100"
                      aria-hidden="true"
                      style={{ width: `${100 - 10 * index}%` }}
                    ></div>
                    <div className="relative flex justify-between space-x-2">
                      <div>{key}</div>
                      <div className="font-medium">
                        {formatThousands(value)}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          {/* Card footer */}
          <div className="text-center pt-4 pb-1 border-t border-gray-100">
            <Link
              className="text-sm font-medium text-purple-500 hover:text-purple-600"
              to="#0"
            >
              Locations Report -&gt;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard07;
