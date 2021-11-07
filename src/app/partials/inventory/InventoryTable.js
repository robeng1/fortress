import React, { useState, useEffect } from 'react';
import { focusHandling } from 'cruip-js-toolkit';
import InventoryTableItem from './InventoryTableItem';
import InventoryList from './mobile/InventoryList';
import EmptyState from 'app/partials/EmptyState';
import { selectRecordViews } from 'app/features/inventory/selectors';
import { useSelector } from 'react-redux';
import money from 'app/utils/money';

const InventoryTable = ({ selectedItems, headings }) => {
  const records = useSelector(selectRecordViews);

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  useEffect(() => {
    focusHandling('outline');
  }, [records]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(
      records.map(li => `${li.product_id}-${li.variant_id}-${li.centre_id}`),
    );
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
    <>
      {records.length > 0 ? (
        <div className="border border-transparent focus:outline-none rounded shadow bg-white appearance-none relative">
          <InventoryList />
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
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
                  {records.map(product => {
                    return (
                      <InventoryTableItem
                        key={`${product.product_id}-${product.variant_id}-${product.centre_id}`}
                        id={`${product.product_id}-${product.variant_id}-${product.centre_id}`}
                        image={product.image_url}
                        name={product.title}
                        inventory={product.sku}
                        type={product.item_condition}
                        status={money.intToString(
                          product.price_excl_tax_int,
                          product.currency,
                        )}
                        variants={product.num_in_stock}
                        fav={false}
                        handleClick={handleClick}
                        isChecked={isCheck.includes(
                          `${product.product_id}-${product.variant_id}-${product.centre_id}`,
                        )}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          heading="No inventory yet"
          msg="Inventory will appear here when you add products"
        />
      )}
    </>
  );
};

export default InventoryTable;
