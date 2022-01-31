import React, { useState } from 'react';

import BottomNav from 'app/components/BottomNav';
import Sidebar from 'app/partials/Sidebar';
import Header from 'app/partials/Header';
import SettingsSidebar from 'app/partials/settings/SettingsSidebar';
import PaymentPanel from 'app/partials/settings/PaymentsPanel';

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
          location={undefined}
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
      <BottomNav />
    </div>
  );
}

export default Payments;
