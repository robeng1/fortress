import React, { useState } from "react"
import Sidebar from "partials/sidebar"
import Header from "partials/header"
import PageDescription from "components/blocks/page-description"
import { useNavigate } from "react-router-dom"

const ThemeSettingsOverview: React.FC = ({ children }) => {
  const navigate = useNavigate()
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
          location="Theme"
        />

        <main className="mb-10 md:mb-0">
          <div className="bg-white p-lg">
            <PageDescription
              title={"Theme settings"}
              subtitle={"Manage the content and looks of your business"}
            />

            <div className="grid md:grid-cols-2 auto-cols-fr grid-cols-1 gap-x-base gap-y-xs bg-white">
              {children}
            </div>
            <button
              onClick={() => navigate("/settings")}
              className="btn my-2 border-teal-600 hover:border-gray-700 text-gray-600 bg-white"
            >
              Cancel
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ThemeSettingsOverview
