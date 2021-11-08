import React, { useState } from 'react';

import BottomNav from 'app/components/BottomNav';
import Sidebar from 'app/partials/Sidebar';
import Header from 'app/partials/Header';
// import DeleteButton from 'app/partials/actions/DeleteButton';
// import DateSelect from 'app/components/DateSelect';
import FilterButton from 'app/components/DropdownFilter';
import InventoryTable from 'app/partials/inventory/InventoryTable';
import PaginationNumeric from 'app/components/PaginationNumeric';
import SearchForm from 'app/partials/actions/SearchForm';
import { selectHasRecords } from 'app/features/inventory/selectors';
import { useDispatch, useSelector } from 'react-redux';

function Inventories() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedItems, setSelectedItems] = useState([]);
  const hasRecords = useSelector(selectHasRecords);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const handleSelectedItems = selectedItems => {
    setSelectedItems([...selectedItems]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        location="Inventory"
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          location="Inventory"
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max md:justify-start justify-between gap-2">
                {/* Search form */}
                <SearchForm placeholder="Search inventory" />
                <div className="block">
                  <FilterButton align="right" />
                </div>
              </div>
            </div>

            {/* Table */}
            <InventoryTable selectedItems={handleSelectedItems} />

            {/* Pagination */}
            {hasRecords && (
              <div className="mt-4 md:mt-8">
                <PaginationNumeric />
              </div>
            )}
            <BottomNav />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Inventories;
