import Button from 'components/blocks/button';
import React, { useState } from 'react';
import { InventoryViewType } from 'typings/inventory/inventory-type';
import { pesosRawMoney } from 'utils/money';
import { proxyURL } from 'utils/urlsigner';

type VariantManagerProps = {
  handleClick: (e: any) => void
  isChecked: boolean,
  product: InventoryViewType
}

const VariantManager: React.FC<VariantManagerProps> = ({ product, isChecked, handleClick }) => {
  const [showSaveButton, setShowSaveButton] = useState<boolean>(true)
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={product.variant_id}
              className="form-checkbox"
              type="checkbox"
              onChange={handleClick}
              checked={isChecked}
            />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10  flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded"
              src={proxyURL(product.image_url, 50, 50)}
              alt={product.title}
            />
          </div>
          <div className="font-medium text-gray-800 hover:underline cursor-pointer">{product.title}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div
          className={`inline-flex font-medium rounded-full text-left py-0.5 `}
        >
          {product.sku && product.sku !== "" ? product.sku : product.centre_sku}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="number"
          step={1}
          min={0}
          onChange={() => { }}
          className="form-input w-full sm:w-28 rounded-sm"
          value={product.num_allocated}
        ></input>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          onChange={() => { }}
          className="form-input w-full sm:w-28 rounded-sm"
          value={pesosRawMoney(product.price_excl_tax)}
        ></input>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="number"
          step={1}
          min={0}
          onChange={() => { }}
          className="form-input w-full sm:w-28 rounded-sm"
          value={product.num_in_stock}
        ></input>
      </td>
      <td className={`px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ${showSaveButton ? "" : "hidden"}`}>
        <Button variant='outline' size='small'>Save</Button>
      </td>
    </tr>
  );
}

export default VariantManager;
