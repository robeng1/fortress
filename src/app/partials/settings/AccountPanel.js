import React, { useState } from 'react';

import Image from '../../images/user-avatar-80.png';

function AccountPanel() {
  const [sync, setSync] = useState(false);

  return (
    <>
      <form className="flex-grow">
        {/* Panel body */}
        <div className="p-6 space-y-6">
          <h2 className="text-2xl text-gray-800 font-bold mb-5">My Store</h2>
          {/* Picture */}
          <section>
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  className="w-20 h-20 rounded-full"
                  src={Image}
                  width="80"
                  height="80"
                  alt="User upload"
                />
              </div>
              <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                Change
              </button>
            </div>
          </section>
          {/* Business Profile */}
          <section>
            <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
              General Details
            </h2>
            <div className="text-sm">
              General information about your Business
            </div>
            <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className="w-full md:w-1/2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  className="form-input"
                  type="text"
                  autoComplete="business name"
                  placeholder="Rocketship"
                />
              </div>
            </div>

            <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className="sm:w-1/3">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  className="form-input"
                  type="email"
                  autoComplete="email"
                  placeholder="romeo@reoplex.com"
                />
              </div>
              <div className="sm:w-1/3">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
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
          </section>
          <section>
            <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
              Legal Details
            </h2>
            <div className="text-sm">
              Registration information about your business.
              <br /> Only fill this if your business is registered.
              <br /> The address you use here will appear on your invoices
            </div>

            <div class="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div class="w-full md:w-1/2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="legal_name"
                >
                  Legal Name
                </label>
                <input
                  id="legal_name"
                  className="form-input"
                  type="text"
                  placeholder="Rocketship LLC."
                />
              </div>
            </div>
            <div class="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div class="w-full md:w-1/2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="address-name"
                >
                  Street Address
                </label>
                <input
                  id="address-name"
                  className="form-input"
                  type="text"
                  autoComplete="street-address"
                  placeholder="8th Street"
                />
              </div>
            </div>
            <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className="sm:w-1/3">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="country"
                >
                  Country
                </label>
                <select
                  id="country"
                  autoComplete="country"
                  className="form-select block"
                >
                  <option value="">Please Select</option>
                  <option value="GH">Ghana</option>
                  <option value="NG">Nigeria</option>
                  <option value="RW">Rwanda</option>
                  <option value="KY">Kenya</option>
                  <option value="SA">South Africa</option>
                </select>
              </div>
              <div className="sm:w-1/3">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  id="city"
                  className="form-input w-full"
                  type="text"
                  placeholder="Accra"
                />
              </div>
            </div>
            <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className="sm:w-1/3">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="province"
                >
                  Province or Region
                </label>
                <input
                  id="province"
                  className="form-input"
                  type="text"
                  autoComplete="region"
                  placeholder="Greater Accra"
                  required
                />
              </div>
              <div className="sm:w-1/3">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="post-code"
                >
                  Digital Address/Postal code
                </label>
                <input
                  id="post-code"
                  className="form-input"
                  type="text"
                  autoComplete="postal-code"
                  placeholder="G7HSED23"
                  required
                />
              </div>
            </div>
          </section>
          {/* Currency */}
          <section>
            <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
              Store currency
            </h2>
            <div className="text-sm">
              This is the primary currency your products will be sold in
              {/* <br /> You can enable more currencies later.{' '} */}
              <br />
              <b>
                Multi currency is enabled for all stores by default and exchange
                rates may apply
              </b>
              .
              <br /> Primary currency cannot be changed after first sale
            </div>
            <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className="sm:w-1/3">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="primary-currency"
                >
                  Currency
                </label>
                <select
                  id="primary-currency"
                  className="form-select"
                  placeholder="GHS"
                >
                  <option value="">Please select</option>
                  <option value="GHS">GHS</option>
                  <option value="NGN">NGN</option>
                  <option value="ZAR">ZAR</option>
                  <option value="RWF">RWF</option>
                  <option value="UGX">UGX</option>
                  <option value="KES">KES</option>
                </select>
              </div>
            </div>
          </section>
        </div>
        {/* Panel footer */}
        <footer>
          <div className="flex flex-col px-6 py-5 border-t border-gray-200">
            <div className="flex self-end">
              <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
                Cancel
              </button>
              <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">
                Save Changes
              </button>
            </div>
          </div>
        </footer>
      </form>
    </>
  );
}

export default AccountPanel;
