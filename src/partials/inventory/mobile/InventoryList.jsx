import * as React from 'react';
import { formatPesosMoney } from 'utils/money';
import InventoryCard from './InventoryCard';
export default function InventoryList({ records }) {
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              {records.map(product => (
                <li
                  key={`${product.product_id}-${product.variant_id}-${product.centre_id}`}
                  className="flex pr-3 py-2"
                >
                  <InventoryCard
                    product={{
                      id: `${product.product_id}-${product.variant_id}-${product.centre_id}`,
                      image: product.image_url,
                      name: product.title,
                      inventory: `${product.num_in_stock} in stock`,
                      type: product.sku,
                      // status: 'Draft',
                      variants: product.num_in_stock,
                      fav: false,
                      price: formatPesosMoney(
                        product.price_excl_tax,
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
