import React, { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import { fortressURL } from 'app/endpoints/urls';

import Sidebar from 'app/partials/Sidebar';
import Header from 'app/partials/Header';
import DeleteButton from 'app/partials/actions/DeleteButton';
import SearchForm from 'app/partials/actions/SearchForm';
import FilterButton from 'app/components/DropdownFilter';
import CollectionsTable from 'app/partials/collections/CollectionsTable';
import CollectionForm from 'app/forms/collection/Collection';
import BottomNav from 'app/components/BottomNav';
import { useAtom } from 'jotai';
import { shopAtom } from 'store/atoms/shop';
import { request, ResponseError } from 'utils/request';

function Collections() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [showForm, setShowForm] = React.useState<Boolean>(false);
  const [currentCollectionId, setCurrentCollectionId] = useState<
    string | undefined
  >();
  const [shop] = useAtom(shopAtom);

  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  const query = `SELECT * FROM collection WHERE shop_id = '${
    shop?.shop_id
  }' ORDER BY updated_at DESC LIMIT ${
    (page - 1) * itemsPerPage + 1
  }, ${itemsPerPage}`;

  const { data } = useQuery<any, ResponseError>(
    ['collectionviews', page],
    async () =>
      await request(`${fortressURL}/shops/${shop?.shop_id}/collection-views`, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: { 'Content-Type': 'application/json' },
      }),
    { keepPreviousData: true, enabled: !!shop?.shop_id },
  );

  const handleSelectedItems = selectedItems => {
    setSelectedItems([...selectedItems]);
  };

  const handleShow = (display: Boolean, collectionId: string) => {
    setCurrentCollectionId(collectionId);
    setShowForm(display);
  };

  const renderFormView = () => {
    return (
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Page header */}
          <div className="sm:flex sm:justify-start sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <div className="m-1.5">
                <button
                  type="button"
                  onClick={() => setShowForm(!showForm)}
                  className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3"
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
            {/* <div className="mb-0 sm:mb-0">
              <h2>SPRINGSALE</h2>
            </div> */}
          </div>

          {/* Form */}
          <CollectionForm handleShow={handleShow} id={currentCollectionId} />
        </div>
      </main>
    );
  };

  const renderCollectionView = () => {
    return (
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
                  <div className="">
                    <DeleteButton selectedItems={selectedItems} />
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn bg-blue-900 hover:bg-purple-600 text-white"
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
            handleShow={handleShow}
            collections={data?.views || []}
          />

          {/* Pagination */}
          {data && (
            <Pagination
              count={data?.total / itemsPerPage}
              variant="outlined"
              color="primary"
              className="mt-4 md:mt-8"
              page={page}
              onChange={(event: ChangeEvent<unknown>, page: number) =>
                setPage(page)
              }
            />
          )}
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
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          location="Collections"
        />

        {!showForm ? renderCollectionView() : renderFormView()}
        <BottomNav />
      </div>
    </div>
  );
}

export default Collections;
