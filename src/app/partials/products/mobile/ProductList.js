import * as React from 'react';
import ProductCard from './ProductCard';

import Image01 from '../../../images/user-40-01.jpg';
import Image02 from '../../../images/user-40-02.jpg';
import Image03 from '../../../images/user-40-03.jpg';
import Image04 from '../../../images/user-40-04.jpg';
import Image05 from '../../../images/user-40-05.jpg';
import Image06 from '../../../images/user-40-06.jpg';
import Image07 from '../../../images/user-40-07.jpg';
import Image08 from '../../../images/user-40-08.jpg';
import Image09 from '../../../images/user-40-09.jpg';
import Image10 from '../../../images/user-40-10.jpg';

export default function ProductList() {
  const products = [
    {
      id: '1',
      image: Image01,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      status: 'Active',
      variants: '24',
      price: '$32.00',
    },
    {
      id: '2',
      image: Image02,
      name: 'Bike short',
      inventory: 'Not tracked',
      type: 'Beauty & Fashion',
      status: 'Active',
      variants: '24',
      price: '$32.00',
    },
    {
      id: '3',
      image: Image03,
      name: 'Bike short',
      inventory: '0 in stock',
      type: 'Beauty & Fashion',
      status: 'Active',
      variants: '24',
      price: '$32.00',
    },
    {
      id: '4',
      image: Image04,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      status: 'Active',
      variants: '24',
      price: '$32.00',
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
      price: '$32.00',
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
      price: '$32.00',
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
      price: '$32.00',
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
      price: '$32.00',
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
      price: '$32.00',
    },
    {
      id: '0',
      image: Image10,
      name: 'Bike short',
      inventory: '10 in stock',
      type: 'Beauty & Fashion',
      status: 'Draft',
      variants: '24',
      fav: false,
      price: '$32.00',
    },
  ];
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              {products.map(product => (
                <li key={product.id} className="flex pr-3 py-2">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
