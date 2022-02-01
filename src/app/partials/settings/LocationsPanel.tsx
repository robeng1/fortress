import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import LocationCard from '../locations/LocationCard';
import LocationForm from 'app/forms/location/Location';
import { useAtom } from 'jotai';
import { locationsAtom } from 'store/location';

function LocationsPanel() {
  const [locations] = useAtom(locationsAtom);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [currentlyBeingEditedCentreId, setCurrentlyBeingEditedCentreId] =
    useState<string | undefined>();

  const handleShow = (show: boolean, id?: string) => {
    setCurrentlyBeingEditedCentreId(id);
    setShowLocationForm(show);
  };
  return (
    <div className="flex-grow">
      {/* Panel body */}
      {showLocationForm && (
        <LocationForm
          handleShow={handleShow}
          id={currentlyBeingEditedCentreId}
        />
      )}
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
              {Object.values(locations || []).map((loc, index) => (
                <LocationCard
                  key={index}
                  location={loc}
                  handleShow={handleShow}
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
