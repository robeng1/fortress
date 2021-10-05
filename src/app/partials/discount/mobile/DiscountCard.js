import React from 'react';
import Image01 from '../../../images/user-40-01.jpg';

export default function DiscountCard() {
  return (
    <>
      <div className="flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden">
        <img
          src={Image01}
          alt={''}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-2 flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="/">SPRINGSALE</a>
            </h3>
          </div>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded-full text-center px-2.5 py-0.5`}
          >
            Used 20 times
          </p>
          <p className="ml-4 text-sm text-gray-500">Active</p>
        </div>
      </div>
    </>
  );
}
