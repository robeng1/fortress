import React from 'react';
import CollectionCard from './CollectionCard';

export default function CollectionList() {
  return (
    <>
      <div className="md:hidden">
        <div className="mt-0">
          <div className="flow-root">
            <ul className="px-3 py-1 divide-y divide-gray-200">
              <li key={1} className="flex pr-3 py-2">
                <CollectionCard />
              </li>
              <li key={2} className="flex pr-3 py-2">
                <CollectionCard />
              </li>
              <li key={3} className="flex pr-3 py-2">
                <CollectionCard />
              </li>
              <li key={4} className="flex pr-3 py-2">
                <CollectionCard />
              </li>
              <li key={5} className="flex pr-3 py-2">
                <CollectionCard />
              </li>
              <li key={6} className="flex pr-3 py-2">
                <CollectionCard />
              </li>
              <li key={7} className="flex pr-3 py-2">
                <CollectionCard />
              </li>
              <li key={8} className="flex pr-3 py-2">
                <CollectionCard />
              </li>
              <li key={9} className="flex pr-3 py-2">
                <CollectionCard />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
