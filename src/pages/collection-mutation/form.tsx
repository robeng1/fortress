import React, { ChangeEvent, lazy, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import { fortressURL } from 'endpoints/urls';

import Sidebar from 'partials/sidebar';
import Header from 'partials/header';
import DeleteButton from 'partials/actions/DeleteButton';
import SearchForm from 'partials/actions/SearchForm';
import FilterButton from 'components/dropdown-filter';
import BottomNav from 'components/bottom-navigation';
import { useAtom } from 'jotai';
import { request, ResponseError } from 'utils/request';

import CollectionsTable from 'partials/collections/CollectionsTable';
import CollectionForm from 'forms/collection/collection';
import useShop from 'hooks/use-shop';
import { useNavigate, useParams } from 'react-router-dom';

function CollectionMutation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [currentCollectionId, setCurrentCollectionId] = useState<
    string | undefined
  >(id !== 'new' ? id : undefined);
  const { shop } = useShop();

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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-start sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <div className="m-1.5">
                  <button
                    type="button"
                    onClick={() => navigate('/shop/collections')}
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3"
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
            <CollectionForm id={currentCollectionId} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default CollectionMutation;
