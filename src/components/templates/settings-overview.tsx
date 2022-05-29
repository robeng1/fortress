import React, { useState } from "react"
import Sidebar from "partials/sidebar"
import Header from "partials/header"
import PageDescription from "components/blocks/page-description"

const SettingsOverview: React.FC = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
          location="Settings"
        />

        <main className="mb-10 md:mb-0">
          <div className="bg-white p-lg">
            <PageDescription
              title={"Settings"}
              subtitle={"Manage the settings for your business"}
            />
            <div className="grid md:grid-cols-2 auto-cols-fr grid-cols-1 gap-x-base gap-y-sm bg-white">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SettingsOverview
