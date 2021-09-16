import React, { useState, useEffect } from 'react';
import { focusHandling } from 'cruip-js-toolkit';
import Collection from './CollectionTableItem';

import Image01 from '../../images/user-40-01.jpg';
import Image02 from '../../images/user-40-02.jpg';
import Image03 from '../../images/user-40-03.jpg';
import Image04 from '../../images/user-40-04.jpg';
import Image05 from '../../images/user-40-05.jpg';
import Image06 from '../../images/user-40-06.jpg';
import Image07 from '../../images/user-40-07.jpg';
import Image08 from '../../images/user-40-08.jpg';
import Image09 from '../../images/user-40-09.jpg';
import Image10 from '../../images/user-40-10.jpg';

function CollectionsTable({ selectedItems }) {
  const products = [
    {
      id: '0',
      image: Image01,
      name: 'Bike short',
      conditions: 'Men, Fashion',
      itemCount: '20',
      channels: 'Reo, Facebook, Store',
    },
    {
      id: '0',
      image: Image02,
      name: 'Bike short',
      conditions: 'Men, Fashion',
      itemCount: '20',
      channels: 'Reo, Facebook, Store',
    },
    {
      id: '0',
      image: Image03,
      name: 'Bike short',
      conditions: 'Men, Fashion',
      itemCount: '20',
      channels: 'Reo, Facebook, Store',
    },
    {
      id: '0',
      image: Image04,
      name: 'Bike short',
      conditions: 'Men, Fashion',
      itemCount: '20',
      channels: 'Reo, Facebook, Store',
    },
    {
      id: '0',
      image: Image05,
      name: 'Bike short',
      conditions: 'Men, Fashion',
      itemCount: '20',
      channels: 'Reo, Facebook, Store',
    },
    {
      id: '0',
      image: Image06,
      name: 'Bike short',
      inventory: '10 in stock',
      conditions: 'Men, Fashion',
      itemCount: '20',
      channels: 'Reo, Facebook, Store',
    },
    {
      id: '0',
      image: Image07,
      name: 'Bike short',
      conditions: 'Men, Fashion',
      itemCount: '20',
      channels: 'Reo, Facebook, Store',
    },
    {
      id: '0',
      image: Image08,
      name: 'Bike short',
      conditions: 'Men, Fashion',
      itemCount: '20',
      channels: 'Reo, Facebook, Store',
    },
    {
      id: '0',
      image: Image09,
      name: 'Bike short',
      conditions: 'Men, Fashion',
      itemCount: '20',
      channels: 'Reo, Facebook, Store',
    },
    {
      id: '0',
      image: Image10,
      name: 'Bike short',
      conditions: 'Men, Fashion',
      itemCount: '20',
      channels: 'Reo, Facebook, Store',
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    focusHandling('outline');
  }, [list]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
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
    <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800">
          All Collections <span className="text-gray-400 font-medium">248</span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
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
                  <div className="font-semibold text-left">Number of Items</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Channels</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-200">
              {list.map(collection => {
                return (
                  <Collection
                    key={collection.id}
                    id={collection.id}
                    image={collection.image}
                    name={collection.name}
                    conditions={collection.conditions}
                    itemCount={collection.itemCount}
                    channels={collection.channels}
                    fav={collection.fav || false}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(collection.id)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CollectionsTable;