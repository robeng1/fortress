import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ThemeProvider as MuiThemeProvider } from 'styles/material/theme';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { NavLink, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const { pathname } = location;

  return (
    <MuiThemeProvider>
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
                <svg xmlns="http://www.w3.org/2000/svg" className={`fill-current flex-shrink-0 text-gray-900 ${pathname === '/' && '!text-purple-900'
                  }`} viewBox="0 0 24 24" width="24" height="24">
                  <g data-name="Layer 2">
                    <g data-name="home">
                      <rect width="24" height="24" opacity="0" />
                      <path className={`fill-current text-gray-900 ${pathname === '/' && '!text-purple-900'
                        }`} d="M20.42 10.18L12.71 2.3a1 1 0 0 0-1.42 0l-7.71 7.89A2 2 0 0 0 3 11.62V20a2 2 0 0 0 1.89 2h14.22A2 2 0 0 0 21 20v-8.38a2.07 2.07 0 0 0-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H5v-8.42l7-7.15 7 7.19z" /></g>
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
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`fill-current flex-shrink-0 text-gray-900 ${pathname.includes('shop') && '!text-purple-900'
                    }`}
                  width="24"
                  height="24">
                  <g data-name="Layer 2"><g data-name="inbox">
                    <rect width="24" height="24" opacity="0" transform="rotate(180 12 12)" />
                    <path className={`fill-current flex-shrink-0 text-gray-900 ${pathname.includes('orders') && '!text-purple-900'
                      }`} d="M20.79 11.34l-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H16a1 1 0 0 0-1 1v3H9v-3a1 1 0 0 0-1-1H5.62zM18 19H6a1 1 0 0 1-1-1v-5h2v3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3h2v5a1 1 0 0 1-1 1z" />
                  </g>
                  </g>
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
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"
                  className={`fill-current flex-shrink-0 text-gray-900 ${pathname.includes('shop') && '!text-purple-900'
                    }`} width="24" height="24" viewBox="0 0 24 24"><path className={`fill-current flex-shrink-0 text-gray-900 ${pathname.includes('shop') && '!text-purple-900'
                      }`} d="M9.8,22.7c-0.8,0-1.5-0.3-2-0.8l-5.7-5.7c-1.2-1.2-1.1-3.2,0.2-4.4l8.6-8.6c0.3-0.3,0.7-0.5,1.1-0.6l5.9-1.1c0.6-0.1,1.3,0.1,1.8,0.6l2.1,2.1c0.5,0.5,0.7,1.1,0.6,1.7l-1,6c-0.1,0.4-0.3,0.8-0.6,1.1l-8.6,8.6C11.5,22.4,10.6,22.7,9.8,22.7z M18.9,2.9l-0.7,0.7l-6,1.1l-8.6,8.6c-0.5,0.5-0.6,1.2-0.2,1.6l5.7,5.7c0.2,0.2,0.5,0.3,0.7,0.2c0.3,0,0.6-0.2,0.9-0.4l8.6-8.6l1-6l-2.1-2.1L18.9,2.9z" /><path d="M17,6c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S17.6,6,17,6L17,6z" /></svg>
              }
            />
            <BottomNavigationAction
              component={NavLink}
              to="/settings"
              value="/settings"
              sx={{
                paddingX: '0px',
              }}
              className={`${pathname.includes('settings') && '!text-purple-900'
                }`}
              label="Settings"

              icon={
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" className={`fill-current flex-shrink-0 text-gray-900 ${pathname.includes('settings') && '!text-purple-900'
                  }`} width="24" height="24" viewBox="0 0 24 24"><path className={`fill-current flex-shrink-0 text-gray-900 ${pathname.includes('settings') && '!text-purple-900'
                    }`} d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z" /></svg>
              }
            />
          </BottomNavigation>
        </Paper>
      </div>
    </MuiThemeProvider>
  );
}
