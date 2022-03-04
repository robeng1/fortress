import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import { paymentURL } from 'endpoints/urls';

import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import BottomNav from 'components/BottomNav';
import { useAtom } from 'jotai';
import { request, ResponseError } from 'utils/request';
import { UidAtom } from 'store/authorization-atom';
import useShop from 'hooks/use-shop';
import { Link } from 'react-router-dom';

function Domains() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { shop } = useShop();
  const shopId = shop?.shop_id;
  const [accountId] = useAtom(UidAtom);
  const requestURL = `${paymentURL}/${shopId}/accounts/${accountId}`;

  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState<number>(15);

  const query = `SELECT * FROM transaction WHERE account_id = '${accountId}' ORDER BY created_at DESC LIMIT ${
    (page - 1) * itemsPerPage + 1
  }, ${itemsPerPage}`;

  const { data } = useQuery<any, ResponseError>(
    ['transactions', page],
    async () =>
      await request(`${requestURL}/transactions`, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { 'Content-Type': 'application/json' },
      }),
    {
      keepPreviousData: true,
      enabled: !!accountId,
      refetchOnWindowFocus: false,
      staleTime: 2000,
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
        <div className="px-6 py-8 bg-slate-50 border border-slate-200 rounded-sm">
          <div className="text-start">
            <ul className="inline-flex flex-wrap text-sm font-medium">
              <li className="flex items-center">
                <Link
                  to="/settings"
                  className="text-blue-500 hover:text-indigo-500"
                >
                  Settings
                </Link>
                <svg
                  className="h-4 w-4 fill-current text-slate-400 mx-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                </svg>
              </li>
              <li className="flex items-center">
                <Link
                  to="/settings/domains"
                  className="text-slate-500 hover:text-indigo-500"
                >
                  Domains
                </Link>
              </li>
            </ul>
            {/* End */}
          </div>
        </div>

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div>
              <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="p-3">
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="table-auto w-50 md:w-full">
                      {/* Table header */}
                      <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-lg">
                        <tr>
                          <th className="p-2">
                            <div className="font-semibold text-left">Name</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-left">
                              Status
                            </div>
                          </th>
                          
                          <th className="p-2">
                            <div className="font-semibold text-left">
                              Provider
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
                              demo.myreoplex.com
                            </div>
                          </td>
                          <td className="p-2 w-3/6">
                            <div className="text-left text-gray-800">
                              Connected
                            </div>
                          </td>
                          
                          <td className="p-2 w-2/6">
                            <div className="text-left text-gray-800">
                              Reoplex
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

export default Domains;
