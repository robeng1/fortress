import * as React from 'react';
import ProductCard from './ProductCard';
import money from 'app/utils/money';

export default function ProductList({ handleShow, products }) {
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
