/* eslint-disable no-unused-vars */
import React, { useState, lazy, ChangeEvent } from 'react';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import { Tab } from '@headlessui/react';
import ProductForm from 'app/forms/product/Product';
import CollectionForm from 'app/forms/collection/Collection';
import BottomNav from 'app/components/BottomNav';
import Sidebar from 'app/partials/Sidebar';
import Header from 'app/partials/Header';
import DeleteButton from 'app/partials/actions/DeleteButton';
import FilterButton from 'app/components/DropdownFilter';
import SearchForm from 'app/partials/actions/SearchForm';
import { fortressURL } from 'app/endpoints/urls';
import { useAtom } from 'jotai';
import { shopAtom } from 'store/atoms/shop';

const ProductsTable = lazy(() => import('app/partials/products/ProductsTable'));
const InventoryTable = lazy(
  () => import('app/partials/inventory/InventoryTable'),
);
const CollectionsTable = lazy(
  () => import('app/partials/collections/CollectionsTable'),
);

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Products() {
  const [shop] = useAtom(shopAtom);
  const [showForm, setShowForm] = useState<Boolean>(false);
  const [showCollectionForm, setShowCollectionForm] = useState<Boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [currentlyBeingEditedProductId, setCurrentlyBeingEditedProductId] =
    useState<string | undefined>();
  const [
    currentlyBeingEditedCollectionId,
    setCurrentlyBeingEditedCollectionId,
  ] = useState<string | undefined>();

  let [categories] = useState(['Products', 'Inventory', 'Collections']);

  const handleSelectedItems = (selectedItems: any) => {
    setSelectedItems([...selectedItems]);
  };

  // inventory
  const [inventoryPage, setInventoryPage] = useState<number>(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inventoryItemsPerPage, setInventoryItemsPerPage] =
    useState<number>(15);
  const inventoryQuery = `SELECT * FROM inventory WHERE shop_id = '${
    shop?.shop_id
  }' ORDER BY updated_at DESC LIMIT ${
    (inventoryPage - 1) * inventoryItemsPerPage + 1
  }, ${inventoryItemsPerPage}`;

  const { data: inventoryData } = useQuery(
    ['inventoryviews', inventoryPage],
    async () =>
      await fetch(`${fortressURL}/shops/${shop?.shop_id}/inventory-views`, {
        method: 'POST',
        body: JSON.stringify(inventoryQuery),
        headers: { 'Content-Type': 'application/json' },
      }).then(result => result.json()),
    { keepPreviousData: true, enabled: !!shop?.shop_id },
  );

  // collections
  const [collectionPage, setCollectionPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [collectionItemsPerPage, setCollectionItemsPerPage] =
    useState<number>(15);

  const collectionQuery = `SELECT * FROM collection WHERE shop_id = '${
    shop?.shop_id
  }' ORDER BY updated_at DESC LIMIT ${
    (collectionPage - 1) * collectionItemsPerPage + 1
  }, ${collectionItemsPerPage}`;

  const { data: collectionData } = useQuery(
    ['collectionviews', collectionPage],
    async () =>
      await fetch(`${fortressURL}/shops/${shop?.shop_id}/collection-views`, {
        method: 'POST',
        body: JSON.stringify(collectionQuery),
        headers: { 'Content-Type': 'application/json' },
      }).then(result => result.json()),
    { keepPreviousData: true, enabled: !!shop?.shop_id },
  );

  const handleShowCollectionForm = (display: Boolean, collectionId: string) => {
    setCurrentlyBeingEditedCollectionId(collectionId);
    setShowCollectionForm(display);
  };

  // products
  const [productPage, setProductPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productItemsPerPage, setProductItemsPerPage] = useState<number>(15);

  const productQuery = `SELECT * FROM product WHERE shop_id = '${
    shop?.shop_id
  }' ORDER BY updated_at DESC LIMIT ${
    (productPage - 1) * productItemsPerPage + 1
  }, ${productItemsPerPage}`;

  const { data: productData } = useQuery(
    ['productviews', productPage],
    async () =>
      await fetch(`${fortressURL}/shops/${shop?.shop_id}/product-views`, {
        method: 'POST',
        body: JSON.stringify(productQuery),
        headers: { 'Content-Type': 'application/json' },
      }).then(result => result.json()),
    { keepPreviousData: true, enabled: !!shop?.shop_id },
  );
  const handleShowProductForm = (display: Boolean, productId: string) => {
    setCurrentlyBeingEditedProductId(productId);
    setShowForm(display);
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
                  className="btn border border-transparent focus:outline-none rounded shadow bg-white appearance-none"
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
            {/* <div className="mb-4 sm:mb-0">
              <h2>Hot Sauce Pepper Mint</h2>
            </div> */}
          </div>

          {/* Form */}
          <ProductForm
            handleShow={handleShowProductForm}
            id={currentlyBeingEditedProductId}
          />
        </div>
      </main>
    );
  };
  const renderCollectionForm = () => {
    return (
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Page header */}
          <div className="sm:flex sm:justify-start sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <div className="m-1.5">
                <button
                  onClick={() => setShowCollectionForm(!showCollectionForm)}
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
            {/* <div className="mb-4 sm:mb-0">
              <h2>Hot Sauce Pepper Mint</h2>
            </div> */}
          </div>

          {/* Form */}
          <CollectionForm
            handleShow={handleShowCollectionForm}
            id={currentlyBeingEditedCollectionId}
          />
        </div>
      </main>
    );
  };

  const renderMobileCollectionView = () => {
    return (
      <main className="mb-10 md:mb-0">
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
                onClick={() => setShowCollectionForm(!showCollectionForm)}
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
          <CollectionsTable
            selectedItems={handleSelectedItems}
            handleShow={handleShowCollectionForm}
            collections={collectionData?.views || []}
          />

          {/* Pagination */}
          {collectionData && (
            <Pagination
              count={collectionData?.total / collectionItemsPerPage}
              variant="outlined"
              color="primary"
              className="mt-4 md:mt-8"
              page={collectionPage}
              onChange={(event: ChangeEvent<unknown>, page: number) =>
                setCollectionPage(page)
              }
            />
          )}
        </div>
      </main>
    );
  };

  const renderMobileInventoryView = () => {
    return (
      <main className="mb-10 md:mb-0">
        <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center">
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
            {/* <div className="mb-0 md:mb-4">
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
            </div> */}

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
          <InventoryTable
            selectedItems={handleSelectedItems}
            records={inventoryData?.views || []}
            headings={undefined}
          />

          {/* Pagination */}
          {inventoryData && (
            <Pagination
              count={inventoryData?.total / inventoryItemsPerPage}
              variant="outlined"
              color="primary"
              className="mt-4 md:mt-8"
              page={inventoryPage}
              onChange={(event: ChangeEvent<unknown>, page: number) =>
                setInventoryPage(page)
              }
            />
          )}
        </div>
      </main>
    );
  };

  const renderMobileProductsView = () => {
    return (
      <main className="mb-10 md:mb-0">
        <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center">
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
            {/* <div className="mb-0 md:mb-4">
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
          </div> */}

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
          <ProductsTable
            selectedItems={handleSelectedItems}
            handleShow={handleShowProductForm}
            products={productData?.views || []}
          />

          {/* Pagination */}
          {productData && (
            <Pagination
              count={productData?.total / productItemsPerPage}
              variant="outlined"
              color="primary"
              className="mt-4 md:mt-8"
              page={productPage}
              onChange={(event: ChangeEvent<unknown>, page: number) =>
                setProductPage(page)
              }
            />
          )}
        </div>
      </main>
    );
  };

  const renderView = () => {
    return (
      <>
        <main className="sm:block md:hidden">
          <div className="w-full px-2 py-1 max-w-9xl">
            <Tab.Group
              onChange={index => {
                setTabIndex(index);
              }}
            >
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
                  key={3}
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
            <div className="py-2 md:py-8 w-full max-w-9xl mx-auto">
              <div className="sm:flex sm:justify-between sm:items-center">
                <div className="flex justify-between gap-2 w-full">
                  {/* Search form */}
                  <div className="flex justify-start gap-2">
                    <SearchForm placeholder="Search products..." />
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
                    <span className="hidden xs:block ml-2">Create Product</span>
                  </button>
                </div>
              </div>
            </div>

            {/* More actions */}
            {productData && (
              <div className="sm:flex sm:justify-between sm:items-center mb-3">
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
              </div>
            )}
            {/* Table */}
            <ProductsTable
              selectedItems={handleSelectedItems}
              handleShow={handleShowProductForm}
              products={productData?.views || []}
            />

            {/* Pagination */}
            {productData && (
              <Pagination
                count={productData?.total / productItemsPerPage}
                variant="outlined"
                color="primary"
                className="mt-4 md:mt-8"
                page={productPage}
                onChange={(event: ChangeEvent<unknown>, page: number) =>
                  setProductPage(page)
                }
              />
            )}
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
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          location="Products"
        />
        {!(showForm || showCollectionForm)
          ? renderView()
          : showForm
          ? renderForm()
          : renderCollectionForm()}
        <BottomNav />
      </div>
    </div>
  );
}

export default Products;