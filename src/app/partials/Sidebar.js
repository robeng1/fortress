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
      <div className="block">
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
          className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 bg-gray-100 p-4 transition-all duration-200 ease-in-out ${
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
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                style={{ background: 'rgb(5, 15, 44) ' }}
                preserveAspectRatio="xMidYMid"
              >
                <defs>
                  <filter
                    id="editing-hole"
                    x="-100%"
                    y="-100%"
                    width="300%"
                    height="300%"
                  >
                    <feFlood
                      floodColor="rgba(85.40012578616351%,88.36568342959823%,89.3095238095238%,0.955)"
                      result="black"
                    ></feFlood>
                    <feMorphology
                      operator="dilate"
                      radius="2"
                      in="SourceGraphic"
                      result="erode"
                    ></feMorphology>
                    <feGaussianBlur
                      in="erode"
                      stdDeviation="4"
                      result="blur"
                    ></feGaussianBlur>
                    <feOffset
                      in="blur"
                      dx="2"
                      dy="2"
                      result="offset"
                    ></feOffset>
                    <feComposite
                      operator="atop"
                      in="offset"
                      in2="black"
                      result="merge"
                    ></feComposite>
                    <feComposite
                      operator="in"
                      in="merge"
                      in2="SourceGraphic"
                      result="inner-shadow"
                    ></feComposite>
                  </filter>
                </defs>
                <g filter="url(#editing-hole)">
                  <g transform="translate(133.94912147521973, 107.3499984741211)">
                    <path
                      d="M14.27-20.16L14.27-20.16L14.27-3.20L19.20-1.92L19.20-1.92Q19.39-0.70 18.88 0.32L18.88 0.32L18.88 0.32Q13.12 0 11.07 0L11.07 0L11.07 0Q8.26 0 2.30 0.32L2.30 0.32L2.30 0.32Q2.11-0.90 2.43-1.92L2.43-1.92L2.43-1.92Q5.25-2.24 7.55-3.20L7.55-3.20L7.55-41.60L2.62-42.88L2.62-42.88Q2.43-44.10 2.94-45.12L2.94-45.12L2.94-45.12Q8.32-44.74 12.03-44.80L12.03-44.80L18.05-45.18L18.05-45.18Q26.11-45.63 31.04-42.34L31.04-42.34L31.04-42.34Q35.97-39.04 35.97-32.77L35.97-32.77L35.97-32.77Q35.97-24.45 27.20-21.50L27.20-21.50L27.20-21.25L27.20-21.25Q27.90-20.80 28.61-19.20L28.61-19.20L28.61-19.20Q33.92-7.23 35.01-5.50L35.01-5.50L35.01-5.50Q36.61-2.62 38.53-2.18L38.53-2.18L38.53-2.18Q39.30-1.98 40.32-1.98L40.32-1.98L41.09-2.05L41.09-2.05Q41.60-1.28 41.47 0L41.47 0L41.47 0Q40.70 0.90 37.25 0.96L37.25 0.96L37.25 0.96Q33.02 0.96 30.27-2.37L30.27-2.37L30.27-2.37Q29.18-3.65 28.16-5.86L28.16-5.86L28.16-5.86Q27.14-8.06 25.44-12.16L25.44-12.16L25.44-12.16Q23.74-16.26 21.76-20.22L21.76-20.22L21.76-20.22Q19.65-20.03 17.47-20.03L17.47-20.03L17.47-20.03Q16.32-20.03 14.27-20.16ZM29.70-32.38L29.70-32.38L29.70-32.38Q29.70-37.06 26.66-39.65L26.66-39.65L26.66-39.65Q23.62-42.24 18.94-42.24L18.94-42.24L18.94-42.24Q16.90-42.24 14.27-41.54L14.27-41.54L14.27-23.10L14.27-23.10Q16.13-22.66 18.11-22.66L18.11-22.66L18.11-22.66Q23.62-22.66 26.66-25.25L26.66-25.25L26.66-25.25Q29.70-27.84 29.70-32.38ZM69.12-17.09L49.79-17.28L49.79-16L49.79-16Q49.79-9.60 52.38-6.02L52.38-6.02L52.38-6.02Q54.98-2.43 59.46-2.43L59.46-2.43L59.46-2.43Q62.34-2.43 64.06-2.98L64.06-2.98L64.06-2.98Q65.79-3.52 68.42-5.31L68.42-5.31L68.42-5.31Q69.44-4.86 69.57-3.78L69.57-3.78L69.57-3.78Q65.15 1.02 59.26 1.09L59.26 1.09L59.26 1.09Q51.90 1.09 47.49-3.52L47.49-3.52L47.49-3.52Q43.07-8.13 43.01-16L43.01-16L43.01-16Q43.07-24.06 47.65-28.58L47.65-28.58L47.65-28.58Q52.22-33.09 58.94-33.09L58.94-33.09L58.94-33.09Q64.38-33.09 67.23-29.41L67.23-29.41L67.23-29.41Q70.08-25.73 70.08-19.46L70.08-19.46L70.08-19.46Q70.08-18.37 70.02-17.79L70.02-17.79L69.12-17.09ZM58.88-30.34L58.88-30.34L58.88-30.34Q55.87-30.34 53.34-27.62L53.34-27.62L53.34-27.62Q50.82-24.90 50.05-19.90L50.05-19.90L64-20.67L64-20.67Q64-25.79 62.88-28.06L62.88-28.06L62.88-28.06Q61.76-30.34 58.88-30.34ZM74.62-16L74.62-16L74.62-16Q74.62-24 79.30-28.67L79.30-28.67L79.30-28.67Q83.97-33.34 90.75-33.28L90.75-33.28L90.75-33.28Q98.18-33.28 102.53-28.35L102.53-28.35L102.53-28.35Q106.88-23.42 106.88-16L106.88-16L106.88-16Q106.88-7.87 102.27-3.26L102.27-3.26L102.27-3.26Q97.66 1.34 90.75 1.28L90.75 1.28L90.75 1.28Q83.14 1.28 78.88-3.65L78.88-3.65L78.88-3.65Q74.62-8.58 74.62-16ZM99.97-15.10L99.97-15.10L99.97-15.10Q100.10-21.18 97.79-25.86L97.79-25.86L97.79-25.86Q95.49-30.53 90.62-30.53L90.62-30.53L90.62-30.53Q85.89-30.53 83.68-26.40L83.68-26.40L83.68-26.40Q81.47-22.27 81.54-15.55L81.54-15.55L81.54-15.55Q81.54-12.61 82.08-10.05L82.08-10.05L82.08-10.05Q82.62-7.49 83.78-5.57L83.78-5.57L83.78-5.57Q84.93-3.65 86.69-2.56L86.69-2.56L86.69-2.56Q88.45-1.47 90.88-1.47L90.88-1.47L90.88-1.47Q94.85-1.41 97.41-4.67L97.41-4.67L97.41-4.67Q99.97-7.94 99.97-15.10ZM121.09-32.13L121.09-32.13L121.02-29.57L121.34-29.25L121.34-29.25Q125.89-33.28 130.94-33.28L130.94-33.28L130.94-33.28Q137.02-33.22 140.61-28.48L140.61-28.48L140.61-28.48Q144.19-23.74 144.26-16.83L144.26-16.83L144.26-16.83Q144.26-8.06 139.94-3.42L139.94-3.42L139.94-3.42Q135.62 1.22 127.87 1.22L127.87 1.22L127.87 1.22Q124.80 1.15 121.34-0.19L121.34-0.19L121.34 12.80L126.91 14.08L126.91 14.08Q127.10 15.30 126.59 16.32L126.59 16.32L126.59 16.32Q120.83 16 118.14 16L118.14 16L118.14 16Q115.65 16 110.34 16.32L110.34 16.32L110.34 16.32Q110.14 15.10 110.46 14.08L110.46 14.08L110.46 14.08Q113.54 13.44 114.94 12.80L114.94 12.80L114.94-28.16L109.70-28.67L109.70-28.67Q109.50-29.95 110.02-30.91L110.02-30.91L110.02-30.91Q112.77-31.23 118.85-32.64L118.85-32.64L118.85-32.64Q119.87-32.58 121.09-32.13ZM121.34-25.86L121.34-25.86L121.34-3.78L121.34-3.78Q124.35-1.73 127.74-1.73L127.74-1.73L127.74-1.73Q132.48-1.73 134.98-5.57L134.98-5.57L134.98-5.57Q137.47-9.41 137.47-16.45L137.47-16.45L137.47-16.45Q137.47-22.91 135.23-26.18L135.23-26.18L135.23-26.18Q132.99-29.44 129.02-29.44L129.02-29.44L129.02-29.44Q126.78-29.44 124.54-28.32L124.54-28.32L124.54-28.32Q122.30-27.20 121.34-25.86ZM158.91-47.68L158.91-47.68L158.91-3.20L163.84-1.92L163.84-1.92Q164.03-0.70 163.52 0.32L163.52 0.32L163.52 0.32Q157.76 0 155.71 0L155.71 0L155.71 0Q153.86 0 147.90 0.32L147.90 0.32L147.90 0.32Q147.71-0.90 148.03-1.92L148.03-1.92L148.03-1.92Q151.62-2.82 152.51-3.20L152.51-3.20L152.51-43.90L147.20-44.42L147.20-44.42Q147.01-45.70 147.52-46.66L147.52-46.66L147.52-46.66Q152.83-47.42 156.48-48.38L156.48-48.38L156.48-48.38Q157.57-48.32 158.91-47.68ZM193.09-17.09L173.76-17.28L173.76-16L173.76-16Q173.76-9.60 176.35-6.02L176.35-6.02L176.35-6.02Q178.94-2.43 183.42-2.43L183.42-2.43L183.42-2.43Q186.30-2.43 188.03-2.98L188.03-2.98L188.03-2.98Q189.76-3.52 192.38-5.31L192.38-5.31L192.38-5.31Q193.41-4.86 193.54-3.78L193.54-3.78L193.54-3.78Q189.12 1.02 183.23 1.09L183.23 1.09L183.23 1.09Q175.87 1.09 171.46-3.52L171.46-3.52L171.46-3.52Q167.04-8.13 166.98-16L166.98-16L166.98-16Q167.04-24.06 171.62-28.58L171.62-28.58L171.62-28.58Q176.19-33.09 182.91-33.09L182.91-33.09L182.91-33.09Q188.35-33.09 191.20-29.41L191.20-29.41L191.20-29.41Q194.05-25.73 194.05-19.46L194.05-19.46L194.05-19.46Q194.05-18.37 193.98-17.79L193.98-17.79L193.09-17.09ZM182.85-30.34L182.85-30.34L182.85-30.34Q179.84-30.34 177.31-27.62L177.31-27.62L177.31-27.62Q174.78-24.90 174.02-19.90L174.02-19.90L187.97-20.67L187.97-20.67Q187.97-25.79 186.85-28.06L186.85-28.06L186.85-28.06Q185.73-30.34 182.85-30.34ZM226.05-28.80L226.05-28.80L216.38-16.96L225.92-3.20L225.92-3.20Q226.62-2.82 227.30-2.62L227.30-2.62L227.30-2.62Q227.97-2.43 228.77-2.24L228.77-2.24L228.77-2.24Q229.57-2.05 230.21-1.92L230.21-1.92L230.21-1.92Q230.40-0.70 229.89 0.32L229.89 0.32L229.89 0.32Q224.77 0 222.72 0L222.72 0L222.72 0Q220.80 0 214.91 0.32L214.91 0.32L214.91 0.32Q214.72-0.90 215.04-1.92L215.04-1.92L218.88-3.01L212.54-12.16L205.38-3.20L209.66-1.92L209.66-1.92Q209.86-0.70 209.34 0.32L209.34 0.32L209.34 0.32Q204.86 0 203.07 0L203.07 0L203.07 0Q200.90 0 196.54 0.32L196.54 0.32L196.54 0.32Q196.35-0.90 196.67-1.92L196.67-1.92L196.67-1.92Q200.06-2.37 201.28-3.20L201.28-3.20L210.69-14.91L201.22-28.80L196.29-30.08L196.29-30.08Q196.10-31.30 196.61-32.32L196.61-32.32L196.61-32.32Q202.37-32 204.42-32L204.42-32L204.42-32Q206.72-32 212.67-32.32L212.67-32.32L212.67-32.32Q212.86-31.10 212.54-30.08L212.54-30.08L212.54-30.08Q209.73-29.63 208.26-28.80L208.26-28.80L214.53-19.71L221.82-28.80L216.77-30.08L216.77-30.08Q216.58-31.30 217.09-32.32L217.09-32.32L217.09-32.32Q221.57-32 224.06-32L224.06-32L224.06-32Q226.18-32 230.78-32.32L230.78-32.32L230.78-32.32Q230.98-31.10 230.66-30.08L230.66-30.08L230.66-30.08Q227.46-29.50 226.05-28.80Z"
                      fill="#00aeff"
                    ></path>
                  </g>
                </g>
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
                  className={`px-3 py-2 rounded-sm mb-0.5 hidden md:block last:mb-0 ${
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
                            pathname === '/' && '!text-purple-500'
                          }`}
                          d="M19.664 8.252l-9-8a1 1 0 0 0-1.328 0L8 1.44V1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.773L.336 8.252a1.001 1.001 0 0 0 1.328 1.496L2 9.449V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.449l.336.299a.997.997 0 0 0 1.41-.083 1.001 1.001 0 0 0-.082-1.413zM16 18h-2v-5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H4V7.671l6-5.333 6 5.333V18zm-8 0h4v-4H8v4zM4 2h2v1.218L4 4.996V2z"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname === '/' && '!text-purple-500'
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
                            pathname.includes('orders') && '!text-purple-500'
                          }`}
                          fillRule="evenodd"
                          d="M2 18v-4h3.382l.723 1.447c.17.339.516.553.895.553h6c.379 0 .725-.214.895-.553L14.618 14H18v4H2zM19 1a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H2v9h4c.379 0 .725.214.895.553L7.618 14h4.764l.723-1.447c.17-.339.516-.553.895-.553h4V3h-3a1 1 0 0 1 0-2h4zM6.293 6.707a.999.999 0 1 1 1.414-1.414L9 6.586V1a1 1 0 0 1 2 0v5.586l1.293-1.293a.999.999 0 1 1 1.414 1.414l-3 3a.997.997 0 0 1-1.414 0l-3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname.includes('orders') && '!text-purple-500'
                        }`}
                      >
                        Orders
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Products */}
                <div className="hidden md:block">
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
                              {/* Icon */}
                              {/* <div className="flex flex-shrink-0 ml-2">
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
                              </div> */}
                            </div>
                          </a>
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-5 mt-1 ${!open && 'hidden'}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  exact
                                  to="/shop/products"
                                  className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                  activeClassName="!text-purple-500"
                                >
                                  <span
                                    className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                      pathname.includes('products') &&
                                      '!text-purple-500'
                                    }`}
                                  >
                                    All products
                                  </span>
                                </NavLink>
                              </li>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  exact
                                  to="/shop/inventory"
                                  className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                  activeClassName="!text-purple-500"
                                >
                                  <span
                                    className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                                      pathname.includes('inventory') &&
                                      '!text-purple-500'
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
                                  activeClassName="!text-purple-500"
                                >
                                  <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
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
                </div>

                {/* Customers */}
                {/* <li
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
                            pathname.includes('customers') && '!text-purple-500'
                          }`}
                          d="M17.707 15.293a.999.999 0 0 1 .241 1.023l-1 3A.999.999 0 0 1 16 20H4a1 1 0 0 1-.949-.684l-1-3a.999.999 0 0 1 .242-1.023C2.427 15.158 5.635 12 10 12c4.364 0 7.572 3.158 7.707 3.293zM15.28 18l.562-1.687c-.92-.752-3.155-2.313-5.84-2.313-2.704 0-4.928 1.558-5.844 2.31L4.72 18h10.56zM10 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 8c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname.includes('customers') && '!text-purple-500'
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
                                    '!text-purple-500'
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
                                exact
                                to="/analytics/dashboards"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-purple-500"
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
                                activeClassName="!text-purple-500"
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
                                activeClassName="!text-purple-500"
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
                                activeClassName="!text-purple-500"
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
                {/* Offers */}
                <SidebarLinkGroup
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
                                    '!text-purple-500'
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
                                exact
                                to="/discounts"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-purple-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  All discounts
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/discounts/sets"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-purple-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Codes
                                </span>
                              </NavLink>
                            </li>
                            {/* <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/discounts/vouchers"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-purple-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Vouchers
                                </span>
                              </NavLink>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    );
                  }}
                </SidebarLinkGroup>
                {/* <li
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
                            pathname.includes('discounts') && '!text-purple-500'
                          }`}
                          stroke="#333"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className={`text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${
                          pathname.includes('discounts') && '!text-purple-500'
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
                </SidebarLinkGroup> */}
                {/* Online Store */}
                {/* <div className="hidden md:block">
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
                                      '!text-purple-500'
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
                                  activeClassName="!text-purple-500"
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
                                  activeClassName="!text-purple-500"
                                >
                                  <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Domains
                                  </span>
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                </div> */}
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
                                    '!text-purple-500'
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
                                activeClassName="!text-purple-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Account
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/payments"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-purple-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Payments
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/locations"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-purple-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Locations
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/shipping"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-purple-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Delivery Fees
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/policies"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-purple-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Legal
                                </span>
                              </NavLink>
                            </li>
                            {/* <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/sales-channels"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-purple-500"
                              >
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Sales Channels
                                </span>
                              </NavLink>
                            </li> */}
                            {/* <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/settings/feedback"
                                className="block text-gray-900 hover:text-black transition duration-150 truncate"
                                activeClassName="!text-purple-500"
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
