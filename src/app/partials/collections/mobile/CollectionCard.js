import React from 'react';
import Image01 from '../../../images/user-40-01.jpg';

export default function CollectionCard({ collection }) {
  return (
    <>
      <div className="flex-shrink-0 w-[60px] h-[60px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden">
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
              <a href="/">My Collection</a>
            </h3>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p
              className={`text-sm text-gray-500 rounded-full text-center py-0.5`}
            >
              Men, Fashion
            </p>
          </div>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded-full text-center py-0.5`}
          >
            20 items
          </p>
        </div>
      </div>
    </>
  );
}
