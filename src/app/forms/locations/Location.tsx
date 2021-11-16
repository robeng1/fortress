import React from 'react';
import { Formik } from 'formik';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { LocationType } from 'app/models/inventory/inventory-type';
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from 'app/features/settings/selectors';
import { useInventorySlice } from 'app/features/inventory';
import { selectLocationById } from 'app/features/inventory/selectors';

function LocationsForm({ handleShow, centreId }) {
  const dispatch = useDispatch();
  const { actions } = useInventorySlice();
  const centre = useSelector(state => selectLocationById(state, centreId));
  const shop = useSelector(selectShop);
  const initialValues: LocationType = {
    shop_id: shop.shop_id,
    centre_id: centreId || '',
    name: centre?.name || '',
    description: centre?.description || '',
    is_pick_up_centre: centre?.is_pick_up_centre || true,
    is_active: centre?.is_active || true,
    longitude: centre?.longitude,
    latitude: centre?.latitude,
    address: {
      street: centre?.address?.street || '',
      city: centre?.address?.city || '',
      province: centre?.address?.province || '',
      area: centre?.address?.area || '',
      country: centre?.address?.country || '',
    },
  };
  const handleSelect =
    (setFieldValue: (f: string, v: any, sv?: boolean | undefined) => void) =>
    (address: string, placeId: string) => {
      // set the address object first
      setFieldValue('description', address, true);
      geocodeByAddress(address)
        .then(results => {
          const result = results[0];
          const lt = getLatLng(result);
          lt.then(cd => {
            setFieldValue('longitude', cd.lng);
            setFieldValue('latitude', cd.lat);
          });
          const comps = result.address_components.reverse();
          console.log(comps);
          setFieldValue('address.street', comps[comps.length - 1].short_name);
          setFieldValue('address.city', comps[comps.length - 1].short_name);
          setFieldValue('address.area', comps[2].short_name);
          setFieldValue('address.province', comps[1].short_name);
          setFieldValue('address.country', comps[0].short_name);
        })
        .catch(error => console.error('Error', error));
    };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          if (!centreId || centreId === '') {
            dispatch(actions.createLocation({ ...values }));
          } else {
            dispatch(actions.updateLocation({ ...values }));
          }

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldError,
          setValues,
          setFieldTouched,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div className="flex-grow">
            {/* Panel body */}
            <div className="md:p-6 p-4 space-y-6">
              <h2 className="text-2xl text-gray-800 font-bold mb-5">
                Locations
              </h2>
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
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
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
                      htmlFor="description"
                    >
                      Address
                    </label>
                    <PlacesAutocomplete
                      value={values.description}
                      onSelect={handleSelect(setFieldValue)}
                      onChange={v => setFieldValue('description', v)}
                    >
                      {({
                        getInputProps,
                        getSuggestionItemProps,
                        suggestions,
                        loading,
                      }) => (
                        <div>
                          <input
                            className="form-input w-full"
                            id="description"
                            name="description"
                            placeholder="Enter Address"
                            // error={touched.description && errors.description}
                            {...getInputProps()}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion, index) => (
                              <div
                                className="cursor-pointer"
                                {...getSuggestionItemProps(suggestion)}
                                key={index}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </div>
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="sm:w-1/3">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="address.country"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      autoComplete="country"
                      className="form-select block"
                      value={values.address?.country}
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
                      htmlFor="address.city"
                    >
                      City
                    </label>
                    <input
                      id="address.city"
                      className="form-input"
                      type="text"
                      value={values.address?.city}
                      placeholder="Kumasi"
                    />
                  </div>
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="sm:w-1/3">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="address.province"
                    >
                      Province or Region
                    </label>
                    <input
                      id="address.province"
                      className="form-input"
                      type="text"
                      value={values.address?.province}
                      autoComplete="region"
                      placeholder="Ashanti Region"
                    />
                  </div>
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="flex items-center sm:w-1/2">
                    <input
                      className="form-checkbox"
                      id="is_pick_up_centre"
                      name="is_pick_up_centre"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.is_pick_up_centre}
                    />
                    <label className="block text-sm ml-2 " htmlFor="pickup">
                      Do you allow pickup from this location?
                    </label>
                  </div>
                  <div className="flex items-center sm:w-1/2">
                    <input
                      className="form-checkbox"
                      id="is_active"
                      name="is_active"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.is_active}
                    />
                    <label className="block text-sm ml-2" htmlFor="active">
                      Active
                    </label>
                  </div>
                </div>
              </section>
            </div>
            <footer>
              <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                <div className="flex self-end">
                  <button
                    onClick={() => handleShow(false)}
                    className="btn border-gray-200 hover:border-gray-300 text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleSubmit();
                    }}
                    className="btn bg-blue-900 bg-opacity-100 rounded-lg  text-white ml-3"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </footer>
          </div>
        )}
      </Formik>
    </>
  );
}

export default LocationsForm;
