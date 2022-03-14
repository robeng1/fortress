/* eslint-disable no-unused-vars */
import React, { useState, lazy, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import BottomNav from 'components/bottom-nav';
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import FilterButton from 'components/DropdownFilter';
import SearchForm from 'partials/actions/SearchForm';
import { fortressURL } from 'endpoints/urls';
import ProductsTable from 'partials/products/ProductsTable';
import useShop from 'hooks/use-shop';
import { request } from 'utils/request';
import { ThemeProvider } from 'styles/mui-theme/theme';

function Products() {
  const navigate = useNavigate();
  const { shop } = useShop();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);

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
      await request(`${fortressURL}/shops/${shop?.shop_id}/product-views`, {
        method: 'POST',
        body: JSON.stringify({
          offset: (productPage - 1) * productItemsPerPage + 1,
          limit: productItemsPerPage,
          shop_id: shop?.shop_id,
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
    {
      keepPreviousData: true,
      enabled: !!shop?.shop_id,
      refetchOnWindowFocus: false,
    },
  );
  const products = productData?.products || [];
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
                      onClick={() => navigate('/shop/products/new')}
                      className="btn bg-purple-600 hover:bg-indigo-600 text-white"
                    >
                      <svg
                        className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                      <span className="hidden xs:block ml-2">
                        Create Product
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <ProductsTable
                selectedItems={handleSelectedItems}
                handleShow={undefined}
                products={products || []}
              />

              {/* Pagination */}
              {!isEmpty(products) && productData?.total > productItemsPerPage && (
                <ThemeProvider>
                  <Pagination
                    count={
                      productData?.total > productItemsPerPage
                        ? Math.ceil(productData?.total / productItemsPerPage)
                        : 1
                    }
                    variant="outlined"
                    color="primary"
                    className="mt-4 md:mt-8"
                    page={productPage}
                    onChange={(event: ChangeEvent<unknown>, page: number) =>
                      setProductPage(page)
                    }
                  />
                </ThemeProvider>
              )}
            </div>
          </main>
        </>
        <BottomNav />
      </div>
    </div>
  );
}

export default Products;
