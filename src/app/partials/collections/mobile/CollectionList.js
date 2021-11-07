import React from 'react';
import { useSelector } from 'react-redux';
import { selectCollectionViews } from 'app/features/collection/selectors';
import CollectionCard from './CollectionCard';

export default function CollectionList({ handleShow }) {
  const collections = useSelector(selectCollectionViews);
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              {collections.map(collection => (
                <li key={collection.collection_id} className="flex pr-3 py-2">
                  <CollectionCard
                    handleShow={handleShow}
                    collection={collection}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
