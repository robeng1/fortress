import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ReoplexLogo from '../images/reoplex.png';

import SidebarLinkGroup from './SidebarLinkGroup';

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
          className={`fixed inset-0 bg-gray-300 bg-opacity-30 blur-md z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden="true"
        ></div>

        {/* Sidebar */}
        <div
          id="sidebar"
          ref={sidebar}
          className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 bg-white p-4 transition-all duration-100 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-64'
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
              <img
                className="w-8 h-8"
                src={ReoplexLogo}
                width="8"
                height="8"
                alt="reoplex"
              />
            </NavLink>
          </div>

          {/* Links */}
          <div className="space-y-8">
            {/* Pages group */}
            <div>
              <ul className="mt-0">
                {/* Dashboard */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 hidden md:block last:mb-0 ${
                    pathname === '/' &&
                    'w-full bg-gray-200 ease-out transition-transform transition-medium'
                  }`}
                >
                  <NavLink
                    to="/"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname === '/' && 'text-gray-900 '
                    }`}
                  >
                    <div className="flex items-center align-middle">
                      <svg
                        className="flex-shrink-0 h-4"
                        viewBox="0 0 20 20"
                        focusable="false"
                        aria-hidden="true"
                      >
                        <g fillRule="evenodd">
                          <path
                            className={`fill-current text-gray-900 ${
                              pathname === '/' && 'text-gray-900'
                            }`}
                            fill="currentColor"
                            d="M7 13h6v6H7z"
                          ></path>
                          <path d="M19.664 8.252l-9-8a1 1 0 0 0-1.328 0L8 1.44V1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.773L.336 8.252a1.001 1.001 0 0 0 1.328 1.496L2 9.449V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.449l.336.299a.997.997 0 0 0 1.41-.083 1.001 1.001 0 0 0-.082-1.413zM16 18h-2v-5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H4V7.671l6-5.333 6 5.333V18zm-8 0h4v-4H8v4zM4 2h2v1.218L4 4.996V2z"></path>
                        </g>
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname === '/' && 'text-gray-900'
                        }`}
                      >
                        Home
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Orders */}
                <li
                  className={`px-3 py-2 rounded-sm hidden md:block mb-0.5 last:mb-0 ${
                    pathname.includes('orders') &&
                    'w-full bg-gray-200 ease-out transition-transform transition-medium'
                  }`}
                >
                  <NavLink
                    to="/orders"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname.includes('orders') && 'hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center align-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          className={`fill-current text-gray-900 ${
                            pathname.includes('orders') && 'text-gray-900'
                          }`}
                          fillRule="evenodd"
                          d="M2 18v-4h3.382l.723 1.447c.17.339.516.553.895.553h6c.379 0 .725-.214.895-.553L14.618 14H18v4H2zM19 1a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H2v9h4c.379 0 .725.214.895.553L7.618 14h4.764l.723-1.447c.17-.339.516-.553.895-.553h4V3h-3a1 1 0 0 1 0-2h4zM6.293 6.707a.999.999 0 1 1 1.414-1.414L9 6.586V1a1 1 0 0 1 2 0v5.586l1.293-1.293a.999.999 0 1 1 1.414 1.414l-3 3a.997.997 0 0 1-1.414 0l-3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname.includes('orders') && 'text-gray-900'
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
                          className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                            pathname.includes('products') &&
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0 h-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  className={`fill-current text-gray-900 ${
                                    pathname.includes('shop') &&
                                    'text-purple-300'
                                  }`}
                                  d="M19 0h-9c-.265 0-.52.106-.707.293l-9 9a.999.999 0 0 0 0 1.414l9 9a.997.997 0 0 0 1.414 0l9-9A.997.997 0 0 0 20 10V1a1 1 0 0 0-1-1zm-9 17.586L2.414 10 4 8.414 11.586 16 10 17.586zm8-8l-5 5L5.414 7l5-5H18v7.586zM15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Products
                              </span>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('products') && 'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/shop/products"
                                className={`block text-gray-900 hover:text-black transition duration-150 truncate `}
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname.includes('products') &&
                                    'text-gray-900'
                                  }`}
                                >
                                  All products
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('inventory') && 'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/shop/inventory"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname.includes('inventory') &&
                                    'text-gray-900'
                                  }`}
                                >
                                  Inventory
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('collections') &&
                                'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/shop/collections"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname.includes('collections') &&
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
                          className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                            pathname.includes('products') &&
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                enableBackground="new 0 0 48 48"
                                height="20px"
                                viewBox="0 0 48 48"
                                width="20px"
                                xmlSpace="preserve"
                                fill="currentColor"
                              >
                                <path
                                  className={`fill-current text-gray-900 ${
                                    pathname.includes('finances') &&
                                    'text-purple-300'
                                  }`}
                                  clipRule="evenodd"
                                  d="M43,40H5c-2.209,0-4-1.791-4-4V12c0-2.209,1.791-4,4-4h38c2.209,0,4,1.791,4,4v24  C47,38.209,45.209,40,43,40z M3,21h42v-4H3V21z M45,12c0-1.104-0.896-2-2-2H5c-1.104,0-2,0.896-2,2v3h42V12z M45,23H3v13  c0,1.104,0.896,2,2,2h38c1.104,0,2-0.896,2-2V23z M26,29h-4c-0.553,0-1-0.447-1-1c0-0.552,0.447-1,1-1h4c0.553,0,1,0.448,1,1  C27,28.553,26.553,29,26,29z M17,29H8c-0.553,0-1-0.447-1-1c0-0.552,0.447-1,1-1h9c0.553,0,1,0.448,1,1C18,28.553,17.553,29,17,29z   M8,32h6c0.553,0,1,0.448,1,1c0,0.553-0.447,1-1,1H8c-0.553,0-1-0.447-1-1C7,32.448,7.447,32,8,32z"
                                  fillRule="evenodd"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Finances
                              </span>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('balance') && 'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/finances/balance"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname.includes('finances/balance') &&
                                    'text-gray-900'
                                  }`}
                                >
                                  Balance
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('transactions') &&
                                'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/finances/transactions"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname.includes(
                                      'finances/transactions',
                                    ) && 'text-gray-900'
                                  }`}
                                >
                                  Transactions
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
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
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  }}
                </SidebarLinkGroup>

                {/* Customers */}
                {/* <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('customers') &&
                    'w-full bg-gray-200 ease-out transition-transform transition-medium'
                  }`}
                >
                  <NavLink
                    
                    to="/customers"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname.includes('customers') && 'hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center align-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          className={`fill-current text-gray-700 ${
                            pathname.includes('customers') && 'text-gray-900'
                          }`}
                          d="M17.707 15.293a.999.999 0 0 1 .241 1.023l-1 3A.999.999 0 0 1 16 20H4a1 1 0 0 1-.949-.684l-1-3a.999.999 0 0 1 .242-1.023C2.427 15.158 5.635 12 10 12c4.364 0 7.572 3.158 7.707 3.293zM15.28 18l.562-1.687c-.92-.752-3.155-2.313-5.84-2.313-2.704 0-4.928 1.558-5.844 2.31L4.72 18h10.56zM10 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 8c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname.includes('customers') && 'text-gray-900'
                        }`}
                      >
                        Customers
                      </span>
                    </div>
                  </NavLink>
                </li> */}
                {/* Analytics */}
                {/* <SidebarLinkGroup
                  activecondition={pathname.includes('analytics')}
                >
                  {(handleClick, open) => {
                    return (
                      <div className="hidden md:block">
                        <a
                          href="#0"
                          className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                            pathname.includes('analytics') &&
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
                            <div className="flex align-baseline ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path
                                  className={`fill-current text-gray-600 ${
                                    pathname.includes('analytics') &&
                                    'text-gray-900'
                                  }`}
                                  d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-1 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Analytics
                              </span>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                            <li className={`mb-1 last:mb-0 `}>
                              <NavLink
                                
                                to="/analytics/dashboards"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Dashboards
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/analytics/insights"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Insights
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/analytics/reports"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Reports
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/analytics/live"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Live View
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  }}
                </SidebarLinkGroup> */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname === '/discounts' &&
                    'w-full bg-gray-200 ease-out transition-transform transition-medium'
                  }`}
                >
                  <NavLink
                    to="/discounts"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname === '/discounts' && 'text-gray-900 '
                    }`}
                  >
                    <div className="flex items-center align-middle">
                      <svg
                        width="20"
                        height="20"
                        className="flex-shrink-0 h-5"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="48"
                          height="48"
                          fill="white"
                          fillOpacity="0.01"
                        />
                        <circle
                          cx="11"
                          cy="11"
                          r="5"
                          fill="none"
                          stroke="#333"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="37"
                          cy="37"
                          r="5"
                          fill="none"
                          stroke="#333"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M42 6L6 42"
                          className={`fill-current text-white ${
                            pathname.includes('discounts') && 'text-gray-900'
                          }`}
                          stroke="#333"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname === '/discounts' && 'text-gray-900'
                        }`}
                      >
                        Discounts
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Offers */}
                {/* <SidebarLinkGroup
                  activecondition={pathname.includes('discounts')}
                >
                  {(handleClick, open) => {
                    return (
                      <div className="block">
                        <a
                          href="#0"
                          className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                            pathname.includes('discounts') &&
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
                            <div className="flex align-baseline ">
                              <svg
                                width="20"
                                height="20"
                                className="flex-shrink-0 h-5"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="48"
                                  height="48"
                                  fill="white"
                                  fillOpacity="0.01"
                                />
                                <circle
                                  cx="11"
                                  cy="11"
                                  r="5"
                                  fill="none"
                                  stroke="#333"
                                  strokeWidth="4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <circle
                                  cx="37"
                                  cy="37"
                                  r="5"
                                  fill="none"
                                  stroke="#333"
                                  strokeWidth="4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M42 6L6 42"
                                  className={`fill-current text-white ${
                                    pathname.includes('discounts') &&
                                    'text-gray-900'
                                  }`}
                                  stroke="#333"
                                  strokeWidth="4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-1 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Discounts
                              </span>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                            <li className={`mb-1 last:mb-0 `}>
                              <NavLink
                                
                                to="/discounts"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  All discounts
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/discounts/sets"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Codes
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/discounts/vouchers"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Vouchers
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  }}
                </SidebarLinkGroup> */}
                {/* <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('discounts') &&
                    'w-full bg-gray-200 ease-out transition-transform transition-medium'
                  }`}
                >
                  <NavLink
                    
                    to="/discounts"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname.includes('discounts') && 'hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center align-middle">
                      <svg
                        width="20"
                        height="20"
                        className="flex-shrink-0 h-5"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="48"
                          height="48"
                          fill="white"
                          fillOpacity="0.01"
                        />
                        <circle
                          cx="11"
                          cy="11"
                          r="5"
                          fill="none"
                          stroke="#333"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="37"
                          cy="37"
                          r="5"
                          fill="none"
                          stroke="#333"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M42 6L6 42"
                          className={`fill-current text-white ${
                            pathname.includes('discounts') && 'text-gray-900'
                          }`}
                          stroke="#333"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname.includes('discounts') && 'text-gray-900'
                        }`}
                      >
                        Discounts
                      </span>
                    </div>
                  </NavLink>
                </li> */}
              </ul>
            </div>
            {/* More group */}
            <div>
              {/* <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
                <span
                  className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                  aria-hidden="true"
                >
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  Sales Channels
                </span>
              </h3> */}
              <ul className="mt-3">
                {/* <SidebarLinkGroup>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                            open && 'hover:text-gray-900'
                          }`}
                          onClick={e => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex">
                              <svg
                                className="flex-shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  className="fill-current text-gray-600"
                                  d="M8.07 16H10V8H8.07a8 8 0 110 8z"
                                />
                                <path
                                  className="fill-current text-gray-400"
                                  d="M15 12L8 6v5H0v2h8v5z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Channels
                              </span>
                            </div>
                            <div className="flex flex-shrink-0 ml-3">
                              <svg
                                className={`w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400 ${
                                  open && 'transform rotate-180'
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/signin"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Facebook
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/signup"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Facebook Shop
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/signin"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  WhatsApp
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/reset-password"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Instagram
                                </span>
                              </NavLink>
                            </li>

                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/reset-password"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  TikTok
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/reset-password"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Point of Sale
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/reset-password"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Twitter Business
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/signin"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Buy Button
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup> */}
                {/*  Store */}
                <div>
                  <SidebarLinkGroup
                    activecondition={pathname.includes('store')}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                              pathname.includes('store') &&
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
                              <div className="flex">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="flex-shrink-0 h-6 w-6"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path
                                    className={`fill-current text-gray-600 ${
                                      pathname.includes('store') &&
                                      'text-gray-900'
                                    }`}
                                    fillRule="evenodd"
                                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                  />
                                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                </svg>
                                <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Store
                                </span>
                              </div>

                              <div className="flex flex-shrink-0 ml-3">
                                <svg
                                  className={`w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400 ${
                                    open && 'transform rotate-180'
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                              <li
                                className={`py-2 rounded-sm mb-0.5 last:mb-0 disabled ${
                                  pathname.includes('domains') && 'bg-gray-200'
                                }`}
                              >
                                <NavLink
                                  to="/store/domains"
                                  className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                >
                                  <span
                                    className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200
                                      ${
                                        pathname === '/store/domains' &&
                                        'text-gray-900'
                                      }`}
                                  >
                                    Domains{' '}
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                                      coming soon
                                    </span>
                                  </span>
                                </NavLink>
                              </li>
                              <li
                                className={`py-2 rounded-sm mb-0.5 last:mb-0 disabled ${
                                  pathname.includes('theme') && 'bg-gray-200'
                                }`}
                              >
                                <NavLink
                                  to="/store/theme"
                                  className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                >
                                  <span
                                    className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200
                                      ${
                                        pathname === '/store/theme' &&
                                        'text-gray-900'
                                      }`}
                                  >
                                    Theme Editor{' '}
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                                      coming soon
                                    </span>
                                  </span>
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                </div>
              </ul>
            </div>
            {/* Settings*/}
            <div>
              <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
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
                {/* Settings */}
                <SidebarLinkGroup
                  activecondition={pathname.includes('settings')}
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                            pathname.includes('settings') &&
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
                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path
                                  className={`fill-current text-gray-600 ${
                                    pathname.includes('settings') &&
                                    'text-gray-900'
                                  }`}
                                  fillRule="evenodd"
                                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Settings
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex flex-shrink-0 ml-3">
                              <svg
                                className={`w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400 ${
                                  open && 'transform rotate-180'
                                }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-5 px-3 mt-1 ${!open && 'hidden'}`}>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('account') && 'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/settings/account"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname === '/settings/account' &&
                                    'text-gray-900'
                                  }`}
                                >
                                  Account
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('payments') && 'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/settings/payments"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname === '/settings/payments' &&
                                    'text-gray-900'
                                  }`}
                                >
                                  Payments
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('locations') && 'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/settings/locations"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname === '/settings/locations' &&
                                    'text-gray-900'
                                  }`}
                                >
                                  Locations
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('shipping') && 'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/settings/shipping"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname === '/settings/shipping' &&
                                    'text-gray-900'
                                  }`}
                                >
                                  Shipping
                                </span>
                              </NavLink>
                            </li>
                            <li
                              className={`py-2 rounded-sm mb-0.5 last:mb-0 ${
                                pathname.includes('policies') && 'bg-gray-200'
                              }`}
                            >
                              <NavLink
                                to="/settings/policies"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname === '/settings/policies' &&
                                    'text-gray-900'
                                  }`}
                                >
                                  Legal
                                </span>
                              </NavLink>
                            </li>
                            {/* <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/settings/sales-channels"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Sales Channels
                                </span>
                              </NavLink>
                            </li> */}
                            {/* <li className="mb-1 last:mb-0">
                              <NavLink
                                
                                to="/settings/feedback"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Give Feedback
                                </span>
                              </NavLink>
                            </li> */}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
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
