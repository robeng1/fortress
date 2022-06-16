import React, { ChangeEvent, lazy, useState } from "react"
import isEmpty from "lodash/isEmpty"
import Pagination from "@mui/material/Pagination"

import Sidebar from "partials/sidebar"
import Header from "partials/header"
import DeleteButton from "partials/actions/DeleteButton"
import SearchForm from "partials/actions/search-box"
import BottomNav from "components/bottom-navigation"

import CollectionsTable from "partials/collections/collections-table"
import useShop from "hooks/use-shop"
import { useNavigate } from "react-router-dom"
import { ThemeProvider } from "styles/material/theme"
import ThreeDots from "components/ui/loaders/three-dots"
import useCollectionViews from "hooks/use-collection-views"

function Collections() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<any>([])
  const [currentCollectionId, setCurrentCollectionId] = useState<
    string | undefined
  >()
  const { shop } = useShop()

  const [page, setPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState<number>(15)

  const [term, setTerm] = useState<string>("")

  const { collectionData, isLoading } = useCollectionViews(page, limit, term)

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems])
  }

  const handleShow = (display: Boolean, collectionId: string) => {
    setCurrentCollectionId(collectionId)
  }
  const collections = collectionData?.collections || []

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
          location="Categories"
        />

        <main className="mb-10 md:mb-0">
          <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="py-2 md:py-8 w-full max-w-9xl mx-auto">
              <div className="sm:flex sm:justify-between sm:items-center">
                <div className="flex justify-between gap-2 w-full">
                  {/* Search form */}
                  <div className="flex justify-start gap-2">
                    <SearchForm
                      placeholder="Search categories..."
                      value={term}
                      onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setTerm(e.currentTarget.value)
                      }}
                    />
                    <div className="">
                      <DeleteButton selectedItems={selectedItems} />
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/collections/new")}
                    className="btn bg-purple-600 hover:bg-purple-600 text-white"
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">
                      Create Category
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {isLoading && (
              <div className="sm:flex sm:items-center justify-center">
                <ThreeDots />
              </div>
            )}
            {!isLoading && (
              <>
                <CollectionsTable
                  selectedItems={handleSelectedItems}
                  collections={collections || []}
                />

                {/* Pagination */}
                {!isEmpty(collections) && (collectionData?.total ?? 0) > limit && (
                  <ThemeProvider>
                    <Pagination
                      count={
                        (collectionData?.total ?? 0) > limit
                          ? Math.ceil((collectionData?.total ?? 0) / limit)
                          : 1
                      }
                      variant="outlined"
                      color="primary"
                      className="mt-4 md:mt-8"
                      page={page}
                      onChange={(event: ChangeEvent<unknown>, page: number) =>
                        setPage(page)
                      }
                    />
                  </ThemeProvider>
                )}
              </>
            )}
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  )
}

export default Collections
