import React from 'react';

function SalesChannelsPanel() {
  return (
    <div className="flex-grow">
      {/* Panel body */}
      <div className="md:p-6 p-4 space-y-6">
        <div>
          <h2 className="text-2xl text-gray-500 font-bold mb-4">
            Sales Channels
          </h2>
          <div className="text-sm">
            You can sell and manage your business across multiple sales channels
            right from your dashboard.
            <br></br>
            Check below to enable and disable various channels
          </div>
        </div>

        <section>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex items-center sm:w-1/2">
              <input
                id="reoapp"
                type="checkbox"
                required
                className="form-checkbox"
              />
              <label className="block text-sm ml-2" htmlFor="reoapp">
                Reo App
              </label>
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex items-center sm:w-1/2">
              <input
                id="facebook"
                type="checkbox"
                required
                className="form-checkbox"
              />
              <label className="block text-sm ml-2" htmlFor="facebook">
                Facebook
              </label>
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex items-center sm:w-1/2">
              <input
                id="instagram"
                type="checkbox"
                required
                className="form-checkbox"
              />
              <label className="block text-sm ml-2" htmlFor="instagram">
                Instagram
              </label>
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex items-center sm:w-1/2">
              <input
                id="whatsapp"
                type="checkbox"
                required
                className="form-checkbox"
              />
              <label className="block text-sm ml-2" htmlFor="whatsapp">
                WhatsApp
              </label>
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex items-center sm:w-1/2">
              <input
                id="tiktok"
                type="checkbox"
                required
                className="form-checkbox"
              />
              <label className="block text-sm ml-2" htmlFor="tiktok">
                TikTok
              </label>
            </div>
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex items-center sm:w-1/2">
              <input
                id="snapchat"
                type="checkbox"
                required
                className="form-checkbox"
              />
              <label className="block text-sm ml-2" htmlFor="snapchat">
                Snapchat
              </label>
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
            <button className="btn bg-purple-900 bg-opacity-100 rounded-lg  text-white ml-3">
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SalesChannelsPanel;
