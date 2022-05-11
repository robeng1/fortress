import React from 'react';
import { VoucherType } from 'typings/voucher/voucher';

type VoucherCardProps ={
  voucher: VoucherType
  handleShow?: (show?: boolean) => void
}

const VoucherCard: React.FC<VoucherCardProps> = ({ voucher, handleShow }) => {
  return (
    <>
      {/* <div
        onClick={handleShow}
        className="flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden"
      >
      </div> */}

      <div className="ml-2 flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="/">{voucher.code}</a>
            </h3>
          </div>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded-full text-center py-0.5`}
          >
            Used {voucher.num_cart_additions} times
          </p>
          <p className="ml-4 text-sm text-gray-500">{voucher.name}</p>
        </div>
      </div>
    </>
  );
}
export default VoucherCard;