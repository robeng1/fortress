import React from 'react';
import { TransactionViewType } from 'typings/payment/transaction-type';
import { mToSFormatted } from 'utils/money';

type TransactionItemItemProps = {
  txn: TransactionViewType
}
const TransactionItem: React.FC<TransactionItemItemProps> = ({ txn }) => {
  return (
    <div
      className={`shadow-lg rounded-sm border px-5 py-4 bg-white border-slate-200`}
    >
      <div className="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
        {/* Left side */}
        <div className="flex items-start space-x-2 md:space-x-4">
          <div className="w-9 h-9 shrink-0 mt-1">
            <div className="w-8 h-8 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white uppercase">{txn.txn_kind.charAt(0)}</div>
          </div>
          <div>
            <div className="text-sm">{txn.description}</div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center space-x-2 md:space-x-4 pl-3 md:pl-0">
          <div className="text-sm text-slate-500 italic whitespace-nowrap">{new Date(txn.created_at).toLocaleDateString()}</div>
          {txn.txn_kind && (
            <div
              className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${txn.txn_kind === 'CREDIT' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                }`}
            >
              {txn.txn_kind}
            </div>
          )}
          
          <div className={`text-right text-gray-800 ${txn.minor_amount < 0 ? "text-gray-800 " : "text-green-500"}`}>
            {txn.minor_amount < 0 ? "-" : "+"}{mToSFormatted({ amount: txn.minor_amount, currency: txn.currency })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;