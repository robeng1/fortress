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
import { useStats } from 'hooks/use-shopstats';
import { useOnboarding } from 'hooks/use-onboarding';
import { useSession } from 'hooks/use-session';
import DashboardCard01 from 'partials/dashboard/DashboardCard01';
import DashboardCard02 from 'partials/dashboard/DashboardCard02';
import DashboardCard03 from 'partials/dashboard/DashboardCard03';
import DashboardCard04 from 'partials/dashboard/DashboardCard04';
import { toast } from 'react-toastify';
import useDomains from 'hooks/use-domains';
import { isEmptyArray } from 'formik';
import useHasProducts from 'hooks/use-has-products';
import CTAs from 'partials/cta';
import useHasRates from 'hooks/use-has-rates';

function Analytics() {
  useOnboarding();
  const { isEmailVerified } = useSession();
  const { hasProduct } = useHasProducts();
  const { hasRates } = useHasRates();
  const { entries } = useDomains();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { stats, statsIsLoading } = useStats();

  useEffect(() => {
    if (statsIsLoading) {
      toast.loading("Fetching data")
    } else {
      toast.dismiss("Fetching data")
    }
  }, [statsIsLoading])

  return (
    <div className="flex h-screen w-screen overflow-hidden">
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
              <h4 className="text-xl md:text-xl text-gray-500 font-medium">
                {entries && !isEmptyArray(entries) && entries?.length > 0 && <>
                  <p className='text-sm md:text-xl cursor-pointer text-gray-800'>Here's your website link: {" "}
                    <span className='underline text-purple-500'>
                      <a href={`https://${entries[0].domain}`} target="_blank">Link</a>
                    </span></p>
                </>}
              </h4>
            </div>

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-end sm:justify-end gap-2">
              {/* Datepicker built with flatpickr */}
              <Datepicker align="right" />
            </div>
          </div>
          <div>
            <CTAs noProducts={!hasProduct} noRates={!hasRates} noTheme={false} />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <DashboardCard01 sales={stats?.gross_revenue} dataset={[]} />
            <DashboardCard02 sales={stats?.net_revenue} dataset={[]} />
            <DashboardCard03 sales={stats?.average_order_value} dataset={[]} />
            <DashboardCard04 volume={stats?.order_volume} dataset={[]} />
            <AnalyticsCard01
              totalPageViews={stats?.total_page_views}
              uniqueVisitors={stats?.unique_visitors}
              visitDuration={stats?.visit_duration}
              visitorsDataset={stats?.visitors_dataset}
              bounceRate={stats?.bounce_rate}
            />
            <AnalyticsCard02
              topPages={stats?.top_live_pages}
              liveVisitors={stats?.live_visitors}
            />
            <AnalyticsCard05 topChannels={stats?.top_channels} />
            <AnalyticsCard06 topPages={stats?.top_pages} />
            <AnalyticsCard07 topDevices={stats?.top_devices} />
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default Analytics;
