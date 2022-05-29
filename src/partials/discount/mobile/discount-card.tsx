import React from "react"
import { DiscountViewType } from "typings/discount/discount-type"

type DiscountCardProps = {
  discount: DiscountViewType
  handleShow: () => void
}

const DiscountCard: React.FC<DiscountCardProps> = ({
  discount,
  handleShow,
}) => {
  return (
    <div className="flex flex-1 cursor-pointer" onClick={handleShow}>
      <div className="flex-shrink-0 w-[48px] h-[48px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden">
        {discount.image_url && (
          <img
            className="w-full h-full object-center object-cover"
            src={discount.image_url}
            alt={discount.name}
          />
        )}
      </div>

      <div className="ml-2 flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <div>{discount.name}</div>
            </h3>
          </div>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded-full text-center py-0.5`}
          >
            Used {discount.num_applications} times
          </p>
          <p className="ml-4 text-sm text-gray-500">{discount.status}</p>
        </div>
      </div>
    </div>
  )
}
export default DiscountCard
