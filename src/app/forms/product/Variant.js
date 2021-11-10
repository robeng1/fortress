import React, { useState, useEffect } from 'react';
import { focusHandling } from 'cruip-js-toolkit';
import VariantItem from './VariantItem';

const VariantPreviewTable = ({ selectedItems, names }) => {
  const products = [
    {
      id: '0',
      image: '',
      name: names[0],
      inventory: 'Blue',
      type: 'Small',
      status: 'Active',
      price: '43.0',
      quantity: '24',
    },
    {
      id: '1',
      image: '',
      name: names[1],
      inventory: 'Green',
      type: 'Medium',
      status: 'Active',
      price: '43.0',
      quantity: '24',
    },
    {
      id: '2',
      image: '',
      name: 'Bike short',
      inventory: 'White',
      type: 'Large',
      status: 'Active',
      price: '43.0',
      quantity: '24',
    },
    {
      id: '3',
      image: '',
      name: 'Bike short',
      inventory: 'Blue',
      type: 'Extra Large',
      status: 'Active',
      price: '43.0',
      quantity: '24',
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
      <table className="table-fixed border border-gray-200">
        {/* Table header */}
        <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
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
            <th className="w-1/2 py-3 whitespace-nowrap">
              <div className="font-semibold text-left"></div>
            </th>
            <th className="w-1/4 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">Quantity</div>
            </th>
            <th className="w-1/4 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">Price</div>
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="text-sm border-gray-200 divide-y divide-gray-200">
          {list.map(product => {
            return (
              <VariantItem
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                inventory={product.inventory}
                type={product.type}
                price={product.price}
                quantity={product.quantity}
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
