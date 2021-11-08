import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectProductViews } from 'app/features/product/selectors';
import ProductCard from './ProductCard';
import money from 'app/utils/money';

export default function ProductList({ handleShow }) {
  const products = useSelector(selectProductViews);
  // const products = [
  //   {
  //     id: '1',
  //     image: Image01,
  //     name: 'Bike short',
  //     inventory: '10 in stock',
  //     type: 'Beauty & Fashion',
  //     status: 'Active',
  //     variants: '24',
  //     price: '$32.00',
  //   },
  //   {
  //     id: '2',
  //     image: Image02,
  //     name: 'Bike short',
  //     inventory: 'Not tracked',
  //     type: 'Beauty & Fashion',
  //     status: 'Active',
  //     variants: '24',
  //     price: '$32.00',
  //   },
  //   {
  //     id: '3',
  //     image: Image03,
  //     name: 'Bike short',
  //     inventory: '0 in stock',
  //     type: 'Beauty & Fashion',
  //     status: 'Active',
  //     variants: '24',
  //     price: '$32.00',
  //   },
  //   {
  //     id: '4',
  //     image: Image04,
  //     name: 'Bike short',
  //     inventory: '10 in stock',
  //     type: 'Beauty & Fashion',
  //     status: 'Active',
  //     variants: '24',
  //     price: '$32.00',
  //   },
  //   {
  //     id: '5',
  //     image: Image05,
  //     name: 'Bike short',
  //     inventory: '10 in stock',
  //     type: 'Beauty & Fashion',
  //     variants: '24',
  //     status: 'Active',
  //     fav: true,
  //     price: '$32.00',
  //   },
  //   {
  //     id: '6',
  //     image: Image06,
  //     name: 'Bike short',
  //     inventory: '10 in stock',
  //     type: 'Beauty & Fashion',
  //     variants: '24',
  //     status: 'Active',
  //     fav: true,
  //     price: '$32.00',
  //   },
  //   {
  //     id: '7',
  //     image: Image07,
  //     name: 'Bike short',
  //     inventory: '10 in stock',
  //     type: 'Beauty & Fashion',
  //     variants: '24',
  //     status: 'Active',
  //     fav: true,
  //     price: '$32.00',
  //   },
  //   {
  //     id: '8',
  //     image: Image08,
  //     name: 'Bike short',
  //     inventory: '10 in stock',
  //     type: 'Beauty & Fashion',
  //     variants: '24',
  //     status: 'Active',
  //     fav: false,
  //     price: '$32.00',
  //   },
  //   {
  //     id: '9',
  //     image: Image09,
  //     name: 'Bike short',
  //     inventory: '10 in stock',
  //     type: 'Beauty & Fashion',
  //     status: 'Active',
  //     variants: '24',
  //     fav: true,
  //     price: '$32.00',
  //   },
  // {
  //   id: '0',
  //   image: Image10,
  //   name: 'Bike short',
  //   inventory: '10 in stock',
  //   type: 'Beauty & Fashion',
  //   status: 'Draft',
  //   variants: '24',
  //   fav: false,
  //   price: '$32.00',
  // },
  // ];
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              {products.map(product => (
                <li key={product.product_id} className="flex pr-3 py-2">
                  <ProductCard
                    handleShow={() => handleShow(true, product.product_id)}
                    product={{
                      id: product.product_id,
                      image: product.image_url,
                      name: product.title,
                      inventory: `${product.num_in_stock} in stock`,
                      type: product.product_type,
                      status: product.product_status,
                      variants: product.num_variants,
                      fav: false,
                      price: money.intToString(
                        product.price_int,
                        product.currency,
                      ),
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
