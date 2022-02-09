import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import { paymentURL } from 'endpoints/urls';

import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import FilterButton from 'components/DropdownFilter';
import BottomNav from 'components/BottomNav';
import { useAtom } from 'jotai';
import { shopIdAtom } from 'store/shop';
import { request, ResponseError } from 'utils/request';
import { accountIdAtom } from 'store/authorization-atom';
import { accountAtom } from 'store/payment';
import DateSelect from 'components/DateSelect';

function Payouts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shopId] = useAtom(shopIdAtom);
  const [account] = useAtom(accountAtom);
  const [accountId] = useAtom(accountIdAtom);
  const requestURL = `${paymentURL}/${shopId}/accounts/${accountId}`;

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState<number>(15);

  const query = `SELECT * FROM transaction WHERE account_id = '${accountId}' ORDER BY created_at DESC LIMIT ${
    (page - 1) * itemsPerPage + 1
  }, ${itemsPerPage}`;

  const { data } = useQuery<any, ResponseError>(
    ['payouts', page],
    async () =>
      await request(`${requestURL}/transactions`, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { 'Content-Type': 'application/json' },
      }),
    { keepPreviousData: true, enabled: !!accountId },
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

              {/* Right side */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Dropdown */}
                <DateSelect />
                {/* Filter button */}
                <FilterButton align="right" />
              </div>
            </div>

            <div>
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
                        {/* Row */}
                        <tr>
                          <td className="p-2 w-1/6">
                            <div className="text-left text-gray-800">
                              Yesterday
                            </div>
                          </td>
                          <td className="p-2 w-3/6">
                            <div className="flex items-center">
                              <div className="text-gray-800">For order</div>
                            </div>
                          </td>
                          <td className="p-2 w-2/6">
                            <div className="text-right text-gray-800">
                              $3,877
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            {data && (
              <Pagination
                count={data?.total / itemsPerPage}
                variant="outlined"
                color="primary"
                className="mt-4 md:mt-8"
                page={page}
                onChange={(event: ChangeEvent<unknown>, page: number) =>
                  setPage(page)
                }
              />
            )}
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

export default Payouts;