/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { NavLink, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="block md:hidden">
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
          component="span"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            component={NavLink}
            to="/"
            value="home"
            sx={{
              paddingX: '0px',
            }}
            className={`${pathname === '/' && '!text-purple-900'}`}
            icon={
              <svg
                className="flex-shrink-0 h-4"
                viewBox="0 0 20 20"
                focusable="false"
                aria-hidden="true"
              >
                <g fillRule="evenodd">
                  <path
                    className={`fill-current text-gray-900 ${
                      pathname === '/' && '!text-purple-500'
                    }`}
                    fill="currentColor"
                    d="M7 13h6v6H7z"
                  ></path>
                  <path d="M19.664 8.252l-9-8a1 1 0 0 0-1.328 0L8 1.44V1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.773L.336 8.252a1.001 1.001 0 0 0 1.328 1.496L2 9.449V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.449l.336.299a.997.997 0 0 0 1.41-.083 1.001 1.001 0 0 0-.082-1.413zM16 18h-2v-5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H4V7.671l6-5.333 6 5.333V18zm-8 0h4v-4H8v4zM4 2h2v1.218L4 4.996V2z"></path>
                </g>
              </svg>
            }
          />
          <BottomNavigationAction
            label="Orders"
            component={NavLink}
            to="/orders"
            value="orders"
            sx={{
              paddingX: '0px',
            }}
            className={`${pathname.includes('orders') && '!text-purple-900'}`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-900 ${
                    pathname.includes('orders') && '!text-purple-900'
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
            to="/shop/products"
            value="shop/products"
            sx={{
              paddingX: '0px',
            }}
            className={`${pathname.includes('shop') && '!text-purple-900'}`}
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
                    pathname.includes('shop') && '!text-purple-900'
                  }`}
                  d="M19 0h-9c-.265 0-.52.106-.707.293l-9 9a.999.999 0 0 0 0 1.414l9 9a.997.997 0 0 0 1.414 0l9-9A.997.997 0 0 0 20 10V1a1 1 0 0 0-1-1zm-9 17.586L2.414 10 4 8.414 11.586 16 10 17.586zm8-8l-5 5L5.414 7l5-5H18v7.586zM15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                />
              </svg>
            }
          />
          <BottomNavigationAction
            component={NavLink}
            to="/settings"
            value="/settings"
            sx={{
              paddingX: '0px',
            }}
            className={`${pathname.includes('settings') && '!text-purple-900'}`}
            label="Settings"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  className={`fill-current text-gray-600 ${
                    pathname.includes('settings') && '!text-purple-500'
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
    </div>
  );
}
