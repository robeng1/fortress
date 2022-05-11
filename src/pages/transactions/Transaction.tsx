import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import { paymentURL } from 'endpoints/urls';

import Sidebar from 'partials/sidebar';
import Header from 'partials/header';
import FilterButton from 'components/dropdown-filter';
import BottomNav from 'components/bottom-navigation';
import { useAtom } from 'jotai';
import { request, ResponseError } from 'utils/request';
import { uidAtom } from 'store/authorization-atom';
import DateSelect from 'components/date-select';
import useShop from 'hooks/use-shop';
import { ThemeProvider } from 'styles/material/theme';
import usePayment from 'hooks/use-payment';
import { TransactionViewType } from 'typings/payment/transaction-type';
import { mToSFormatted } from 'utils/money';
import ThreeDots from 'components/ui/loaders/three-dots';
import TransactionItem from 'partials/balance/transaction-item';

function Transactions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { shop } = useShop();
  const shopId = shop?.shop_id;
  const [accountId] = useAtom(uidAtom);
  const { shopAccount: paymentAccount } = usePayment();
  const requestURL = `${paymentURL}/${shopId}/accounts/${accountId}`;

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState<number>(15);

  const query = `SELECT * FROM transaction WHERE account_id = '${paymentAccount?.account_id}' ORDER BY created_at DESC LIMIT ${((page - 1) * itemsPerPage + 1) - 1
    }, ${itemsPerPage}`;

  const { data, isLoading } = useQuery<TransactionViewType[], ResponseError>(
    ['transactions', page],
    async () => {
      try {
        const resp = await request(`${requestURL}/transactions`, {
          method: 'POST',
          body: JSON.stringify(query),
          headers: { 'Content-Type': 'application/json' },
        });
        return resp;
      } catch (error) { }
    },

    {
      keepPreviousData: true,
      enabled: !!accountId && !!paymentAccount?.account_id,
    },
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          location="Transactions"
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* More actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left side */}
              <div className="mb-4 sm:mb-0">
                <ul className="flex flex-wrap -m-1">
                  <li className="m-1">
                    <button className="inline-flex cursor-pointer items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                      All <span className="ml-1 text-indigo-200">67</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex cursor-pointer items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                      Credits <span className="ml-1 text-gray-400">14</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex cursor-pointer items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                      Debits <span className="ml-1 text-gray-400">34</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Right side */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Dropdown */}
                <DateSelect />
                {/* Filter button */}
                {/* <FilterButton align="right" /> */}
              </div>
            </div>
            {isLoading &&
              <div className="sm:flex sm:items-center justify-center">
                <ThreeDots />
              </div>
            }
            {!isLoading && <>
              <div className='hidden lg:block'>
                <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-lg border border-gray-200">
                  <div className="p-3">
                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full">
                        {/* Table header */}
                        <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-lg">
                          <tr>
                            <th className="p-2">
                              <div className="font-semibold text-left">Date</div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-left">
                                Description
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="font-semibold text-right">
                                Amount
                              </div>
                            </th>
                          </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-xs sm:text-sm font-medium divide-y divide-gray-100">
                          {data && data.map((txn, index) =>
                            <tr key={index}>
                              <td className="p-2 w-1/6">
                                <div className="text-left text-gray-500">
                                  {new Date(txn.created_at).toDateString()}
                                </div>
                              </td>
                              <td className="p-2 w-3/6">
                                <div className="flex items-center">
                                  <div className="text-gray-500">{txn.description}</div>
                                </div>
                              </td>
                              <td className="p-2 w-2/6">
                                <div className={`text-right text-gray-800 ${txn.minor_amount < 0 ? "text-gray-800 " : "text-green-500"}`}>
                                  {txn.minor_amount < 0 ? "-" : "+"}{mToSFormatted({ amount: txn.minor_amount, currency: txn.currency })}
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className='block lg:hidden space-y-2'>
                {data && data.map((txn, index) =>
                  <TransactionItem key={index} txn={txn} />
                )}
              </div>
            </>}



          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}

export default Transactions;
