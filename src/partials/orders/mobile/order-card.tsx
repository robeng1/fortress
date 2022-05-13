import { formatPesosMoney } from 'utils/money';
import * as React from 'react';
import { OrderViewType } from 'typings/order/order-type';

type OrderTableItemProps = {
  order: OrderViewType
  handleClick?: (e: any) => void
  isChecked?: boolean
  handleShow: (show: boolean, id?: string) => void
}

const OrderCard: React.FC<OrderTableItemProps> = ({ handleShow, order }) => {
  return (
    <div
      onClick={() => handleShow(true, order.order_id)}
      className="block w-full"
    >
      <div className="w-full flex flex-grow justify-between text-xs font-medium text-gray-900">
        <div className={`flex text-xs text-gray-900 text-center`}>
          #{new Date(order.updated_at).toLocaleDateString()}
          <div className="ml-2 flex justify-between text-xs font-semibold text-gray-900">
            <h3>
              <div className="inline-flex font-medium rounded-md text-center px-2.5 bg-green-100 text-green-600">
                {order.status}
              </div>
            </h3>
          </div>
        </div>
        <p className="ml-4 font-medium text-green-600">
          {formatPesosMoney(order.total, order.currency)}
        </p>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex flex-col justify-between">
          <div className="text-xs font-medium text-gray-800">
            {order.customer_name}
          </div>
          <div className="text-xs font-normal text-gray-800">
            {order.location === "null" ? "Accra" : order.location}
          </div>
          <div className="flex text-base font-medium text-gray-900">
            <p
              className={`text-xs text-gray-500 rounded-full text-center`}
            >
              {order.num_items} {order.num_items === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
        <div className="flex flex-shrink-0 -space-x-3 -ml-px align-middle self-center justify-center border border-gray-100 rounded-full overflow-hidden">
          {order.item_images.slice(0, 3).map((url, i) => (
            <img
              src={url}
              alt={'product image'}
              key={i}
              className="rounded-full border-none border-white box-content ml-1 w-7 h-7 "
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
