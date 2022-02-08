import React from 'react';

function PaginationClassic({ previous, next }) {
  return (
    <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        className="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <a
              className={` ${
                previous.disabled
                  ? 'btn bg-white border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'btn bg-white border-gray-200 hover:border-gray-300 text-purple-500'
              }`}
              href="#0"
              disabled={previous.disabled}
              onClick={e => {
                e.stopPropagation();
                previous.callBack();
              }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Previous
            </a>
          </li>
          <li className="ml-3 first:ml-0">
            <a
              className={` ${
                next.disabled
                  ? 'btn bg-white border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'btn bg-white border-gray-200 hover:border-gray-300 text-purple-500'
              }`}
              href="#0"
              disabled={previous.disabled}
              onClick={e => {
                e.stopPropagation();
                next.callBack();
              }}
            >
              Next
              <svg
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
      {/* <div className="text-sm text-gray-500 text-center sm:text-left">
        Showing <span className="font-medium text-gray-600">1</span> to{' '}
        <span className="font-medium text-gray-600">10</span> of{' '}
        <span className="font-medium text-gray-600">467</span> results
      </div> */}
    </div>
  );
}

export default PaginationClassic;
