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
    <div className="hidden md:block">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
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
            <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === '/' && 'bg-gray-900'
                }`}
              >
                <NavLink
                  exact
                  to="/"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname === '/' && 'hover:text-gray-200'
                  }`}
                >
                  <div className="flex">
                    <svg className="flex-shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname === '/' && '!text-indigo-500'
                        }`}
                        d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                      />
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname === '/' && 'text-indigo-600'
                        }`}
                        d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname === '/' && 'text-indigo-200'
                        }`}
                        d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
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
                  pathname.includes('orders') && 'bg-gray-900'
                }`}
              >
                <NavLink
                  exact
                  to="/orders"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('orders') && 'hover:text-gray-200'
                  }`}
                >
                  <div className="flex">
                    <svg className="flex-shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes('orders') && 'text-indigo-500'
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes('orders') && 'text-indigo-300'
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
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
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('products') && 'hover:text-gray-200'
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
                                className={`fill-current text-gray-400 ${
                                  pathname.includes('shop') && 'text-indigo-300'
                                }`}
                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                              />
                              <path
                                className={`fill-current text-gray-700 ${
                                  pathname.includes('shop') &&
                                  '!text-indigo-600'
                                }`}
                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                              />
                              <path
                                className={`fill-current text-gray-600 ${
                                  pathname.includes('shop') && 'text-indigo-500'
                                }`}
                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                  pathname.includes('campaigns') && 'bg-gray-900'
                }`}
              >
                <NavLink
                  exact
                  to="/customers"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('campaigns') && 'hover:text-gray-200'
                  }`}
                >
                  <div className="flex">
                    <svg className="flex-shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes('campaigns') && 'text-indigo-500'
                        }`}
                        d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes('campaigns') && 'text-indigo-300'
                        }`}
                        d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
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
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('analytics') &&
                          'hover:text-gray-200'
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
                                className={`fill-current text-gray-400 ${
                                  pathname.includes('analytics') &&
                                  'text-indigo-300'
                                }`}
                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                              />
                              <path
                                className={`fill-current text-gray-700 ${
                                  pathname.includes('analytics') &&
                                  '!text-indigo-600'
                                }`}
                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                              />
                              <path
                                className={`fill-current text-gray-600 ${
                                  pathname.includes('analytics') &&
                                  'text-indigo-500'
                                }`}
                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                  pathname.includes('campaigns') && 'bg-gray-900'
                }`}
              >
                <NavLink
                  exact
                  to="/offers"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes('campaigns') && 'hover:text-gray-200'
                  }`}
                >
                  <div className="flex">
                    <svg className="flex-shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes('campaigns') && 'text-indigo-500'
                        }`}
                        d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes('campaigns') && 'text-indigo-300'
                        }`}
                        d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
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
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                          open && 'hover:text-gray-200'
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('component') &&
                          'hover:text-gray-200'
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
                              <circle
                                className={`fill-current text-gray-600 ${
                                  pathname.includes('component') &&
                                  'text-indigo-500'
                                }`}
                                cx="16"
                                cy="8"
                                r="8"
                              />
                              <circle
                                className={`fill-current text-gray-400 ${
                                  pathname.includes('component') &&
                                  'text-indigo-300'
                                }`}
                                cx="8"
                                cy="16"
                                r="8"
                              />
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
              <SidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes('settings') && 'hover:text-gray-200'
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
                                className={`fill-current text-gray-600 ${
                                  pathname.includes('settings') &&
                                  'text-indigo-500'
                                }`}
                                d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                              />
                              <path
                                className={`fill-current text-gray-400 ${
                                  pathname.includes('settings') &&
                                  'text-indigo-300'
                                }`}
                                d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                              />
                              <path
                                className={`fill-current text-gray-600 ${
                                  pathname.includes('settings') &&
                                  'text-indigo-500'
                                }`}
                                d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                              />
                              <path
                                className={`fill-current text-gray-400 ${
                                  pathname.includes('settings') &&
                                  'text-indigo-300'
                                }`}
                                d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                              className="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
  );
}

export default Sidebar;
