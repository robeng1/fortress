import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import LocationCard from '../locations/LocationCard';
import LocationForm from 'app/forms/locations/Location';
import { useAtom } from 'jotai';
import { syncedLocationsAtom } from 'store/atoms/location';

function LocationsPanel() {
  const [data] = useAtom(syncedLocationsAtom);
  const locations = data;
  const [showLocationForm, setShowLocationForm] = useState(false);
  return (
    <div className="flex-grow">
      {/* Panel body */}
      {showLocationForm && <LocationForm />}
      {!showLocationForm && (
        <div className="md:p-6 p-4 space-y-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl text-gray-800 font-bold mb-4">
                Locations
              </h2>
            </div>
            <button
              onClick={() => setShowLocationForm(!showLocationForm)}
              type="button"
              className="text-white bg-blue-900 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3"
            >
              Add Location
            </button>
          </div>
          <div className="text-sm">
            Locations that you ship/deliver your orders from
          </div>

          {!isEmpty(locations) ? (
            <section>
              {Object.values(locations).map((loc, index) => (
                <LocationCard
                  centreId={loc.centre_id}
                  key={index}
                  location={loc}
                  handleShow={setShowLocationForm}
                />
              ))}
            </section>
          ) : (
            'No locations to show'
          )}
        </div>
      )}
    </div>
  );
}

export default LocationsPanel;
