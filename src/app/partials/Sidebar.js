import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

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
          className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 bg-white p-4 transition-all duration-200 ease-in-out ${
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
                    pathname === '/' && 'bg-indigo-200'
                  }`}
                >
                  <NavLink
                    exact
                    to="/"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname === '/' && 'text-gray-900'
                    }`}
                  >
                    <div className="flex">
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
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Home
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Orders */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('orders') && 'bg-indigo-200'
                  }`}
                >
                  <NavLink
                    exact
                    to="/orders"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname.includes('orders') && 'hover:text-gray-900'
                    }`}
                  >
                    <div className="flex">
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
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
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
                            <div className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0 h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path
                                  className={`fill-current text-gray-400 ${
                                    pathname.includes('shop') &&
                                    'text-indigo-300'
                                  }`}
                                  d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
                                />
                                <path
                                  className={`fill-current text-gray-700 ${
                                    pathname.includes('shop') &&
                                    '!text-indigo-600'
                                  }`}
                                  d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
                                />
                                <path
                                  className={`fill-current text-gray-600 ${
                                    pathname.includes('shop') &&
                                    'text-indigo-500'
                                  }`}
                                  d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Products
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
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/shop/products"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-indigo-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
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
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
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
                    pathname.includes('customers') && 'bg-indigo-200'
                  }`}
                >
                  <NavLink
                    exact
                    to="/customers"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname.includes('customers') && 'hover:text-gray-900'
                    }`}
                  >
                    <div className="flex">
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
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
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
                            <div className="flex">
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
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Analytics
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
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
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
                    pathname.includes('discounts') && 'bg-indigo-200'
                  }`}
                >
                  <NavLink
                    exact
                    to="/discounts"
                    className={`block text-gray-900 hover:text-black truncate transition duration-150 ${
                      pathname.includes('discounts') && 'hover:text-gray-900'
                    }`}
                  >
                    <div className="flex">
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
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
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
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
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
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
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
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
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
