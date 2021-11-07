import React from 'react';
import { useSelector } from 'react-redux';
import { selectDiscountViews } from 'app/features/discount/selectors';
import DiscountCard from './DiscountCard';

export default function DiscountList({ handleShow }) {
  const discounts = useSelector(selectDiscountViews);
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              {discounts.map(discount => (
                <li key={discount.discount_id} className="flex pr-3 py-2">
                  <DiscountCard handleShow={handleShow} discount={discount} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
