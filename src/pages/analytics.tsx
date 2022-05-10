import React, { useEffect, useState } from 'react';
import Sidebar from 'partials/sidebar';
import Header from 'partials/header';
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
import DashboardCard01 from 'partials/dashboard/DashboardCard01';
import DashboardCard02 from 'partials/dashboard/DashboardCard02';
import DashboardCard03 from 'partials/dashboard/DashboardCard03';
import DashboardCard04 from 'partials/dashboard/DashboardCard04';
import AnalyticsCard08 from 'partials/analytics/AnalyticsCard08';

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
          <div className="grid grid-cols-12 gap-6">
            <DashboardCard01 sales={webStats?.gross_revenue} dataset={[]} />
            <DashboardCard02 sales={webStats?.net_revenue} dataset={[]} />
            <DashboardCard03 sales={webStats?.average_order_value} dataset={[]} />
            <DashboardCard04 volume={webStats?.order_volume} dataset={[]} />
            <AnalyticsCard01
              totalPageViews={webStats?.total_page_views}
              uniqueVisitors={webStats?.unique_visitors}
              visitDuration={webStats?.visit_duration}
              visitorsDataset={webStats?.visitors_dataset}
              bounceRate={webStats?.bounce_rate}
            />
            <AnalyticsCard02
              topPages={webStats?.top_live_pages}
              liveVisitors={webStats?.live_visitors}
            />
            <AnalyticsCard05 topChannels={webStats?.top_channels} />
            <AnalyticsCard06 topPages={webStats?.top_pages} />
            <AnalyticsCard07 topDevices={webStats?.top_devices} />
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default Analytics;
