/* eslint-disable no-unused-vars */
import React, { useState, lazy, ChangeEvent } from 'react';
import isEmpty from 'lodash/isEmpty'
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import BottomNav from 'components/BottomNav';
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import FilterButton from 'components/DropdownFilter';
import SearchForm from 'partials/actions/SearchForm';
import { fortressURL } from 'endpoints/urls';
import { useAtom } from 'jotai';
import ProductsTable from 'partials/products/ProductsTable';
import ProductForm from 'forms/product/Product';
import useShop from 'hooks/use-shop';
import { request } from 'utils/request';

function Products() {
  const { shop } = useShop();
  const [showForm, setShowForm] = useState<Boolean>(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [currentlyBeingEditedProductId, setCurrentlyBeingEditedProductId] =
    useState<string | undefined>();

  const handleSelectedItems = (selectedItems: any) => {
    setSelectedItems([...selectedItems]);
  };

  // products
  const [productPage, setProductPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productItemsPerPage, setProductItemsPerPage] = useState<number>(15);

  const { data: productData } = useQuery(
    ['productviews', productPage],
    async () =>
      await request(`${fortressURL}/shops/${shop?.shop_id}/products/views`, {
        method: 'POST',
        body: JSON.stringify({
          offset: (productPage - 1) * productItemsPerPage + 1,
          limit: productItemsPerPage,
          shop_id: shop?.shop_id,
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    { keepPreviousData: true, enabled: !!shop?.shop_id },
  );
  const handleShowProductForm = (display: Boolean, productId: string) => {
    setCurrentlyBeingEditedProductId(productId);
    setShowForm(display);
  };
  const products = productData?.products || [];
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
  const renderView = () => {
    return (
      <>
        <main className="mb-10 md:mb-0">
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
                    className="btn bg-blue-600 hover:bg-indigo-600 text-white"
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
            {!isEmpty(products) && (
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
              products={products || []}
            />

            {/* Pagination */}
            {isEmpty(products) && (
              <Pagination
                count={Math.ceil(productData?.total / productItemsPerPage)}
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
        {!showForm ? renderView() : renderForm()}
        {!showForm && <BottomNav />}
      </div>
    </div>
  );
}

export default Products;
