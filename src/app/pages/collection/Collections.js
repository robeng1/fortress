import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import SearchForm from '../../partials/actions/SearchForm';
import FilterButton from '../../components/DropdownFilter';
import CollectionsTable from '../../partials/collections/CollectionsTable';
import PaginationClassic from '../../components/PaginationClassic';

function Products() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showForm, setShowForm] = React.useState(false);

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
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          location="Collections"
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="py-2 md:py-8 w-full max-w-9xl mx-auto">
              <div className="sm:flex sm:justify-between sm:items-center">
                <div className="flex justify-between gap-2 w-full">
                  {/* Search form */}
                  <div className="flex justify-start gap-2">
                    <SearchForm placeholder="Search collections..." />
                    <div className="">
                      <FilterButton align="right" />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn bg-blue-900 hover:bg-indigo-600 text-white"
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">
                      Create Collection
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <CollectionsTable selectedItems={handleSelectedItems} />

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;
