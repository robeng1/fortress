import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import ProductForm from 'app/forms/product/Product';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DeleteButton from '../../partials/actions/DeleteButton';
import FilterButton from '../../components/DropdownFilter';
import SearchForm from '../../partials/actions/SearchForm';
import ProductsTable from '../../partials/products/ProductsTable';
import PaginationClassic from '../../components/PaginationClassic';
import InventoryTable from '../../partials/inventory/InventoryTable';
import CollectionsTable from '../../partials/collections/CollectionsTable';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Products() {
  const [showForm, setShowForm] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  let [categories] = useState(['Products', 'Inventory', 'Collections']);

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

  const renderMobileCollectionView = () => {
    return (
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-2 md:py-8 w-full max-w-9xl mx-auto">
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-5">
            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max md:justify-start justify-between gap-2">
              {/* Search form */}

              <SearchForm placeholder="Search collections" />

              <div className="block md:hidden">
                <FilterButton align="right" />
              </div>
              {/* Add member button */}
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn bg-purple-700 hover:bg-indigo-600 text-white"
              >
                <svg
                  className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden xs:block ml-2">Create Collection</span>
              </button>
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
    );
  };

  const renderMobileInventoryView = () => {
    return (
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-5">
            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max md:justify-start justify-between gap-2">
              {/* Search form */}

              <SearchForm placeholder="Search inventory" />

              <div className="block md:hidden">
                <FilterButton align="right" />
              </div>
            </div>
          </div>
          {/* More actions */}
          <div className="sm:flex sm:justify-between sm:items-center mb-5">
            {/* Left side */}
            <div className="mb-0 md:mb-4">
              <ul className="flex flex-wrap -m-1">
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                    All
                    <span className="ml-1 text-indigo-200">67</span>
                  </button>
                </li>
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                    In Stock
                    <span className="ml-1 text-gray-400">14</span>
                  </button>
                </li>
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                    Out of Stock
                    <span className="ml-1 text-gray-400">34</span>
                  </button>
                </li>
                <li className="m-1">
                  <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                    Low Stock
                    <span className="ml-1 text-gray-400">19</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Right side */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-end md:justify-start gap-2">
              {/* Delete button */}
              <DeleteButton selectedItems={selectedItems} />
              <div className="hidden md:block">
                <FilterButton align="right" />
              </div>
            </div>
          </div>

          {/* Table */}
          <InventoryTable selectedItems={handleSelectedItems} />

          {/* Pagination */}
          <div className="mt-8">
            <PaginationClassic />
          </div>
        </div>
      </main>
    );
  };

  const renderMobileProductsView = () => {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-5">
          {/* Right: Actions */}
          <div className="grid grid-flow-col sm:auto-cols-max md:justify-start justify-between gap-2">
            {/* Search form */}

            <SearchForm placeholder="Search product" />

            <div className="block md:hidden">
              <FilterButton align="right" />
            </div>
            {/* Add member button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn bg-purple-700 hover:bg-indigo-600 text-white"
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Create Product</span>
            </button>
          </div>
        </div>

        {/* More actions */}
        <div className="sm:flex sm:justify-between sm:items-center mb-5">
          {/* Left side */}
          <div className="mb-0 md:mb-4">
            <ul className="flex flex-wrap -m-1">
              <li className="m-1">
                <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                  All
                  <span className="ml-1 text-indigo-200">67</span>
                </button>
              </li>
              <li className="m-1">
                <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                  In Stock
                  <span className="ml-1 text-gray-400">14</span>
                </button>
              </li>
              <li className="m-1">
                <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                  Out of Stock
                  <span className="ml-1 text-gray-400">34</span>
                </button>
              </li>
              <li className="m-1">
                <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                  Draft
                  <span className="ml-1 text-gray-400">19</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Right side */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-end md:justify-start gap-2">
            {/* Delete button */}
            <DeleteButton selectedItems={selectedItems} />
            <div className="hidden md:block">
              <FilterButton align="right" />
            </div>
          </div>
        </div>

        {/* Table */}
        <ProductsTable selectedItems={handleSelectedItems} />

        {/* Pagination */}
        <div className="mt-8">
          <PaginationClassic />
        </div>
      </div>
    );
  };

  const renderView = () => {
    return (
      <>
        <main className="md:hidden">
          <div className="w-full px-2 py-1 max-w-9xl">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1 bg-gray-100 text-black">
                {categories.map(category => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        'w-full py-2.5 text-sm leading-5 font-medium rounded-sm',
                        'focus:outline-none ',
                        selected
                          ? 'bg-white text-indigo-600 !rounded-full shadow'
                          : 'text-gray-600 hover:bg-white/[0.12] hover:text-white',
                      )
                    }
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  key={1}
                  className={classNames(
                    'bg-white rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  )}
                >
                  {renderMobileProductsView()}
                </Tab.Panel>
                <Tab.Panel
                  key={2}
                  className={classNames(
                    'bg-white rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  )}
                >
                  {renderMobileInventoryView()}
                </Tab.Panel>
                <Tab.Panel
                  key={2}
                  className={classNames(
                    'bg-white rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  )}
                >
                  {renderMobileCollectionView()}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </main>
        <main className="hidden md:block">
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                  Products
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max md:justify-start justify-between gap-2">
                {/* Search form */}
                <SearchForm placeholder="Search product" />
                <div className="block md:hidden">
                  <FilterButton align="right" />
                </div>
                {/* Add member button */}
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn bg-purple-700 hover:bg-indigo-600 text-white"
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Create Product</span>
                </button>
              </div>
            </div>

            {/* More actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Left side */}
              <div className="mb-4 sm:mb-0">
                <ul className="flex flex-wrap -m-1">
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                      All <span className="ml-1 text-indigo-200">67</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                      In Stock <span className="ml-1 text-gray-400">14</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                      Out of Stock{' '}
                      <span className="ml-1 text-gray-400">34</span>
                    </button>
                  </li>
                  <li className="m-1">
                    <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                      Draft <span className="ml-1 text-gray-400">19</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Right side */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-end md:justify-start gap-2">
                {/* Delete button */}
                <DeleteButton selectedItems={selectedItems} />
                <div className="hidden md:block">
                  <FilterButton align="right" />
                </div>
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
      </>
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
        {!showForm ? renderView() : renderForm()}
      </div>
    </div>
  );
}

export default Products;
