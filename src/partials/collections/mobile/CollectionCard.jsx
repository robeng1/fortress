import React from 'react';

export default function CollectionCard({ collection, handleShow }) {
  return (
    <>
      <div
        onClick={() => handleShow(true, collection.collection_id)}
        className="flex-shrink-0 w-[60px] h-[60px] align-middle self-center justify-center border border-gray-100 rounded-md overflow-hidden"
      >
        <img
          src={collection.image || 'https://via.placeholder.com/150'}
          alt={collection.title}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-2 flex-1 flex flex-col pl-2">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="/">{collection.title}</a>
            </h3>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p
              className={`text-sm text-gray-500 rounded-full text-center py-0.5`}
            >
              {collection.Condtions}
            </p>
          </div>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p
            className={`mt-1 text-sm text-gray-500 rounded-full text-center py-0.5`}
          >
            {collection.all_products_count}
          </p>
        </div>
      </div>
    </>
  );
}