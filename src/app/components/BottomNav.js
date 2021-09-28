/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Backdrop from '@mui/material/Backdrop';
import ShareIcon from '@mui/icons-material/Share';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { NavLink, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const actions = [
    { icon: <ShareIcon />, name: 'Store' },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
            clipRule="evenodd"
          />
          <path
            className={`fill-current text-gray-600 ${
              pathname.includes('discounts') && '!text-indigo-500'
            }`}
            d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"
          />
        </svg>
      ),
      name: 'Promos',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            className={`fill-current text-gray-600 ${
              pathname.includes('customers') && '!text-indigo-500'
            }`}
            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
          />
        </svg>
      ),
      name: 'Customers',
    },
  ];

  return (
    <>
      <Backdrop open={open} />
      <div>
        <React.Fragment>
          <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
          >
            <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-purple-50 to-purple-100 bg-gray-300 p-5">
              <div className="grid grid-cols-3 grid-rows-2 grid-flow-col gap-2">
                <div className="bg-gray-200 rounded-md h-12 flex items-center justify-center text-black text-xs font-medium">
                  Discounts
                </div>
                <div className="bg-gray-200 rounded-md h-12 flex items-center justify-center text-black text-xs font-medium">
                  Customers
                </div>
                <div className="bg-gray-200 rounded-md h-12 flex items-center justify-center text-black text-xs font-medium">
                  Collections
                </div>
                <div className="bg-gray-200 rounded-md h-12 flex items-center justify-center text-black text-xs font-medium">
                  Inventory
                </div>
                <div className="bg-gray-200 rounded-md h-12 flex items-center justify-center text-black text-xs font-medium">
                  Store
                </div>
                <div className="bg-gray-200 rounded-md h-12 flex items-center justify-center text-black text-xs font-medium">
                  Settings
                </div>
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      </div>

      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            component={NavLink}
            exact
            to="/"
            value=""
            className={`flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-900 hover:text-black truncate transition duration-150 ${
              pathname === '/' && 'text-gray-900'
            }`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-400 ${
                    pathname === '/' && '!text-indigo-500'
                  }`}
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
            }
          />
          <BottomNavigationAction
            label="Orders"
            component={NavLink}
            exact
            to="/orders"
            value="orders"
            className={`flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-900 hover:text-black truncate transition duration-150 ${
              pathname === '/orders' && 'text-gray-900'
            }`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-400 ${
                    pathname.includes('orders') && '!text-indigo-500'
                  }`}
                  fillRule="evenodd"
                  d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          <BottomNavigationAction
            component={NavLink}
            exact
            to="/shop/products"
            value="shop/products"
            className={`flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-900 hover:text-black truncate transition duration-150 ${
              pathname.includes('shop') && 'text-gray-900'
            }`}
            label="Products"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-400 ${
                    pathname.includes('shop') && 'text-indigo-300'
                  }`}
                  d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
                />
                <path
                  className={`fill-current text-gray-700 ${
                    pathname.includes('shop') && '!text-indigo-600'
                  }`}
                  d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
                />
                <path
                  className={`fill-current text-gray-600 ${
                    pathname.includes('shop') && 'text-indigo-500'
                  }`}
                  d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
                />
              </svg>
            }
          />
          <BottomNavigationAction
            label="More"
            value="more"
            onClick={handleOpen}
            className={`flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-900 hover:text-black truncate transition duration-150`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-600`}
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}
