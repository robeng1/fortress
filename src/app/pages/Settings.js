import React, { useState, useEffect } from 'react';

import Sidebar from 'app/partials/Sidebar';
import Header from 'app/partials/Header';
import SettingsSidebar from 'app/partials/settings/SettingsSidebar';
import SettingsContent from 'app/partials/settings/SettingsContent';
import { useSettingSlice } from 'app/features/settings';
import { useUISlice } from 'app/features/ui';
import { useDispatch } from 'react-redux';

function Settings() {
  const { actions } = useSettingSlice();
  const { actions: uiActions } = useUISlice();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(uiActions.clearError(actions.getShopByMerchantId()));
    dispatch(actions.getShopByMerchantId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {/* Page header */}
            <div className="mb-8">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Account Settings
              </h1>
            </div>

            {/* Content */}
            <div className="bg-white shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                <SettingsSidebar />
                <SettingsContent />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;
