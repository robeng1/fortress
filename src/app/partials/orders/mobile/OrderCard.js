import * as React from 'react';

import Image01 from '../../../images/user-40-01.jpg';
export default function OrderCard({ handleShow }) {
  return (
    <div onClick={() => handleShow(true, '')} className="block w-full">
      <div className="w-full flex flex-grow justify-between text-base font-medium text-gray-900">
        <p className={`text-sm text-gray-900 text-center`}>#22 15 Apr</p>
        <p className="ml-4 font-medium text-green-500">$12.00</p>
      </div>
      <div className="">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a
                className="inline-flex font-medium rounded-md text-center px-2.5 py-0.5 bg-green-100 text-green-600"
                href="/"
              >
                Delivered
              </a>
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex flex-col justify-between">
          <div className="text-sm font-medium text-gray-800">
            Peter Pan, Accra, Ghana
          </div>
          <div className="flex text-base font-medium text-gray-900">
            <p
              className={`text-sm text-gray-500 rounded-full text-center px-2.5`}
            >
              2 items
            </p>
          </div>
        </div>
        <div className="flex flex-shrink-0 -space-x-3 -ml-px align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden">
          <img
            src={Image01}
            alt={''}
            width="32"
            height="32"
            className="rounded-full border-2 border-white box-content"
          />
          <img
            src={Image01}
            alt={''}
            width="32"
            height="32"
            className="rounded-full border-2 border-white box-content"
          />
          <img
            src={Image01}
            alt={''}
            width="32"
            height="32"
            className="rounded-full border-2 border-white box-content"
          />
        </div>
      </div>
    </div>
  );
}
