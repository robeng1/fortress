import React from 'react';

// TODO: add hidden longitude and latitude inputs
function AppsPanel() {
  return (
    <div className="flex-grow">
      {/* Panel body */}
      <div className="md:p-6 p-1">
        <h2 className="text-2xl text-gray-800 font-bold mb-5">Locations</h2>
        <section>
          <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
            Shipping Locations
          </h3>
          <div className="text-sm">
            These are the places where you ship your orders from
            <br />
            (Could be from a warehouse, your home, a fulfilment partner)
          </div>

          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="w-full md:w-1/2 sm:w-full">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="centre-name"
              >
                Name
              </label>
              <input
                id="centre-name"
                className="form-input w-full"
                type="text"
                placeholder="E.g. Rocketship Kumasi warehouse"
                required
              />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="w-full md:w-1/2">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="centre-description"
              >
                Description
              </label>
              <textarea
                id="centre-description"
                className="form-textarea w-full"
                type="text"
                multiple
                placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
              />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="w-full md:w-1/2">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="centre-address"
              >
                Address
              </label>
              <input
                id="centre-address"
                className="form-input w-full"
                autoComplete="street-address"
                type="text"
                placeholder="E.g. Tech Junction, 16th Street Kumasi, Ghana"
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
              <label className="block text-sm font-medium mb-1" htmlFor="city">
                City
              </label>
              <input
                id="city"
                className="form-input"
                type="text"
                placeholder="Kumasi"
                required
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
                placeholder="Ashanti Region"
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
                placeholder="G7HS7893"
                required
              />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex items-center sm:w-1/2">
              <input
                className="form-checkbox"
                id="pickup"
                type="checkbox"
                required
              />
              <label className="block text-sm ml-2 " htmlFor="pickup">
                Do you allow pickup from this location?
              </label>
            </div>
            <div className="flex items-center sm:w-1/2">
              <input
                className="form-checkbox"
                id="active"
                type="checkbox"
                required
              />
              <label className="block text-sm ml-2" htmlFor="active">
                Active
              </label>
            </div>
          </div>
        </section>
        <section>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="w-full md:w-1/2">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="centre-name"
              >
                City
              </label>
              <input
                id="centre-name"
                className="form-input w-full"
                type="text"
                placeholder="E.g. Rocketship Kumasi warehouse"
                required
              />
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="w-full md:w-1/2">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="centre-description"
              >
                Price
              </label>
              <textarea
                id="centre-description"
                className="form-textarea w-full"
                type="text"
                multiple
                placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
              />
            </div>
          </div>
        </section>
      </div>
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

export default AppsPanel;
