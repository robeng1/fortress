import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CollectionViewType } from 'typings/collection/collection-type';
import CollectionCard from './collection-card';

type CollectionsListProps = {
  collections: CollectionViewType[]
}
const CollectionList: React.FC<CollectionsListProps> = ({ collections }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              {collections.map(collection => (
                <li key={collection.collection_id} className="flex pr-3 py-2">
                  <CollectionCard
                    handleShow={() =>
                      navigate(`/shop/collections/${collection.collection_id}`)
                    }
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

export default CollectionList;