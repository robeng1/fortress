import React from 'react';
import { useNavigate } from 'react-router-dom';
import DiscountCard from './DiscountCard';

export default function DiscountList({ handleShow, discounts }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              {discounts.map(discount => (
                <li key={discount.discount_id} className="flex pr-3 py-2">
                  <DiscountCard
                    handleShow={() =>
                      navigate(`/discounts/${discount.discount_id}`)
                    }
                    discount={discount}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
