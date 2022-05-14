import React, { ChangeEvent, lazy, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import Pagination from '@mui/material/Pagination';
import BottomNav from 'components/bottom-navigation';
import Sidebar from 'partials/sidebar';
import Header from 'partials/header';
import SearchForm from 'partials/actions/search-box';
import DiscountTable from 'partials/discount/discount-table';
import useShop from 'hooks/use-shop';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styles/material/theme';
import ThreeDots from 'components/ui/loaders/three-dots';

function Discounts() {
  const navigate = useNavigate();
  const { shop } = useShop();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDiscountId, setCurrentDiscountId] = useState<
    String | undefined
  >(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const [page, setPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState<number>(15);

  const [term, setTerm] = useState<string>("");

  const { discountData, isLoading } = useDiscountViews(page, limit, term)

  const handleSelectedItems = (selectedItems: any) => {
    setSelectedItems([...selectedItems]);
  };

  const handleShow = (display: Boolean, discountId: String) => {
    setCurrentDiscountId(prevState => discountId);
  };
  const discounts = discountData?.discounts || [];

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
          location="Discounts"
        />
        <main className="mb-10 md:mb-0">
          <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="py-2 md:py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center">
                <div className="flex justify-between gap-2 w-full">
                  {/* Search form */}
                  <div className="flex justify-start gap-2">
                    <SearchForm placeholder="Search discounts..." />
                    {/* <div className="">
                      <FilterButton align="right" />
                    </div> */}
                  </div>
                  <button
                    onClick={() => navigate('/discounts/new')}
                    className="btn bg-purple-600 hover:bg-purple-600 text-white"
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">
                      Create Discount
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {isLoading &&
              <div className="sm:flex sm:items-center justify-center">
                <ThreeDots />
              </div>
            }
            {/* Table */}
            {!isLoading && <>
              <DiscountTable
                selectedItems={handleSelectedItems}
                discounts={discounts || []}
              />
              {/* Pagination */}
              {!isEmpty(discounts) && discountData?.total > limit && (
                <ThemeProvider>
                  <Pagination
                    count={
                      discountData?.total > limit
                        ? Math.ceil(discountData?.total / limit)
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
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

export default Discounts;
function useDiscountViews(page: number, limit: number, term: string): { discountData: any; isLoading: any; } {
  throw new Error('Function not implemented.');
}

