import React, { useState } from 'react';

function PlansPanel() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="flex-grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        {/* Plans */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl text-gray-800 font-bold mb-4">
              Legal Policies
            </h2>
            <div className="text-sm">
              Having a good refund, shipping & terms of service policy is great
              for conversion
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
            Refund Policy
          </h3>
          <div className="text-sm">How do you handle refunds?</div>

          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="w-full md:w-1/2">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="refund-policy"
              >
                Refund Policy
              </label>
              <textarea
                id="refund-policy"
                className="form-textarea w-full"
                type="text"
                multiple
                rows={10}
                placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
              />
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
            Shipping Policy
          </h3>
          <div className="text-sm">How do you handle shipping & returns?</div>

          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="w-full md:w-1/2">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="shipping-policy"
              >
                Shipping Policy
              </label>
              <textarea
                id="shipping-policy"
                className="form-textarea w-full"
                type="text"
                multiple
                rows={10}
                placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
              />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <div className="my-8">
            <h2 className="text-2xl text-gray-800 font-bold">FAQs</h2>
          </div>
          <ul className="space-y-5">
            <li>
              <div className="font-semibold text-gray-800 mb-1">
                What is the difference between the three versions?
              </div>
              <div className="text-sm">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit.
              </div>
            </li>
            <li>
              <div className="font-semibold text-gray-800 mb-1">
                Is there any difference between Basic and Plus licenses?
              </div>
              <div className="text-sm">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
              </div>
            </li>
            <li>
              <div className="font-semibold text-gray-800 mb-1">
                Got more questions?
              </div>
              <div className="text-sm">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum in voluptate
                velit esse cillum dolore eu fugiat{' '}
                <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                >
                  contact us
                </a>
                .
              </div>
            </li>
          </ul>
        </section>
      </div>

      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-gray-200">
          <div className="flex self-end">
            <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
              Cancel
            </button>
            <button className="btn bg-purple-700 bg-opacity-100 rounded-lg  text-white ml-3">
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PlansPanel;
