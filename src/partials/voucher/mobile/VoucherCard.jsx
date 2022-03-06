import React from 'react';

export default function VoucherCard({ voucher, handleShow }) {
  return (
    <>
      <div
        onClick={() => handleShow(true, voucher.discount_id)}
        className="flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden"
      >
        {voucher.image && (
          <img
            className="w-full h-full object-center object-cover"
            src={voucher.image?.image_url}
            alt={voucher.name}
          />
        )}
      </div>

      <div className="ml-2 flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="/">{voucher.name}</a>
            </h3>
          </div>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded-full text-center py-0.5`}
          >
            Used {voucher.num_applications} times
          </p>
          <p className="ml-4 text-sm text-gray-500">{voucher.status}</p>
        </div>
      </div>
    </>
  );
}
