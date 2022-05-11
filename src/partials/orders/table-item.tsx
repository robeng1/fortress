// import { OrderStatusType } from 'models/order/order-type';
import React from 'react';
import { OrderViewType } from 'typings/order/order-type';
import { formatPesosMoney } from 'utils/money';

type OrderTableItemProps = {
  order: OrderViewType
  handleClick: (e: any) => void
  isChecked: boolean
  handleShow: (show: boolean, id?: string) => void
}

const OrdersTableItem: React.FC<OrderTableItemProps> = ({ order, handleClick, handleShow, isChecked }) => {
  const statusColor = status => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Refunded':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                id={order.order_id}
                className="form-checkbox"
                type="checkbox"
                onChange={handleClick}
                checked={isChecked}
              />
            </label>
          </div>
        </td>
        <td
          onClick={() => handleShow(true, order.order_id)}
          className="cursor-pointer hover:underline px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap"
        >
          <div className="flex items-center text-gray-800">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-2 sm:mr-3">
              <img
                className="ml-1 rounded-full w-10 h-10"
                src={order.item_images[0]}
                // width="w"
                // height="10"
                alt={order.order_id}
              />
            </div>
            <div className="text-light-purple-500 font-thin text-sm">
              {order.order_id}
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
          <div>{new Date(order.updated_at).toLocaleString()}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
          <div className="font-medium text-gray-800">{order.customer_name}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">
            {formatPesosMoney(order.total, order.currency)}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
          <div
            className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
              order.status,
            )}`}
          >
            {order.status === "Authorized" ? "New" : order.status}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
          <div className="text-center">{order.num_items}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
          <div className="items-right">{order.location ?? "Accra"}</div>
        </td>
      </tr>
    </tbody>
  );
}

export default OrdersTableItem;
