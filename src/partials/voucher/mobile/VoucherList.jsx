import React from 'react';
import { useNavigate } from 'react-router-dom';
import VoucherCard from './VoucherCard';

export default function DiscountList({ handleShow, vouchers }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              {vouchers.map(voucher => (
                <li key={voucher.voucher_id} className="flex pr-3 py-2">
                  <VoucherCard
                    handleShow={() =>
                      navigate(`/vouchers/${voucher.voucher_id}`)
                    }
                    voucher={voucher}
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
