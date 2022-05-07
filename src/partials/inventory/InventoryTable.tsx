import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import InventoryTableItem from './InventoryTableItem';
import InventoryList from './mobile/InventoryList';
import EmptyState from 'partials/EmptyState';
import { pesosRawMoney } from 'utils/money';
import { InventoryViewListType, InventoryViewType } from 'typings/inventory/inventory-type';

type InventoryTableProps = {
  selectedItems: (items: string[]) => void
} & InventoryViewListType

const InventoryTable: React.FC<InventoryTableProps> = ({ records, total, selectedItems }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(
      records?.map(li => `${li.product_id}-${li.variant_id}-${li.centre_id}`) ?? [],
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
      {records && records.length > 0 ? (
        <div className="border border-transparent focus:outline-none rounded-md shadow-lg bg-white appearance-none relative">
          <InventoryList records={records} />
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
                      <div className="font-semibold">
                        Price{' '}
                        {!isEmpty(records) && `(in ${records[0].currency})`}
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 last:pr-5 py-3 text-left whitespace-nowrap">
                      <div className="font-semibold">Available</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm border-gray-200 divide-y divide-gray-200">
                  {records.map((product, index) => {
                    return (
                      <InventoryTableItem
                        key={`${index}`}
                        product={product}
                        handleClick={handleClick}
                        isChecked={isCheck.includes(
                          `${product.variant_id}`,
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
          action={undefined}
        />
      )}
    </>
  );
};

export default InventoryTable;
