import React, { lazy, useState } from 'react';

import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import SettingsSidebar from 'partials/settings/SettingsSidebar';
const PaymentPanel = lazy(() => import('partials/settings/PaymentsPanel'));

function Payments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          location={'Payment'}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Content */}
            <div className="bg-white shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                <SettingsSidebar />
                <PaymentPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Payments;