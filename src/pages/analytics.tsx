import React, { useEffect, useState } from 'react';
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import Datepicker from 'components/date-picker';
import BottomNav from 'components/bottom-navigation';
import AnalyticsCard01 from 'partials/analytics/AnalyticsCard01';
import AnalyticsCard02 from 'partials/analytics/AnalyticsCard02';
import AnalyticsCard05 from 'partials/analytics/AnalyticsCard05';
import AnalyticsCard06 from 'partials/analytics/AnalyticsCard06';
import AnalyticsCard07 from 'partials/analytics/AnalyticsCard07';
import AnalyticsCard00 from 'partials/analytics/AnalyticsCard00';
import { useStats } from 'hooks/use-webstats';
import { useOnboarding } from 'hooks/use-onboarding';
import { useSession } from 'hooks/use-session';

function Analytics() {
  useOnboarding();
  const { requiresEmailVerification } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { webStats } = useStats();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          location={'Analytics'}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto mb-10">
          {/* Page header */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h4 className="text-xl md:text-xl text-gray-500 font-bold">
                Overview
              </h4>
            </div>

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-end sm:justify-end gap-2">
              {/* Datepicker built with flatpickr */}
              <Datepicker align="right" />
            </div>
          </div>
          <div className="justify-between items-center mb-8">
            <AnalyticsCard00
              totalSales={undefined}
              totalCustomers={undefined}
              totalNewCustomers={undefined}
              grossRevenue={undefined}
              netRevenue={undefined}
            />
          </div>
          {/* Cards */}
          <div className="grid grid-cols-12 gap-6">
            {/* Line chart (Analytics) */}
            <AnalyticsCard01
              totalPageViews={webStats?.total_page_views}
              uniqueVisitors={webStats?.unique_visitors}
              visitDuration={webStats?.visit_duration}
              visitorsDataset={webStats?.visitors_dataset}
              bounceRate={webStats?.bounce_rate}
            />
            {/*  Line chart (Active Users Right Now) */}
            <AnalyticsCard02
              topPages={webStats?.top_live_pages}
              liveVisitors={webStats?.live_visitors}
            />

            <AnalyticsCard05 topChannels={webStats?.top_channels} />

            <AnalyticsCard06 topPages={webStats?.top_pages} />

            <AnalyticsCard07 topCities={webStats?.top_cities} />
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default Analytics;
