import React, { lazy, useState } from 'react';
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import RatesPanel from 'partials/settings/RatesPanel';
import { Link } from 'react-router-dom';

function Rates() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          location={'Shipping'}
        />
        <div className="px-6 py-8 bg-slate-50 border border-slate-200 rounded-sm">
          <div className="text-start">
            <ul className="inline-flex flex-wrap text-sm font-medium">
              <li className="flex items-center">
                <Link
                  to="/settings"
                  className="text-blue-500 hover:text-indigo-500"
                >
                  Settings
                </Link>
                <svg
                  className="h-4 w-4 fill-current text-slate-400 mx-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                </svg>
              </li>
              <li className="flex items-center">
                <Link
                  to="/settings/shipping"
                  className="text-slate-500 hover:text-indigo-500"
                >
                  Shipping
                </Link>
              </li>
            </ul>
            {/* End */}
          </div>
        </div>
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
            {/* Content */}
            <div className="bg-white shadow-lg rounded-sm mb-20">
              <div className="flex flex-col md:flex-row md:-mr-px">
                <RatesPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Rates;
