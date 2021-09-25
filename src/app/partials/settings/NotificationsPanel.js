import React, { useState } from 'react';

function NotificationsPanel() {
  // const [comments, setComments] = useState(true);
  // const [messages, setMessages] = useState(true);
  // const [mentions, setMentions] = useState(false);

  return (
    <div className="flex-grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-gray-800 font-bold mb-5">
          Payout settings
        </h2>

        {/* Mobile Money */}
        <section>
          <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
            Mobile Money
          </h3>
          <div className="text-sm">Your Mobile Money account details</div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name of Account
              </label>
              <input
                id="name"
                className="form-input"
                type="text"
                autoComplete="account-name"
                placeholder="Romeo Obeng"
              />
            </div>
          </div>

          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="provider"
              >
                Provider
              </label>
              <select
                id="provider"
                autoComplete="provider"
                className="form-select block"
              >
                <option value="">Please Select</option>
                <option value="MTN">MTN</option>
                <option value="Vodafone">Vodafone</option>
                <option value="AirtelTigo">AirtelTigo</option>
              </select>
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                className="form-input"
                type="tel"
                autoComplete="phone"
                placeholder="+233246493078"
              />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="w-full md:w-1/2">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="payout-descriptor"
              >
                How should we describe the transaction during payout?
              </label>
              <input
                id="payout-descriptor"
                className="form-input"
                type="text"
                placeholder="Rocketship Store Revenue"
              />
              <p class="text-blue-500 text-xs">
                This will used as Mobile Money Reference/Bank Invoice name
                during payout
              </p>
            </div>
          </div>
        </section>

        {/* Bank */}
        <section>
          <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
            Bank Account
          </h3>
          <ul>
            <li className="flex justify-between items-center py-3 border-b border-gray-200">
              {/* Left */}
              <div>
                <div className="text-gray-800 font-semibold italic">
                  Only Mobile Money is supported now. Bank support is coming
                  soon
                </div>
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

export default NotificationsPanel;
