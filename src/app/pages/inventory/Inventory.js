import React, { useState } from 'react';

import BottomNav from 'app/components/BottomNav';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import InventoryTable from '../../partials/inventory/InventoryTable';
import PaginationNumeric from '../../components/PaginationNumeric';
import SearchForm from '../../partials/actions/SearchForm';

function Inventories() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

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
            <div className="mt-4 md:mt-8">
              <PaginationNumeric />
            </div>
            <BottomNav />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Inventories;
