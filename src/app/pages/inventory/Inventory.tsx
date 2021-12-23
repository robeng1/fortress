import React, { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import BottomNav from 'app/components/BottomNav';
import Sidebar from 'app/partials/Sidebar';
import Header from 'app/partials/Header';
// import DeleteButton from 'app/partials/actions/DeleteButton';
// import DateSelect from 'app/components/DateSelect';
import FilterButton from 'app/components/DropdownFilter';
import InventoryTable from 'app/partials/inventory/InventoryTable';
import SearchForm from 'app/partials/actions/SearchForm';
import { fortressURL } from 'app/endpoints/urls';
import { useAtom } from 'jotai';
import { shopAtom } from 'store/atoms/shop';

function Inventories() {
  const [shop] = useAtom(shopAtom);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  const query = `SELECT * FROM inventory WHERE shop_id = '${
    shop.shop_id
  }' ORDER BY updated_at DESC LIMIT ${
    (page - 1) * itemsPerPage + 1
  }, ${itemsPerPage}`;

  const { data } = useQuery(
    ['inventoryviews', page],
    async () =>
      await fetch(`${fortressURL}/shops/${shop.shop_id}/inventory-views`, {
        method: 'POST',
        body: JSON.stringify(query),
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

        <main>
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
            <BottomNav />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Inventories;
