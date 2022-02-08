import React from 'react';

export default function DiscountCard({ discount, handleShow }) {
  return (
    <>
      <div
        onClick={() => handleShow(true, discount.discount_id)}
        className="flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden"
      >
        <img
          src={discount.cover_photo}
          alt={discount.name}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-2 flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="/">{discount.name}</a>
            </h3>
          </div>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded-full text-center px-2.5 py-0.5`}
          >
            Used {discount.num_applications} times
          </p>
          <p className="ml-4 text-sm text-gray-500">{discount.status}</p>
        </div>
      </div>
    </>
  );
}
