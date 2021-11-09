import React from 'react';
import LocationCard from '../locations/LocationCard';

function BillingPanel() {
  return (
    <div className="flex-grow">
      {/* Panel body */}
      <div className="md:p-6 p-4 space-y-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl text-gray-800 font-bold mb-4">Locations</h2>
          </div>
          <button
            type="button"
            className="text-white bg-blue-900 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3"
          >
            Add Location
          </button>
        </div>
        <div className="text-sm">
          Locations that you ship/deliver your orders from
        </div>

        <section>
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
          <LocationCard />
        </section>
      </div>

      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-gray-200">
          <div className="flex self-end">
            <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
              Cancel
            </button>
            <button className="btn bg-blue-900 bg-opacity-100 rounded-lg  text-white ml-3">
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BillingPanel;
