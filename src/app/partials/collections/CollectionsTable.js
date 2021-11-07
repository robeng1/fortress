import React, { useState, useEffect } from 'react';
import { focusHandling } from 'cruip-js-toolkit';
import { useSelector } from 'react-redux';
import EmptyState from 'app/partials/EmptyState';
import Collection from './CollectionTableItem';
import { selectCollectionViews } from 'app/features/collection/selectors';
import CollectionList from './mobile/CollectionList';

function CollectionsTable({ selectedItems, handleShow }) {
  const collections = useSelector(selectCollectionViews);
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    focusHandling('outline');
  }, [collections]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(collections.map(li => li.collection_id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <>
      {collections.length > 0 ? (
        <div className="border border-transparent focus:outline-none rounded shadow bg-white appearance-none relative">
          <CollectionList handleShow={handleShow} />
          <div className="hidden md:block">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
                  <tr>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
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
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                      <span className="sr-only">Favourite</span>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Collection</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Tags</div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        Number of Items
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                      <div className="font-semibold text-left">Channels</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-gray-200">
                  {collections.map(collection => {
                    return (
                      <Collection
                        key={collection.collection_id}
                        id={collection.collection_id}
                        image={collection.image}
                        name={collection.title}
                        conditions="Manual"
                        itemCount={collection.all_products_count}
                        channels={collection.sales_channels}
                        fav={false}
                        handleClick={handleClick}
                        handleShow={handleShow}
                        isChecked={isCheck.includes(collection.collection_id)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          heading="No collections yet"
          msg="Create some collections to get started"
          action={{
            name: 'Create collection',
            func: () => handleShow(true, ''),
          }}
        />
      )}
    </>
  );
}

export default CollectionsTable;
