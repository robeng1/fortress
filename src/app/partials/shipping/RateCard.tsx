import * as React from 'react';

export default function LocationCard({ handleShow, rate }) {
  return (
    <>
      <div
        onClick={e => handleShow(true, rate)}
        className="py-1 px-3 mb-4 md:p-5 text-coolGray-800 shadow rounded-lg"
      >
        <div className="flex md:space-y-0 md:space-x-6 align-top">
          <img
            src="https://source.unsplash.com/70x70/?portrait"
            alt=""
            className="md:self-center self-start flex-shrink-0 w-20 h-20 border rounded-sm justify-self-start bg-coolGray-500 border-coolGray-300"
          />

          <div className="flex flex-col px-3 md:px-0">
            <div className="flex md:space-x-6 flex-row">
              <h4 className="text-sm md:text-lg font-semibold text-left">
                {rate.name}
              </h4>
            </div>

            <p className="text-coolGray-600 font-medium text-sm md:text-md">
              {rate.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
