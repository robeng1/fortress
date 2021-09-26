/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
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
      <div className={` ${pathname.includes('settings') && 'hidden'}`}>
        <SpeedDial
          ariaLabel="other settings"
          sx={{
            position: 'fixed',
            bottom: 65,
            right: 8,
          }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
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
            label="Settings"
            component={NavLink}
            exact
            to="/settings/account"
            value="settings/account"
            className={`flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-900 hover:text-black truncate transition duration-150 ${
              pathname.includes('settings') && 'text-gray-900'
            }`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-600 ${
                    pathname.includes('settings') && '!text-indigo-500'
                  }`}
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
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
