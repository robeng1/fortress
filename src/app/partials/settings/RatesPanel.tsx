import React, { useState } from 'react';
// import isEmpty from 'lodash/isEmpty';
// import LocationCard from '../locations/LocationCard';
import RateForm from 'app/forms/rates/Rate';
// import { useAtom } from 'jotai';

function RatesPanel() {
  const [showRateForm, setShowRateForm] = useState(false);
  // const [currentlyBeingEditedRateId, setCurrentlyBeingEditedRateId] = useState<
  //   string | undefined
  // >();

  const handleShow = (show: boolean, id?: string) => {
    // setCurrentlyBeingEditedRateId(id);
    setShowRateForm(show);
  };
  return (
    <div className="flex-grow">
      {/* Panel body */}
      {showRateForm && <RateForm handleShow={handleShow} rate={null} />}
      {!showRateForm && (
        <div className="md:p-6 p-4 space-y-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl text-gray-800 font-bold">Rates</h2>
            </div>
            <button
              onClick={() => setShowRateForm(!showRateForm)}
              type="button"
              className="text-white cursor-pointer bg-blue-900 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3"
            >
              Add Rate
            </button>
          </div>
          <div className="text-sm">
            Rates to charge your customers at checkout
          </div>
        </div>
      )}
    </div>
  );
}

export default RatesPanel;
