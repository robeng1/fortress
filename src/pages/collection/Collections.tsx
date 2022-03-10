import React, { ChangeEvent, lazy, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import { fortressURL } from 'endpoints/urls';

import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import DeleteButton from 'partials/actions/DeleteButton';
import SearchForm from 'partials/actions/SearchForm';
import FilterButton from 'components/DropdownFilter';
import BottomNav from 'components/BottomNav';
import { useAtom } from 'jotai';
import { request, ResponseError } from 'utils/request';

import CollectionsTable from 'partials/collections/CollectionsTable';
import CollectionForm from 'forms/collection/Collection';
import useShop from 'hooks/use-shop';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styles/mui-theme/theme';

function Collections() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [currentCollectionId, setCurrentCollectionId] = useState<
    string | undefined
  >();
  const { shop } = useShop();

  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  const { data } = useQuery<any, ResponseError>(
    ['collectionviews', page],
    async () =>
      await request(`${fortressURL}/shops/${shop?.shop_id}/collection-views`, {
        method: 'POST',
        body: JSON.stringify({
          offset: (page - 1) * itemsPerPage + 1,
          limit: itemsPerPage,
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

  const handleSelectedItems = selectedItems => {
    setSelectedItems([...selectedItems]);
  };

  const handleShow = (display: Boolean, collectionId: string) => {
    setCurrentCollectionId(collectionId);
  };
  const collections = data?.collections || [];
  

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

        <main className="mb-10 md:mb-0">
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
                    <div className="">
                      <DeleteButton selectedItems={selectedItems} />
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/shop/collections/new')}
                    className="btn bg-purple-600 hover:bg-purple-600 text-white"
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
            <CollectionsTable
              selectedItems={handleSelectedItems}
              // handleShow={handleShow}
              collections={collections || []}
            />

            {/* Pagination */}
            {!isEmpty(collections) && data?.total > itemsPerPage && (
              <ThemeProvider>
                <Pagination
                  count={
                    data?.total > itemsPerPage
                      ? Math.ceil(data?.total / itemsPerPage)
                      : 1
                  }
                  variant="outlined"
                  color="primary"
                  className="mt-4 md:mt-8"
                  page={page}
                  onChange={(event: ChangeEvent<unknown>, page: number) =>
                    setPage(page)
                  }
                />
              </ThemeProvider>
            )}
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

export default Collections;
