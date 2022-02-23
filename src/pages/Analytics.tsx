import React, { useState } from 'react';
import { useQuery } from 'react-query';

import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import Datepicker from 'components/Datepicker';
import BottomNav from 'components/BottomNav';
import AnalyticsCard01 from 'partials/analytics/AnalyticsCard01';
import AnalyticsCard02 from 'partials/analytics/AnalyticsCard02';
import AnalyticsCard05 from 'partials/analytics/AnalyticsCard05';
import AnalyticsCard06 from 'partials/analytics/AnalyticsCard06';
import AnalyticsCard07 from 'partials/analytics/AnalyticsCard07';
import { fortressURL } from 'endpoints/urls';
import { request } from 'utils/request';
import { WebAnalyticResponseBody } from 'models/stats/stats-type';
import AnalyticsCard00 from 'partials/analytics/AnalyticsCard00';
import useShop from 'hooks/use-shop';

function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { shop } = useShop();
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/stats`;

  const { data: webStats } = useQuery<WebAnalyticResponseBody>(
    ['web-analytics'],
    async () => await request(`${requestURL}`),
    { enabled: !!shop?.shop_id },
  );

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
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Overview
              </h1>
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
