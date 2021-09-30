import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import BottomNav from 'app/components/BottomNav';

import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

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
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <>
      <div className="hidden md:block">
        {/* Sidebar backdrop (mobile only) */}
        <div
          className={`fixed inset-0 bg-gray-100 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden="true"
        ></div>

        {/* Sidebar */}
        <div
          id="sidebar"
          ref={sidebar}
          className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 bg-gray-200 p-4 transition-all duration-200 ease-in-out ${
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
            <NavLink exact to="/" className="block">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <defs>
                  <linearGradient
                    x1="28.538%"
                    y1="20.229%"
                    x2="100%"
                    y2="108.156%"
                    id="logo-a"
                  >
                    <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                    <stop stopColor="#A5B4FC" offset="100%" />
                  </linearGradient>
                  <linearGradient
                    x1="88.638%"
                    y1="29.267%"
                    x2="22.42%"
                    y2="100%"
                    id="logo-b"
                  >
                    <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                    <stop stopColor="#38BDF8" offset="100%" />
                  </linearGradient>
                </defs>
                <rect fill="#6366F1" width="32" height="32" rx="16" />
                <path
                  d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                  fill="#4F46E5"
                />
                <path
                  d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                  fill="url(#logo-a)"
                />
                <path
                  d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                  fill="url(#logo-b)"
                />
              </svg>
            </NavLink>
          </div>

          {/* Links */}
          <div className="space-y-8">
            {/* Pages group */}
            <div>
              <ul className="mt-0">
                {/* Dashboard */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname === '/' &&
                    'w-full bg-white rounded-lg shadow ease-out transition-transform transition-medium'
                  }`}
                >
                  <NavLink
                    exact
                    to="/"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname === '/' && 'text-gray-900 '
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
                            pathname === '/' && '!text-indigo-500'
                          }`}
                          d="M19.664 8.252l-9-8a1 1 0 0 0-1.328 0L8 1.44V1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.773L.336 8.252a1.001 1.001 0 0 0 1.328 1.496L2 9.449V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.449l.336.299a.997.997 0 0 0 1.41-.083 1.001 1.001 0 0 0-.082-1.413zM16 18h-2v-5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H4V7.671l6-5.333 6 5.333V18zm-8 0h4v-4H8v4zM4 2h2v1.218L4 4.996V2z"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname === '/' && '!text-indigo-500'
                        }`}
                      >
                        Home
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Orders */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('orders') &&
                    'w-full bg-white rounded-lg shadow ease-out transition-transform transition-medium'
                  }`}
                >
                  <NavLink
                    exact
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
                            pathname.includes('orders') && '!text-indigo-500'
                          }`}
                          fillRule="evenodd"
                          d="M2 18v-4h3.382l.723 1.447c.17.339.516.553.895.553h6c.379 0 .725-.214.895-.553L14.618 14H18v4H2zM19 1a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H2v9h4c.379 0 .725.214.895.553L7.618 14h4.764l.723-1.447c.17-.339.516-.553.895-.553h4V3h-3a1 1 0 0 1 0-2h4zM6.293 6.707a.999.999 0 1 1 1.414-1.414L9 6.586V1a1 1 0 0 1 2 0v5.586l1.293-1.293a.999.999 0 1 1 1.414 1.414l-3 3a.997.997 0 0 1-1.414 0l-3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname.includes('orders') && '!text-indigo-500'
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
                      <React.Fragment>
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
                                    'text-indigo-300'
                                  }`}
                                  d="M19 0h-9c-.265 0-.52.106-.707.293l-9 9a.999.999 0 0 0 0 1.414l9 9a.997.997 0 0 0 1.414 0l9-9A.997.997 0 0 0 20 10V1a1 1 0 0 0-1-1zm-9 17.586L2.414 10 4 8.414 11.586 16 10 17.586zm8-8l-5 5L5.414 7l5-5H18v7.586zM15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Products
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex flex-shrink-0 ml-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/shop/products"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname.includes('products') &&
                                    '!text-indigo-500'
                                  }`}
                                >
                                  All Products
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/shop/inventory"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span
                                  className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                    pathname.includes('inventory') &&
                                    '!text-indigo-500'
                                  }`}
                                >
                                  Inventory
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/shop/collections"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Collections
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                {/* Customers */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('customers') &&
                    'w-full bg-white rounded-lg shadow ease-out transition-transform transition-medium'
                  }`}
                >
                  <NavLink
                    exact
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
                            pathname.includes('customers') && '!text-indigo-500'
                          }`}
                          d="M17.707 15.293a.999.999 0 0 1 .241 1.023l-1 3A.999.999 0 0 1 16 20H4a1 1 0 0 1-.949-.684l-1-3a.999.999 0 0 1 .242-1.023C2.427 15.158 5.635 12 10 12c4.364 0 7.572 3.158 7.707 3.293zM15.28 18l.562-1.687c-.92-.752-3.155-2.313-5.84-2.313-2.704 0-4.928 1.558-5.844 2.31L4.72 18h10.56zM10 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 8c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname.includes('customers') && '!text-indigo-500'
                        }`}
                      >
                        Customers
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Analytics */}
                <SidebarLinkGroup
                  activecondition={pathname.includes('analytics')}
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
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
                                    '!text-indigo-500'
                                  }`}
                                  d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-1 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Analytics
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex flex-shrink-0 ml-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                            <li className={`mb-1 last:mb-0 `}>
                              <NavLink
                                exact
                                to="/analytics/dashboards"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Dashboards
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/analytics/insights"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Insights
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/analytics/reports"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Reports
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/analytics/live"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Live View
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                {/* Offers */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('discounts') &&
                    'w-full bg-white rounded-lg shadow ease-out transition-transform transition-medium'
                  }`}
                >
                  <NavLink
                    exact
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
                          fill-opacity="0.01"
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
                            pathname.includes('discounts') && '!text-indigo-500'
                          }`}
                          stroke="#333"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname.includes('discounts') && '!text-indigo-500'
                        }`}
                      >
                        Discounts
                      </span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* More group */}
            <div>
              <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
                <span
                  className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                  aria-hidden="true"
                >
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  Sales Channels
                </span>
              </h3>
              <ul className="mt-3">
                {/* Channels */}
                <SidebarLinkGroup>
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
                            {/* Icon */}
                            <div className="flex flex-shrink-0 ml-2">
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
                                exact
                                to="/signin"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Reo App
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/signin"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Reo Chat
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
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
                                exact
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
                                exact
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
                                exact
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
                                exact
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
                                exact
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
                                exact
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
                                exact
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
                </SidebarLinkGroup>
                {/* Online Store */}
                <SidebarLinkGroup
                  activecondition={pathname.includes('component')}
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                            pathname.includes('component') &&
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
                                    pathname.includes('component') &&
                                    '!text-indigo-500'
                                  }`}
                                  fillRule="evenodd"
                                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                  clipRule="evenodd"
                                />
                                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Online Store
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex flex-shrink-0 ml-2">
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
                                exact
                                to="/component/button"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Themes
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/component/form"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Domains
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/component/dropdown"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Navigation
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/component/alert"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Preferences
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
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
                                    '!text-indigo-500'
                                  }`}
                                  fillRule="evenodd"
                                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Settings
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex flex-shrink-0 ml-2">
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
                                exact
                                to="/settings/account"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  General
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/notifications"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Payments
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/apps"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Locations
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/plans"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Legal
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/billing"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Sales Channels
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/feedback"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Give Feedback
                                </span>
                              </NavLink>
                            </li>
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
