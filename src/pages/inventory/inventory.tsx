import React, { ChangeEvent, lazy, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import BottomNav from 'components/bottom-navigation';
import Sidebar from 'partials/sidebar';
import Header from 'partials/header';
import FilterButton from 'components/dropdown-filter';
import SearchForm from 'partials/actions/SearchForm';
import { fortressURL } from 'endpoints/urls';
import VariantTable from 'partials/inventory/variants-table';
import useShop from 'hooks/use-shop';
import { ThemeProvider } from 'styles/material/theme';
import { InventoryViewListType, InventoryViewType } from 'typings/inventory/inventory-type';
import ThreeDots from 'components/ui/loaders/three-dots';

function Inventory() {
  const { shop } = useShop();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  const { data, isLoading } = useQuery<InventoryViewListType>(
    ['inventoryviews', page],
    async () =>
      await fetch(`${fortressURL}/shops/${shop?.shop_id}/inventory-views`, {
        method: 'POST',
        body: JSON.stringify({
          offset: (page - 1) * itemsPerPage + 1,
          limit: itemsPerPage,
          shop_id: shop?.shop_id,
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then(result => result.json()),
    {
      keepPreviousData: true,
      enabled: !!shop?.shop_id,
      refetchOnWindowFocus: true,
    },
  );
  const handleSelectedItems = (selectedItems: any) => {
    setSelectedItems([...selectedItems]);
  };
  const records = data?.records ?? [];
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
          location="Inventory"
        />

        <main className="mb-10 md:mb-0">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max md:justify-start justify-between gap-2">
                {/* Search form */}
                <SearchForm placeholder="Search inventory" />
                {/* <div className="block">
                  <FilterButton align="right" />
                </div> */}
              </div>
            </div>
            {isLoading &&
              <div className="sm:flex sm:items-center justify-center">
                <ThreeDots />
              </div>
            }
            {/* Table */}
            {!isLoading && <>
              <VariantTable
                selectedItems={handleSelectedItems}
                total={data?.total ?? 0}
                // TODO: do not index duplicates in the first place
                records={records ? uniqBy(records, function (e: InventoryViewType) {
                  return e.variant_id;
                }) : []}
              />
              {/* Pagination */}
              {!isEmpty(records) && data && data?.total > itemsPerPage && (
                <ThemeProvider>
                  <Pagination
                    count={
                      data && data?.total > itemsPerPage
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
              )}</>}
            <BottomNav />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Inventory;
