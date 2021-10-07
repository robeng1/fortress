/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Backdrop from '@mui/material/Backdrop';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { NavLink, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const { pathname } = location;
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const pushLink = page => history.push(page);

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="block md:hidden">
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
            <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-purple-50 to-purple-100 bg-gray-200 p-5">
              <div className="grid grid-cols-3 grid-rows-1 grid-flow-col gap-2">
                <div className="bg-white shadow rounded-md h-12 flex items-center justify-center text-black text-xs font-medium">
                  <button
                    exact
                    onClick={() => {
                      handleClose();
                      pushLink('/discounts');
                    }}
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname.includes('discounts') && 'hover:text-gray-900'
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                        pathname.includes('discounts') && '!text-blue-900'
                      }`}
                    >
                      Discounts
                    </span>
                  </button>
                </div>
                <div className="bg-white shadow rounded-md h-12 flex items-center justify-center text-black text-xs font-medium">
                  Store
                </div>
                <div className="bg-white shadow rounded-md h-12 flex items-center justify-center text-black text-xs font-medium">
                  <button
                    exact
                    onClick={() => {
                      handleClose();
                      pushLink('/settings/account');
                    }}
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname.includes('settings') && 'hover:text-gray-900'
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                        pathname.includes('settings') && '!text-blue-900'
                      }`}
                    >
                      Settings
                    </span>
                  </button>
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
        elevation={0}
      >
        <BottomNavigation
          elevation={0}
          showLabels
          value={value}
          sx={{
            padddingX: '10px',
            paddingBottom: '5px',
            paddingTop: '8px',
            fontWeight: '500',
            fontSize: '24px',
          }}
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
            className={`flex text-lg items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-900 hover:text-black truncate transition duration-150 ${
              pathname === '/' && '!text-blue-900'
            }`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-900 ${
                    pathname === '/' && '!text-blue-900'
                  }`}
                  d="M19.664 8.252l-9-8a1 1 0 0 0-1.328 0L8 1.44V1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.773L.336 8.252a1.001 1.001 0 0 0 1.328 1.496L2 9.449V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.449l.336.299a.997.997 0 0 0 1.41-.083 1.001 1.001 0 0 0-.082-1.413zM16 18h-2v-5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H4V7.671l6-5.333 6 5.333V18zm-8 0h4v-4H8v4zM4 2h2v1.218L4 4.996V2z"
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
            className={`flex text-lg items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-900 hover:text-black truncate transition duration-150 ${
              pathname.includes('orders') && '!text-blue-900'
            }`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-900 ${
                    pathname.includes('orders') && '!text-blue-900'
                  }`}
                  fillRule="evenodd"
                  d="M2 18v-4h3.382l.723 1.447c.17.339.516.553.895.553h6c.379 0 .725-.214.895-.553L14.618 14H18v4H2zM19 1a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H2v9h4c.379 0 .725.214.895.553L7.618 14h4.764l.723-1.447c.17-.339.516-.553.895-.553h4V3h-3a1 1 0 0 1 0-2h4zM6.293 6.707a.999.999 0 1 1 1.414-1.414L9 6.586V1a1 1 0 0 1 2 0v5.586l1.293-1.293a.999.999 0 1 1 1.414 1.414l-3 3a.997.997 0 0 1-1.414 0l-3-3z"
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
            className={`flex text-lg items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-900 hover:text-black truncate transition duration-150 ${
              pathname.includes('shop') && '!text-blue-900'
            }`}
            label="Products"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-900 ${
                    pathname.includes('shop') && '!text-blue-900'
                  }`}
                  d="M19 0h-9c-.265 0-.52.106-.707.293l-9 9a.999.999 0 0 0 0 1.414l9 9a.997.997 0 0 0 1.414 0l9-9A.997.997 0 0 0 20 10V1a1 1 0 0 0-1-1zm-9 17.586L2.414 10 4 8.414 11.586 16 10 17.586zm8-8l-5 5L5.414 7l5-5H18v7.586zM15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                />
              </svg>
            }
          />
          <BottomNavigationAction
            component={NavLink}
            exact
            to="/store"
            value="store"
            className={`flex text-lg items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-900 hover:text-black truncate transition duration-150 ${
              pathname.includes('store') && '!text-blue-900'
            }`}
            label="Store"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-900 ${
                    pathname.includes('store') && '!text-blue-900'
                  }`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            }
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
