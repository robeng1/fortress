import React from 'react';
import DiscountCard from './DiscountCard';

export default function DiscountList() {
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              <li className="flex pr-3 py-2">
                <DiscountCard />
              </li>
              <li className="flex pr-3 py-2">
                <DiscountCard />
              </li>
              <li className="flex pr-3 py-2">
                <DiscountCard />
              </li>
              <li className="flex pr-3 py-2">
                <DiscountCard />
              </li>
              <li className="flex pr-3 py-2">
                <DiscountCard />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
