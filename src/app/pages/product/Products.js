import React, { useState } from 'react';
import ProductForm from 'app/forms/product/Product';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import ProductsTable from '../../partials/products/ProductsTable';
import PaginationClassic from '../../components/PaginationClassic';

function Products() {
  const [showForm, setShowForm] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = selectedItems => {
    setSelectedItems([...selectedItems]);
  };

  const renderForm = () => {
    return (
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Page header */}
          <div className="sm:flex sm:justify-start sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <div className="m-1.5">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn border-gray-200 hover:border-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mb-4 sm:mb-0">
              <h2>Hot Sauce Pepper Mint</h2>
            </div>
          </div>

          {/* Form */}
          <ProductForm />
        </div>
      </main>
    );
  };

  const renderProducts = () => {
    return (
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                All products
              </h1>
            </div>

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              {/* Delete button */}
              <DeleteButton selectedItems={selectedItems} />
              {/* Dropdown */}
              <DateSelect />
              {/* Filter button */}
              <FilterButton align="right" />
              {/* Add customer button */}
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn bg-purple-700 bg-opacity-100 rounded-lg  text-white"
              >
                <svg
                  className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden xs:block ml-2">Add Product</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <ProductsTable selectedItems={handleSelectedItems} />

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
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {!showForm ? renderProducts() : renderForm()}
      </div>
    </div>
  );
}

export default Products;
