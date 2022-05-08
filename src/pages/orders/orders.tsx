import React, { ChangeEvent, lazy, useState } from 'react';
import { useQuery } from 'react-query';
import isEmpty from 'lodash/isEmpty';
import Pagination from '@mui/material/Pagination';
import BottomNav from 'components/bottom-navigation';
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import DeleteButton from 'partials/actions/DeleteButton';
import DateSelect from 'components/date-select';
import FilterButton from 'components/dropdown-filter';
import SearchForm from 'partials/actions/SearchForm';
import { fortressURL } from 'endpoints/urls';
import OrdersTable from 'partials/orders/order-table';
import Order from 'partials/orders/order-manager';
import useShop from 'hooks/use-shop';
import { ThemeProvider } from 'styles/material/theme';
import { request } from 'utils/request';

function Orders() {
  const { shop } = useShop();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [showOrder, setShowOrder] = useState<Boolean>(false);
  const [currentlyShowingOrderId, setCurrentlyShowingOrderId] = useState<
    string | undefined
  >();

  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  const query = `SELECT * FROM "order" WHERE shop_id = '${
    shop?.shop_id
  }' ORDER BY updated_at DESC LIMIT ${
    (page - 1) * (itemsPerPage + 1)
  }, ${itemsPerPage}`;

  const { data } = useQuery(
    ['orderviews', page],
    async () => {
      try {
        const views = await request(
          `${fortressURL}/shops/${shop?.shop_id}/order-views`,
          {
            method: 'POST',
            body: JSON.stringify(query),
            headers: { 'Content-Type': 'application/json' },
          },
        );
        return views;
      } catch (error) {}
    },

    { keepPreviousData: true, enabled: !!shop?.shop_id },
  );

  const handleSelectedItems = (selectedItems: any) => {
    setSelectedItems([...selectedItems]);
  };

  const handleShow = (display: Boolean, orderId?: string) => {
    setCurrentlyShowingOrderId(orderId);
    setShowOrder(display);
  };

  const orders = data?.orders;
  const renderList = () => {
    return (
      <main className="mb-10 md:mb-0">
        <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
          <div className="md:hidden mb-3">
            <SearchForm
              // className="w-full"
              placeholder="Search order number…"
            />
          </div>
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-3">
            {/* Right: Actions */}
            <div className="flex justify-between sm:auto-cols-max w-full gap-2">
              {/* Search form */}
              <div className="flex flex-grow justify-start gap-2">
                <div className="hidden md:block">
                  <SearchForm
                    // className="w-full"
                    placeholder="Search order number…"
                  />
                </div>

                {/* Right side */}
                <div className="grid grid-flow-col sm:auto-cols-max md:justify-start  justify-between gap-2">
                  {/* Delete button */}
                  <DeleteButton selectedItems={selectedItems} />
                  {/* Dropdown */}
                  <DateSelect />
                  {/* Filter button */}
                  <FilterButton align="right" />
                </div>
              </div>

              {/* Add member button */}
              <button className="btn bg-purple-600 hover:bg-purple-600 text-white">
                <svg
                  className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden xs:block ml-2">Create Order</span>
              </button>
            </div>
          </div>

          {/* More actions */}
          {data && (
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left side */}
              <div className="mb-4 sm:mb-0 hidden md:block">
                <ul className="flex flex-wrap -m-1">
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent focus:outline-none shadow-lg bg-white appearance-none text-gray-500 duration-150 ease-in-out">
                      New <span className="ml-1 text-gray-400">14</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent focus:outline-none shadow-lg bg-white appearance-none text-gray-500 duration-150 ease-in-out">
                      Processing <span className="ml-1 text-gray-400">34</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent focus:outline-none shadow-lg bg-white appearance-none text-gray-500 duration-150 ease-in-out">
                      Dispatched <span className="ml-1 text-gray-400">19</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Table */}
          <OrdersTable
            handleShow={handleShow}
            selectedItems={handleSelectedItems}
            orders={data?.views || []}
          />

          {/* Pagination */}
          {!isEmpty(orders) && data?.total > itemsPerPage && (
            <ThemeProvider>
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
            </ThemeProvider>
          )}
        </div>
      </main>
    );
  };

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
          location="Orders"
        />

        {showOrder ? (
          <Order id={currentlyShowingOrderId} handleShow={handleShow} />
        ) : (
          renderList()
        )}
        <BottomNav />
      </div>
    </div>
  );
}

export default Orders;
