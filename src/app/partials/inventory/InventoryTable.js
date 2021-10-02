import React, { useState, useEffect } from 'react';
import { focusHandling } from 'cruip-js-toolkit';
import InventoryTableItem from './InventoryTableItem';
import InventoryList from './mobile/InventoryList';

import Image01 from '../../images/user-40-01.jpg';
import Image02 from '../../images/user-40-02.jpg';
import Image03 from '../../images/user-40-03.jpg';
import Image04 from '../../images/user-40-04.jpg';

const InventoryTable = ({ selectedItems, headings }) => {
  const products = [
    {
      id: '0',
      image: Image01,
      name: 'Bike short',
      inventory: 'Blue',
      type: 'Small',
      status: 'Active',
      variants: '24',
    },
    {
      id: '0',
      image: Image02,
      name: 'Bike short',
      inventory: 'Green',
      type: 'Medium',
      status: 'Active',
      variants: '24',
    },
    {
      id: '0',
      image: Image03,
      name: 'Bike short',
      inventory: 'White',
      type: 'Large',
      status: 'Active',
      variants: '24',
    },
    {
      id: '0',
      image: Image04,
      name: 'Bike short',
      inventory: 'Blue',
      type: 'Extra Large',
      status: 'Active',
      variants: '24',
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
      <InventoryList />
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border border-gray-200">
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
                <th className="px-2 first:pl-5 last:pr-5 py-3 text-left whitespace-nowrap">
                  <div className="font-semibold">Product</div>
                </th>
                <th className="px-2 first:pl-5 text-left last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">SKU</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 text-left whitespace-nowrap">
                  <div className="font-semibold">Price</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 text-left whitespace-nowrap">
                  <div className="font-semibold">Available</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm border-gray-200 divide-y divide-gray-200">
              {list.map(product => {
                return (
                  <InventoryTableItem
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    inventory={product.inventory}
                    type={product.type}
                    status={product.status}
                    variants={product.variants}
                    fav={product.fav || false}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(product.id)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
