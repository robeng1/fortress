import React from 'react';

function VariantItem(props) {
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
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
        <div className="flex items-center align-middle justify-start">
          <div className="w-10 h-10 flex-shrink-0 sm:mr-3">
            <img
              className="rounded"
              src={props.image}
              width="40"
              height="40"
              alt={props.name}
            />
          </div>
          <div className="flex ml-1 text-sm text-gray-900 hover:underline">
            <p>
              <a href="/">{props.name}</a>
            </p>
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          type="number"
          step={1}
          min={0}
          className="form-input w-20 md:w-2/3 rounded-sm"
          value={props.quantity}
        ></input>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <input
          className="form-input w-20 md:w-4/5 rounded-sm"
          type="number"
          step={1}
          min={0}
          value={props.price}
        ></input>
      </td>
    </tr>
  );
}

export default VariantItem;
