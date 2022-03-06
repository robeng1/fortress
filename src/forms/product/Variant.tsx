import React, { useState, useEffect } from 'react';
// import { focusHandling } from 'cruip-js-toolkit';
import ProductVariant from './VariantItem';
import { ProductType } from 'models/product/product-type';

const ProdutVariantPreview = ({
  selectedItems,
  productVariants,
  updatePrice,
  updateQuantity,
  currency,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(productVariants.map((li: ProductType) => li.title));
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
            <th className="w-2/5 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">Variant</div>
            </th>
            <th className="w-1/5 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">Quantity</div>
            </th>
            <th className="w-1/5 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              <div className="font-semibold text-left">Price({currency})</div>
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="text-sm border-gray-200 divide-y divide-gray-200">
          {productVariants.map((product: ProductType, index: number) => {
            return (
              <ProductVariant
                key={product.title}
                index={index}
                id={product.title}
                updatePrice={updatePrice}
                updateQuantity={updateQuantity}
                image={product.image}
                name={product.title}
                price={
                  product.stock_records
                    ? product.stock_records[0]?.price_excl_tax ?? null
                    : null
                }
                quantity={
                  product.stock_records
                    ? product.stock_records[0]?.num_in_stock ?? 1
                    : 1
                }
                handleClick={handleClick}
                isChecked={isCheck.includes(product.title!)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProdutVariantPreview;
