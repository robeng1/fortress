import React, { useState } from 'react';
import { useAtom } from 'jotai';

import SearchModal from 'app/components/ModalSearch';
import Notifications from 'app/components/DropdownNotifications';
import Help from 'app/components/DropdownHelp';
import UserMenu from 'app/components/DropdownProfile';
import { shopAtom } from 'store/atoms/shop';

function Header({ sidebarOpen, setSidebarOpen, location }) {
  const [shop] = useAtom(shopAtom);
  const shopName = shop.business_display_name;
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header
      className={`sticky md:sticky w-full top-0 z-20 max-w-9xl ${
        !searchModalOpen && 'bg-white'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-between h-14 -mb-px">
          {/* <div className="hidden md:block">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {location}
            </h1>
          </div> */}
          {/* Header: Left side */}
          <div className="flex justify-between">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <button
              className={`w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ml-3 ${
                searchModalOpen && 'bg-gray-200'
              }`}
              onClick={e => {
                e.stopPropagation();
                setSearchModalOpen(true);
              }}
              aria-controls="search-modal"
            >
              <span className="sr-only">Search</span>
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <SearchModal
              id="search-modal"
              searchId="search"
              modalOpen={searchModalOpen}
              setModalOpen={setSearchModalOpen}
            />
            <Notifications align="right" />
            <Help align="right" />
            {/*  Divider */}
            <hr className="w-px h-6 bg-gray-200 mx-3" />
            <UserMenu align="right" shopName={shopName} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
