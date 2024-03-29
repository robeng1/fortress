import useModal from "hooks/use-modal"
import React from "react"
import { InventoryViewType } from "typings/inventory/inventory-type"
import { pesosRawMoney } from "utils/money"
import { proxyURL } from "utils/urlsigner"
import VariantEditor from "./editor"

type VariantManagerProps = {
  handleClick: (e: any) => void
  isChecked: boolean
  product: InventoryViewType
}

const VariantManager: React.FC<VariantManagerProps> = ({
  product,
  isChecked,
  handleClick,
}) => {
  const { isOpen, handleOpen, handleClose } = useModal(false)

  const sku =
    product.sku && product.sku !== "" ? product.sku : product.centre_sku
  return (
    <tr>
      <td className="px-2 first:pl-3 last:pr-3 py-3 whitespace-nowrap w-px">
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
      <td className="px-2 first:pl-3 last:pr-3 py-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded"
              src={proxyURL(product.image_url, 50, 50)}
              alt={product.title}
            />
          </div>
          <div
            onClick={handleOpen}
            className="font-medium text-gray-800 hover:underline cursor-pointer"
          >
            {product.title}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-3 last:pr-3 py-2 whitespace-nowrap">
        <div
          className={`inline-flex font-medium rounded-full text-left py-0.5 `}
        >
          {sku}
        </div>
      </td>
      <td className="px-2 first:pl-3 last:pr-3 py-2 whitespace-nowrap">
        <div>{product.num_allocated}</div>
      </td>
      <td className="px-2 first:pl-3 last:pr-3 py-2 whitespace-nowrap">
        <div>{pesosRawMoney(product.price_excl_tax)}</div>
      </td>
      <td className="px-2 first:pl-3 last:pr-3 py-2 whitespace-nowrap">
        <div>{product.num_in_stock}</div>
        <VariantEditor
          product={product}
          isOpen={isOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </td>
    </tr>
  )
}

export default VariantManager
