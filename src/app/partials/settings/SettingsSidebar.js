import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SettingsSidebar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-gray-200 min-w-60 md:space-y-3">
      {/* Group 1 */}
      <div>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-3">
          Business settings
        </div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
              to="/settings/account"
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings/account') && 'bg-purple-50'
              }`}
            >
              <svg
                className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${
                  pathname.includes('/settings/account') && 'text-purple-400'
                }`}
                viewBox="0 0 16 16"
              >
                <path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z" />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings/account')
                    ? 'text-purple-500'
                    : 'hover:text-gray-700'
                }`}
              >
                Account
              </span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
              to="/settings/payments"
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings/payments') && 'bg-purple-50'
              }`}
            >
              <svg
                className={`w-5 h-5 flex-shrink-0 fill-current text-gray-400 mr-2 ${
                  pathname.includes('/settings/payments') && 'text-purple-400'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings/payments')
                    ? 'text-purple-500'
                    : 'hover:text-gray-700'
                }`}
              >
                Payments
              </span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
              to="/settings/locations"
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings/locations') && 'bg-purple-50'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 flex-shrink-0 fill-current text-gray-400 mr-2 ${
                  pathname.includes('/settings/locations') && 'text-purple-400'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings/locations')
                    ? 'text-purple-500'
                    : 'hover:text-gray-700'
                }`}
              >
                Locations
              </span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
              to="/settings/shipping"
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings/shipping') && 'bg-purple-50'
              }`}
            >
              <svg
                className={`w-5 h-5 flex-shrink-0 fill-current text-gray-400 mr-2 ${
                  pathname.includes('/settings/shipping') && 'text-purple-400'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings/shipping')
                    ? 'text-purple-500'
                    : 'hover:text-gray-700'
                }`}
              >
                Shipping
              </span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
              to="/settings/policies"
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings/policies') && 'bg-purple-50'
              }`}
            >
              <svg
                className={`w-5 h-5 flex-shrink-0 fill-current text-gray-400 mr-2 ${
                  pathname.includes('/settings/policies') && 'text-purple-400'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings/policies')
                    ? 'text-purple-500'
                    : 'hover:text-gray-700'
                }`}
              >
                Legal
              </span>
            </NavLink>
          </li>
          {/* <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
             
              to="/settings/sales-channels"
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings/sales-channels') && 'bg-purple-50'
              }`}
            >
              <svg
                className={`w-5 h-5 flex-shrink-0 fill-current text-gray-400 mr-2 ${
                  pathname.includes('/settings/sales-channels') &&
                  'text-purple-400'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings/sales-channels')
                    ? 'text-purple-500'
                    : 'hover:text-gray-700'
                }`}
              >
                Sales Channel
              </span>
            </NavLink>
          </li> */}
        </ul>
      </div>
      {/* Group 2 */}
      {/* <div>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-3">
          Experience
        </div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
             
              to="/settings/feedback"
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes('/settings/feedback') && 'bg-purple-50'
              }`}
            >
              <svg
                className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${
                  pathname.includes('/settings/feedback') && 'text-purple-400'
                }`}
                viewBox="0 0 16 16"
              >
                <path d="M7.001 3h2v4h-2V3zm1 7a1 1 0 110-2 1 1 0 010 2zM15 16a1 1 0 01-.6-.2L10.667 13H1a1 1 0 01-1-1V1a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1zM2 11h9a1 1 0 01.6.2L14 13V2H2v9z" />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes('/settings/feedback')
                    ? 'text-purple-500'
                    : 'hover:text-gray-700'
                }`}
              >
                Give Feedback
              </span>
            </NavLink>
          </li>
        </ul>
      </div> */}
    </div>
  );
}

export default SettingsSidebar;
