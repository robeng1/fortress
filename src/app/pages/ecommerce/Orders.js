import React, { useState } from 'react';

import BottomNav from 'app/components/BottomNav';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import SearchForm from '../../partials/actions/SearchForm';
import OrdersTable from '../../partials/orders/OrdersTable';
import Order from 'app/partials/orders/Order';
import PaginationClassic from '../../components/PaginationClassic';

function Orders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOrder, setShowOrder] = useState(false);

  const handleSelectedItems = selectedItems => {
    setSelectedItems([...selectedItems]);
  };

  const handleShow = (display, orderId) => {
    setShowOrder(display);
    // TODO: set the currently showing order here
  };

  const renderList = () => {
    return (
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
          <div className="md:hidden mb-3">
            <SearchForm className="w-full" placeholder="Search order number…" />
          </div>
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-3">
            {/* Right: Actions */}
            <div className="flex justify-between sm:auto-cols-max w-full gap-2">
              {/* Search form */}
              <div className="flex flex-grow justify-start gap-2">
                <div className="hidden md:block">
                  <SearchForm
                    className="w-full"
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
              <button className="btn bg-purple-700 hover:bg-indigo-600 text-white">
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
          <div className="sm:flex sm:justify-between sm:items-center mb-5">
            {/* Left side */}
            <div className="mb-4 sm:mb-0 hidden md:block">
              <ul className="flex flex-wrap -m-1">
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                    New <span className="ml-1 text-gray-400">14</span>
                  </button>
                </li>
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                    Processing <span className="ml-1 text-gray-400">34</span>
                  </button>
                </li>
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                    Dispatched <span className="ml-1 text-gray-400">19</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Table */}
          <OrdersTable
            handleShow={handleShow}
            selectedItems={handleSelectedItems}
          />

          {/* Pagination */}
          <div className="mt-8">
            <PaginationClassic />
          </div>
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

        {showOrder ? <Order handleShow={handleShow} /> : renderList()}
      </div>
      <BottomNav />
    </div>
  );
}

export default Orders;
