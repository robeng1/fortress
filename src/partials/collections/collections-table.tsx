import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import EmptyState from "partials/empty-state"
import Collection from "./collection-table-item"
import CollectionList from "./mobile/collection-list"
import { CollectionViewType } from "typings/collection/collection-type"

type CollectionsTableProps = {
  selectedItems: (items: string[]) => void
  collections: CollectionViewType[]
}

const CollectionsTable: React.FC<CollectionsTableProps> = ({
  selectedItems,
  collections,
}) => {
  const navigate = useNavigate()
  const [selectAll, setSelectAll] = useState(false)
  const [isCheck, setIsCheck] = useState<any[]>([])

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    setIsCheck(collections.map((li) => li.collection_id))
    if (selectAll) {
      setIsCheck([])
    }
  }

  const handleClick = (e) => {
    const { id, checked } = e.target
    setSelectAll(false)
    setIsCheck([...isCheck, id])
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id))
    }
  }

  useEffect(() => {
    selectedItems(isCheck)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck])

  return (
    <>
      {collections.length > 0 ? (
        <div className="border border-transparent focus:outline-none rounded shadow bg-white appearance-none relative">
          <CollectionList collections={collections} />
          <div className="hidden md:block">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
                  <tr>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
                      <div className="flex items-center">
                        <label className="inline-flex">
                          <span className="sr-only">Select all</span>
                          <input
                            className="form-checkbox"
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                        </label>
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
                      <span className="sr-only">Favourite</span>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Collection</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Tags</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Number of Items
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Channels</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-gray-200">
                  {collections.map((collection) => {
                    return (
                      <Collection
                        key={collection.collection_id}
                        collection={collection}
                        handleClick={handleClick}
                        isChecked={isCheck.includes(collection.collection_id)}
                        selectedItems={selectedItems}
                      />
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          heading="No collections yet"
          msg="Collections are a way to group products."
          action={{
            name: "Create collection",
            func: () => navigate("/shop/collections/new"),
          }}
        />
      )}
    </>
  )
}

export default CollectionsTable
