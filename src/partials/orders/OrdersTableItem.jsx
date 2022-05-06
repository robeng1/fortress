// import { OrderStatusType } from 'models/order/order-type';
import React from 'react';

function OrdersTableItem(props) {
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
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                id={props.id}
                className="form-checkbox"
                type="checkbox"
                onChange={props.handleClick}
                checked={props.isChecked}
              />
            </label>
          </div>
        </td>
        <td
          onClick={() => props.handleShow(true, props.id)}
          className="cursor-pointer hover:underline px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
        >
          <div className="flex items-center text-gray-800">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-2 sm:mr-3">
              <img
                className="ml-1"
                src={props.image}
                width="20"
                height="20"
                alt={props.id}
              />
            </div>
            <div className="text-light-purple-500 font-thin text-sm">
              {props.order}
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div>{props.date}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-medium text-gray-800">{props.customer}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">
            {props.total}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div
            className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
              props.status,
            )}`}
          >
            {props.status === "Authorized" ? "New" : props.status}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center">{props.items}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="items-right">{props.location}</div>
        </td>
      </tr>
    </tbody>
  );
}

export default OrdersTableItem;
