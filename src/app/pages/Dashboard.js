import React, { useState } from 'react';

import Sidebar from 'app/partials/Sidebar';
import Header from 'app/partials/Header';
import WelcomeBanner from 'app/partials/dashboard/WelcomeBanner';
import DashboardAvatars from 'app/partials/dashboard/DashboardAvatars';
import FilterButton from 'app/components/DropdownFilter';
import Datepicker from 'app/components/Datepicker';
import DashboardCard01 from 'app/partials/dashboard/DashboardCard01';
import DashboardCard02 from 'app/partials/dashboard/DashboardCard02';
import DashboardCard03 from 'app/partials/dashboard/DashboardCard03';
import DashboardCard04 from 'app/partials/dashboard/DashboardCard04';
import DashboardCard05 from 'app/partials/dashboard/DashboardCard05';
import DashboardCard06 from 'app/partials/dashboard/DashboardCard06';
import DashboardCard07 from 'app/partials/dashboard/DashboardCard07';
import DashboardCard08 from 'app/partials/dashboard/DashboardCard08';
import DashboardCard09 from 'app/partials/dashboard/DashboardCard09';
import DashboardCard10 from 'app/partials/dashboard/DashboardCard10';
import DashboardCard11 from 'app/partials/dashboard/DashboardCard11';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" />
                {/* Add view button */}
                <button className="btn bg-purple-500 hover:bg-purple-600 text-white">
                  <svg
                    className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add view</span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 />
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
              <DashboardCard08 />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <DashboardCard09 />
              {/* Card (Recent Activity) */}
              <DashboardCard10 />
              {/* Card (Income/Expenses) */}
              <DashboardCard11 />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
