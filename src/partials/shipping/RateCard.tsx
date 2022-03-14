import * as React from 'react';

export default function LocationCard({ handleShow, rate }) {
  return (
    <>
      <div
        onClick={e => handleShow(true, rate)}
        className="py-1 px-3 mb-4 md:p-5 text-coolGray-800 shadow rounded-lg"
      >
        <div className="flex md:space-y-0 md:space-x-6 align-top">
          <div className="flex flex-col px-3 md:px-0">
            <div className="flex md:space-x-6 flex-row">
              <h4 className="text-sm md:text-lg font-semibold text-left">
                {rate.name}
              </h4>
            </div>

            <p className="text-coolGray-600 font-medium text-sm md:text-md">
              {rate.description}
            </p>
            <p className="text-coolGray-600 font-medium text-sm md:text-md">
              {rate && rate.cities && rate.cities.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
