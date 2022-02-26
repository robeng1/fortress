import React, { ChangeEvent, lazy, useState } from 'react';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import BottomNav from 'components/BottomNav';
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import FilterButton from 'components/DropdownFilter';
import SearchForm from 'partials/actions/SearchForm';
import { fortressURL } from 'endpoints/urls';
import InventoryTable from 'partials/inventory/InventoryTable';
import useShop from 'hooks/use-shop';

function Inventories() {
  const { shop } = useShop();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  const { data } = useQuery(
    ['inventoryviews', page],
    async () =>
      await fetch(`${fortressURL}/shops/${shop?.shop_id}/inventory/views`, {
        method: 'POST',
        body: JSON.stringify({
          offset: (page - 1) * itemsPerPage + 1,
          limit: itemsPerPage,
          shop_id: shop?.shop_id,
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then(result => result.json()),
    { keepPreviousData: true, enabled: !!shop?.shop_id },
  );
  const handleSelectedItems = (selectedItems: any) => {
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
                <div className="block">
                  <FilterButton align="right" />
                </div>
              </div>
            </div>

            {/* Table */}
            <InventoryTable
              selectedItems={handleSelectedItems}
              records={data?.views || []}
              headings={undefined}
            />

            {/* Pagination */}
            {data && (
              <Pagination
                count={Math.ceil(data?.total / itemsPerPage)}
                variant="outlined"
                color="primary"
                className="mt-4 md:mt-8"
                page={page}
                onChange={(event: ChangeEvent<unknown>, page: number) =>
                  setPage(page)
                }
              />
            )}
            <BottomNav />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Inventories;
