import React, { useState } from 'react';

import Sidebar from 'app/partials/Sidebar';
import Header from 'app/partials/Header';
import Datepicker from 'app/components/Datepicker';
import BottomNav from 'app/components/BottomNav';
import AnalyticsCard01 from 'app/partials/analytics/AnalyticsCard01';
import AnalyticsCard02 from 'app/partials/analytics/AnalyticsCard02';
import AnalyticsCard03 from 'app/partials/analytics/AnalyticsCard03';
import AnalyticsCard04 from 'app/partials/analytics/AnalyticsCard04';
import AnalyticsCard05 from 'app/partials/analytics/AnalyticsCard05';
import AnalyticsCard06 from 'app/partials/analytics/AnalyticsCard06';
import AnalyticsCard07 from 'app/partials/analytics/AnalyticsCard07';
// import AnalyticsCard08 from 'app/partials/analytics/AnalyticsCard08';
// import AnalyticsCard09 from 'app/partials/analytics/AnalyticsCard09';
// import AnalyticsCard10 from 'app/partials/analytics/AnalyticsCard10';

function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto mb-10">
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Title */}
            {/* <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Analytics
              </h1>
            </div> */}

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-end sm:justify-end gap-2">
              {/* Datepicker built with flatpickr */}
              <Datepicker align="right" />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            {/* Line chart (Analytics) */}
            <AnalyticsCard01 />
            {/*  Line chart (Active Users Right Now) */}
            <AnalyticsCard02 />
            {/* Stacked bar chart (Acquisition Channels) */}
            <AnalyticsCard03 />
            {/* Horizontal bar chart (Audience Overview) */}
            <AnalyticsCard04 />
            {/* Report card (Top Channels) */}
            <AnalyticsCard05 />
            {/* Report card (Top Pages) */}
            <AnalyticsCard06 />
            {/* Report card (Top Countries) */}
            <AnalyticsCard07 />
            {/* Doughnut chart (Sessions By Device) */}
            {/* <AnalyticsCard08 /> */}
            {/* Doughnut chart (Visit By Age Category) */}
            {/* <AnalyticsCard09 /> */}
            {/* Polar chart (Sessions By Gender) */}
            {/* <AnalyticsCard10 /> */}
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default Analytics;
