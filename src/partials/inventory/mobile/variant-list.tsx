import * as React from "react"
import { InventoryViewType } from "typings/inventory/inventory-type"
import MobileVarianManager from "./mobile-variant-manager"

type VariantListProps = {
  records: InventoryViewType[]
}
const VarianList: React.FC<VariantListProps> = ({ records }) => {
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              {records.map((product, index) => (
                <li key={`${index}`} className="flex pr-3 py-2">
                  <MobileVarianManager product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default VarianList
