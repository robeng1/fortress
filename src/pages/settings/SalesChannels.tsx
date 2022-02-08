import React, { useState } from 'react';

import BottomNav from 'components/BottomNav';
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import SettingsSidebar from 'partials/settings/SettingsSidebar';
import SalesChannelsPanel from 'partials/settings/SalesChannelsPanel';

function SalesChannels() {
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
          location={'Legal'}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}

            {/* Content */}
            <div className="bg-white shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                <SettingsSidebar />
                <SalesChannelsPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default SalesChannels;
