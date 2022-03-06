import React, { useState } from 'react';
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import PageDescription from 'components/common/page-description';

const ThemeSettingsOverview: React.FC = ({ children }) => {
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
          location="Theme"
        />

        <main className="mb-10 md:mb-0">
          <div className="bg-white p-large">
            <PageDescription
              title={'Theme settings'}
              subtitle={'Manage the content and looks of your business'}
            />
            <div className="grid medium:grid-cols-2 auto-cols-fr grid-cols-1 gap-x-base gap-y-xsmall bg-white">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ThemeSettingsOverview;
