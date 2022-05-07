import React from 'react';
import { proxyURL } from 'utils/urlsigner';
function ProductTableItem(props) {
  const statusColor = status => {
    switch (status) {
      case 'Not tracked':
        return 'bg-green-100 text-green-600';
      case '0 in stock':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-green-100 text-green-600';
    }
  };
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap w-px">
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
        onClick={props.handleShow}
        className="cursor-pointer hover:underline px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded"
              src={proxyURL(props.image, 50, 50)}
              alt={props.name}
            />
          </div>
          <div className="font-medium text-gray-800">{props.name}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div
          className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
            props.inventory,
          )}`}
        >
          {props.inventory}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-left">{props.type}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-left">{props.status || 'Available'}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-2 whitespace-nowrap">
        <div className="text-center">{props.variants}</div>
      </td>
    </tr>
  );
}

export default ProductTableItem;
