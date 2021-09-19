import React, { useState, useEffect } from 'react';
import { focusHandling } from 'cruip-js-toolkit';
import Product from './VariantItem';

import Image01 from '../../images/user-40-01.jpg';
import Image02 from '../../images/user-40-02.jpg';
import Image03 from '../../images/user-40-03.jpg';
import Image04 from '../../images/user-40-04.jpg';

const VariantPreviewTable = ({ selectedItems, headings }) => {
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

            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"></th>
            {headings.map(h => (
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">{h}</div>
              </th>
            ))}
            {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">Color</div>
            </th>
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">Size</div>
            </th>
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">Material</div>
            </th> */}
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold">Price</div>
            </th>
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold">Quantity</div>
            </th>
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold">SKU</div>
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="text-sm border-gray-200 divide-y divide-gray-200">
          {list.map(product => {
            return (
              <Product
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
  );
};

export default VariantPreviewTable;
