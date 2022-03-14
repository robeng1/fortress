import * as React from 'react';

export default function LocationCard({ handleShow, location }) {
  return (
    <>
      <div
        onClick={e => handleShow(true, location.centre_id)}
        className="py-1 px-3 mb-4 md:p-5 text-coolGray-800 shadow rounded-lg"
      >
        <div className="flex md:space-y-0 md:space-x-6 align-top">

          <div className="flex flex-col px-3 md:px-0">
            <div className="flex md:space-x-6 flex-row">
              <h4 className="text-sm md:text-lg font-semibold text-left">
                {location.name}
              </h4>
              <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full hidden md:block">
                Default
              </span>
            </div>

            <p className="text-coolGray-600 font-medium text-sm md:text-md">
              {location.description}
            </p>
            {/* <p className="text-coolGray-600 font-medium text-sm md:text-md">
              +12345678901321
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
