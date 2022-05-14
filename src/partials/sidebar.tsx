import { Wallet } from 'components/icons/category';
import { CouponIcon } from 'components/icons/coupon-icon';
import { ProductIcon } from 'components/icons/product-icon';
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './sidebar-link-group';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded?.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <>
      <div className="block">
        {/* Sidebar backdrop (mobile only) */}
        <div
          className={`fixed inset-0 bg-gray-300 bg-opacity-30 blur-md z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          aria-hidden="true"
        ></div>

        {/* Sidebar */}
        <div
          id="sidebar"
          ref={sidebar}
          className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 bg-white p-4 transition-all duration-100 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
            }`}
        >
          {/* Sidebar header */}
          <div className="flex justify-between mb-10 pr-3 sm:px-2">
            {/* Close button */}
            <button
              ref={trigger}
              className="lg:hidden text-gray-500 hover:text-gray-400"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
              </svg>
            </button>
            {/* Logo */}
            <NavLink to="/" className="block">
              <div className="w-8 h-8 relative flex justify-center items-center rounded-full bg-blue-500 text-xl text-white uppercase">R</div>
            </NavLink>
          </div>

          {/* Links */}
          <div className="space-y-8">
            {/* Pages group */}
            <div>
              <ul className="mt-0">
                {/* Dashboard */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 hidden md:block last:mb-0 ${pathname === '/' &&
                    'w-full bg-gray-200 ease-out transition-transform transition-medium'
                    }`}
                >
                  <NavLink
                    to="/"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${pathname === '/' && 'text-gray-900 '
                      }`}
                  >
                    <div className="flex items-center align-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="flex-shrink-0" width="24" height="24"><g data-name="Layer 2"><g data-name="home"><rect width="24" height="24" opacity="0" /><path d="M20.42 10.18L12.71 2.3a1 1 0 0 0-1.42 0l-7.71 7.89A2 2 0 0 0 3 11.62V20a2 2 0 0 0 1.89 2h14.22A2 2 0 0 0 21 20v-8.38a2.07 2.07 0 0 0-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H5v-8.42l7-7.15 7 7.19z" /></g></g></svg>
                      <span
                        className={`text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === '/' && 'text-gray-900'
                          }`}
                      >
                        Home
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Orders */}
                <li
                  className={`px-3 py-2 rounded-sm hidden md:block mb-0.5 last:mb-0 ${pathname.includes('orders') &&
                    'w-full bg-gray-200 ease-out transition-transform transition-medium'
                    }`}
                >
                  <NavLink
                    to="/orders"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${pathname.includes('orders') && 'hover:text-gray-900'
                      }`}
                  >
                    <div className="flex items-center align-middle">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><g fill="#757575"><path d="M15.858 15c-.446 1.723-1.997 3-3.858 3s-3.412-1.277-3.858-3H2v7h20v-7h-6.142zM15.293 8.293L13 10.586V2h-2v8.586L8.707 8.293 7.293 9.707 12 14.415l4.707-4.708z" /></g></svg> */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="flex-shrink-0" width="24" height="24"><g data-name="Layer 2"><g data-name="inbox"><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)" /><path d="M20.79 11.34l-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H16a1 1 0 0 0-1 1v3H9v-3a1 1 0 0 0-1-1H5.62zM18 19H6a1 1 0 0 1-1-1v-5h2v3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3h2v5a1 1 0 0 1-1 1z" /></g></g></svg>
                      <span
                        className={`text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes('orders') && 'text-gray-900'
                          }`}
                      >
                        Orders
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Products */}
                <SidebarLinkGroup activecondition={pathname.includes('shop')}>
                  {(handleClick, open) => {
                    return (
                      <div>
                        <a
                          href="#0"
                          className={`block text-gray-900 hover:text-black truncate transition duration-150 ${pathname.includes('products') &&
                            'hover:text-gray-900'
                            }`}
                          onClick={e => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center ali">
                              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" className="flex-shrink-0" width="24" height="24" viewBox="0 0 24 24"><path d="M9.8,22.7c-0.8,0-1.5-0.3-2-0.8l-5.7-5.7c-1.2-1.2-1.1-3.2,0.2-4.4l8.6-8.6c0.3-0.3,0.7-0.5,1.1-0.6l5.9-1.1c0.6-0.1,1.3,0.1,1.8,0.6l2.1,2.1c0.5,0.5,0.7,1.1,0.6,1.7l-1,6c-0.1,0.4-0.3,0.8-0.6,1.1l-8.6,8.6C11.5,22.4,10.6,22.7,9.8,22.7z M18.9,2.9l-0.7,0.7l-6,1.1l-8.6,8.6c-0.5,0.5-0.6,1.2-0.2,1.6l5.7,5.7c0.2,0.2,0.5,0.3,0.7,0.2c0.3,0,0.6-0.2,0.9-0.4l8.6-8.6l1-6l-2.1-2.1L18.9,2.9z" /><path d="M17,6c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S17.6,6,17,6L17,6z" /></svg>
                              <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Products
                              </span>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                            <li
                              className={`py-1 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('products') && 'bg-gray-200'
                                }`}
                            >
                              <NavLink
                                to="/shop/products"
                                className={`block text-gray-900 hover:text-black transition duration-150 truncate `}
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes('products') &&
                                    'text-gray-900'
                                    }`}
                                >
                                  All products
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-1 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('inventory') && 'bg-gray-200'
                                }`}
                            >
                              <NavLink
                                to="/shop/inventory"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes('inventory') &&
                                    'text-gray-900'
                                    }`}
                                >
                                  Inventory
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-1 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('collections') &&
                                'bg-gray-200'
                                }`}
                            >
                              <NavLink
                                to="/shop/collections"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes('collections') &&
                                    'text-gray-900'
                                    }`}
                                >
                                  Collections
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  }}
                </SidebarLinkGroup>
                <SidebarLinkGroup
                  activecondition={pathname.includes('finance')}
                >
                  {(handleClick, open) => {
                    return (
                      <div>
                        <a
                          href="#0"
                          className={`block text-gray-900 hover:text-black truncate transition duration-150 ${pathname.includes('products') &&
                            'hover:text-gray-900'
                            }`}
                          onClick={e => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0" width="24" height="24" viewBox="0 0 24 24"><path d="M21,13.5A2.5,2.5,0,0,1,19,16V17a1,1,0,0,1-2,0V16H16a1,1,0,0,1,0-2h2.5a.5.5,0,0,0,0-1h-1A2.5,2.5,0,0,1,17,8.05V7a1,1,0,0,1,2,0V8h1a1,1,0,0,1,0,2H17.5a.5.5,0,0,0,0,1h1A2.5,2.5,0,0,1,21,13.5ZM21,21a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V9A1,1,0,0,1,4,8H7V3A1,1,0,0,1,8,2h4a1,1,0,0,1,1,1V20h7A1,1,0,0,1,21,21ZM5,20H7V10H5Zm4,0h2V4H9Z" /></svg>
                              <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Finances
                              </span>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                            <li
                              className={`py-1 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('balance') && 'bg-gray-200'
                                }`}
                            >
                              <NavLink
                                to="/finances/balance"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes('finances/balance') &&
                                    'text-gray-900'
                                    }`}
                                >
                                  Balance
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-1 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('transactions') &&
                                'bg-gray-200'
                                }`}
                            >
                              <NavLink
                                to="/finances/transactions"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes(
                                    'finances/transactions',
                                  ) && 'text-gray-900'
                                    }`}
                                >
                                  Transactions
                                </span>
                              </NavLink>
                            </li>
                            {/* <li
                              className={`py-1 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('payouts') && 'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/finances/payouts"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname.includes('finances/payouts') &&
                                    'text-gray-900'
                                  }`}
                                >
                                  Payouts
                                </span>
                              </NavLink>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    );
                  }}
                </SidebarLinkGroup>
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/discounts' &&
                    'w-full bg-gray-200 ease-out transition-transform transition-medium'
                    }`}
                >
                  <NavLink
                    to="/discounts"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${pathname === '/discounts' && 'text-gray-900 '
                      }`}
                  >
                    <div className="flex items-center align-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0" width="24" height="24" viewBox="0 0 6.35 6.35"><path d="M 11.958984 0.99804688 C 11.178309 1.0093855 10.428178 1.3258224 9.8769531 1.8769531 L 8.7558594 2.9980469 L 6.0019531 2.9980469 C 4.3569327 2.9980469 2.9960938 4.3589047 2.9960938 6.0039062 L 2.9960938 8.7558594 L 1.8828125 9.8789062 C 0.71964401 11.042018 0.71964401 12.959935 1.8828125 14.123047 L 2.9960938 15.244141 L 2.9960938 17.998047 C 2.9960938 19.643048 4.3569327 21.003906 6.0019531 21.003906 L 8.7558594 21.003906 L 9.8769531 22.117188 C 11.040077 23.280299 12.95797 23.280299 14.121094 22.117188 L 15.244141 21.003906 L 17.996094 21.003906 C 19.641114 21.003906 21.001953 19.643048 21.001953 17.998047 L 21.001953 15.244141 L 22.123047 14.123047 C 23.286215 12.959935 23.286215 11.042018 22.123047 9.8789062 L 21.001953 8.7558594 L 21.001953 6.0039062 C 21.001953 4.3589047 19.641114 2.9980469 17.996094 2.9980469 L 15.244141 2.9980469 L 14.121094 1.8769531 C 13.548168 1.3037878 12.769399 0.98636813 11.958984 0.99804688 z M 11.988281 2.9980469 C 12.258929 2.9942673 12.51366 3.1017247 12.705078 3.2929688 L 14.121094 4.703125 A 1.0001001 1.0001001 0 0 0 14.830078 4.9980469 L 17.996094 4.9980469 C 18.56013 4.9980469 19 5.4378964 19 6.0019531 L 19 9.1699219 A 1.0001001 1.0001001 0 0 0 19.296875 9.8789062 L 20.707031 11.294922 C 21.105705 11.693586 21.105705 12.306414 20.707031 12.705078 L 19.296875 14.123047 A 1.0001001 1.0001001 0 0 0 19 14.832031 L 19 17.998047 C 19 18.562104 18.56013 19.001953 17.996094 19.001953 L 14.830078 19.001953 A 1.0001001 1.0001001 0 0 0 14.121094 19.291016 L 12.705078 20.707031 C 12.306389 21.105696 11.693611 21.105696 11.294922 20.707031 L 9.8769531 19.291016 A 1.0001001 1.0001001 0 0 0 9.1679688 19.001953 L 6.0019531 19.001953 C 5.4379172 19.001953 4.9980469 18.562104 4.9980469 17.998047 L 4.9980469 14.832031 A 1.0001001 1.0001001 0 0 0 4.7089844 14.123047 L 3.2929688 12.705078 C 2.8942945 12.306414 2.8942945 11.693586 3.2929688 11.294922 L 4.7089844 9.8789062 A 1.0001001 1.0001001 0 0 0 4.9980469 9.1699219 L 4.9980469 6.0019531 C 4.9980469 5.4378964 5.4379172 4.9980469 6.0019531 4.9980469 L 9.1679688 4.9980469 A 1.0001001 1.0001001 0 0 0 9.8769531 4.703125 L 11.294922 3.2929688 C 11.479325 3.1085278 11.728501 3.0018264 11.988281 2.9980469 z M 14.978516 7.9882812 A 1.0001001 1.0001001 0 0 0 14.291016 8.2910156 L 8.2890625 14.292969 A 1.0021986 1.0021986 0 1 0 9.7070312 15.710938 L 15.708984 9.7089844 A 1.0001001 1.0001001 0 0 0 14.978516 7.9882812 z M 9 8 A 1.0000001 1.0000001 0 0 0 8 9 A 1.0000001 1.0000001 0 0 0 9 10 A 1.0000001 1.0000001 0 0 0 10 9 A 1.0000001 1.0000001 0 0 0 9 8 z M 15 14 A 1.0000001 1.0000001 0 0 0 14 15 A 1.0000001 1.0000001 0 0 0 15 16 A 1.0000001 1.0000001 0 0 0 16 15 A 1.0000001 1.0000001 0 0 0 15 14 z " color="#000" font-family="sans-serif" font-weight="400" overflow="visible" transform="scale(.26458)"></path></svg>
                      <span
                        className={`text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === '/discounts' && 'text-gray-900'
                          }`}
                      >
                        Discounts
                      </span>
                    </div>
                  </NavLink>
                </li>

                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/vouchers' &&
                    'w-full bg-gray-200 ease-out transition-transform transition-medium'
                    }`}
                >
                  <NavLink
                    to="/vouchers"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${pathname === '/vouchers' && 'text-gray-900 '
                      }`}
                  >
                    <div className="flex items-center align-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0" width="24" height="24" viewBox="0 0 24 24"><path d="M22,4H2A1,1,0,0,0,1,5V19a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V5A1,1,0,0,0,22,4ZM21,18H19V15a1,1,0,0,0-2,0v3H3V6H17V9a1,1,0,0,0,2,0V6h2ZM13.71,8.29a1,1,0,0,1,0,1.42l-6,6a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42l6-6A1,1,0,0,1,13.71,8.29ZM7,9a1,1,0,1,1,1,1A1,1,0,0,1,7,9Zm6,6a1,1,0,1,1-1-1A1,1,0,0,1,13,15Z" /></svg>
                      <span
                        className={`text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === '/vouchers' && 'text-gray-900'
                          }`}
                      >
                        Vouchers
                      </span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* Settings*/}
            <div>
              <h3 className="text-xs uppercase text-gray-500 font-medium pl-3">
                <span
                  className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                  aria-hidden="true"
                >
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  Settings
                </span>
              </h3>
              <ul className="mt-3">
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/settings' &&
                    'w-full bg-gray-200 ease-out transition-transform transition-medium'
                    }`}
                >
                  <NavLink
                    to="/settings"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${pathname === '/settings' && 'text-gray-900 '
                      }`}
                  >
                    <div className="flex items-center align-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" className="flex-shrink-0" width="24" height="24" viewBox="0 0 24 24"><path d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z" /></svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === '/settings' && 'text-gray-900'
                          }`}
                      >
                        Settings
                      </span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Expand / collapse button */}
          <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
            <div className="px-3 py-2">
              <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                <span className="sr-only">Expand / collapse sidebar</span>
                <svg
                  className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="text-gray-400"
                    d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                  />
                  <path className="text-gray-600" d="M3 23H1V1h2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
