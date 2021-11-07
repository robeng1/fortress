import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectHasOrders } from 'app/features/order/selectors';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
// import DeleteButton from '../partials/actions/DeleteButton';
// import DateSelect from '../partials/actions/DateSelect';
// import FilterButton from '../partials/actions/FilterButton';
import OrdersTable from '../partials/orders/OrdersTable';
import PaginationClassic from '../partials/PaginationClassic';

function Orders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const hasOrders = useSelector(selectHasOrders);
  console.log(hasOrders);

  const handleSelectedItems = selectedItems => {
    setSelectedItems([...selectedItems]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                  Orders
                </h1>
              </div>
            </div>

            {/* Table */}
            <OrdersTable selectedItems={handleSelectedItems} />

            {/* Pagination */}
            {hasOrders && (
              <div className="mt-8">
                <PaginationClassic />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Orders;
