import React from 'react';

function CollectionItemTable(props) {
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
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center relative">
          <button>
            <svg
              className={`w-4 h-4 flex-shrink-0 fill-current ${
                props.fav ? 'text-yellow-500' : 'text-gray-300'
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
            </svg>
          </button>
        </div>
      </td>
      <td
        onClick={() => props.handleShow(true, props.id)}
        className="cursor-pointer hover:underline px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
      >
        <div className="flex items-center">
          <div className="w-18 h-18 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded"
              src={props.image}
              width="75"
              height="75"
              alt={props.name}
            />
          </div>
          <div className="font-medium text-gray-800">{props.name}</div>
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.conditions}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.itemCount}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.channels}</div>
      </td>
    </tr>
  );
}

export default CollectionItemTable;
