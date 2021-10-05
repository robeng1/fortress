import React from 'react';

function InventoryTableItem(props) {
  return (
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

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded"
              src={props.image}
              width="40"
              height="40"
              alt={props.name}
            />
          </div>
          <div className="font-medium text-gray-800">White lab</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div
          className={`inline-flex font-medium rounded-full text-left py-0.5 `}
        >
          Something
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          className="form-input w-full sm:w-28 rounded-sm"
          value={props.status}
        ></input>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="number"
          step={1}
          min={0}
          className="form-input w-full sm:w-28 rounded-sm"
          value={props.variants}
        ></input>
      </td>
    </tr>
  );
}

export default InventoryTableItem;