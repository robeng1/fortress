import React, { useState, useEffect } from 'react';
import { focusHandling } from 'cruip-js-toolkit';
import Product from './ProductTableItem';

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
import ProductList from './mobile/ProductList';

function ProductsTable({ selectedItems }) {
  const products = [
    {
      id: '1',
      image: Image01,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      status: 'Active',
      variants: '24',
    },
    {
      id: '2',
      image: Image02,
      name: 'Bike short',
      inventory: 'Not tracked',
      type: 'Beauty & Fashion',
      status: 'Active',
      variants: '24',
    },
    {
      id: '3',
      image: Image03,
      name: 'Bike short',
      inventory: '0 in stock',
      type: 'Beauty & Fashion',
      status: 'Active',
      variants: '24',
    },
    {
      id: '4',
      image: Image04,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      status: 'Active',
      variants: '24',
    },
    {
      id: '5',
      image: Image05,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      variants: '24',
      status: 'Active',
      fav: true,
    },
    {
      id: '6',
      image: Image06,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      variants: '24',
      status: 'Active',
      fav: true,
    },
    {
      id: '7',
      image: Image07,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      variants: '24',
      status: 'Active',
      fav: true,
    },
    {
      id: '8',
      image: Image08,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      variants: '24',
      status: 'Active',
      fav: false,
    },
    {
      id: '9',
      image: Image09,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      status: 'Active',
      variants: '24',
      fav: true,
    },
    {
      id: '10',
      image: Image10,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      status: 'Draft',
      variants: '24',
      fav: false,
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
      <ProductList />
      <div className="hidden md:block">
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
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Product</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Inventory</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Type</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Variants</div>
                </th>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-200">
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
      </div>
    </div>
  );
}

export default ProductsTable;
