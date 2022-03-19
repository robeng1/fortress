import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { LocationType } from 'typings/inventory/inventory-type';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { request, ResponseError } from 'utils/request';
import { fortressURL } from 'endpoints/urls';
import useShop from 'hooks/use-shop';
import { Loading } from 'components/blocks/backdrop';

function LocationsForm({ handleShow, id }) {
  const qc = useQueryClient();
  const { shop } = useShop();
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/centres`;
  const [centreId, setCentreId] = useState(id);

  // query for getting the collection
  const { data: centre } = useQuery<LocationType>(
    ['location', centreId],
    async () => await request(`${requestURL}/${centreId}`),
    {
      // The query will not execute until the centre exists
      enabled: !!centreId,
      keepPreviousData: true,
    },
  );

  const initialValues: LocationType = {
    shop_id: shop?.shop_id,
    centre_id: centreId || '',
    name: centre?.name || '',
    description: centre?.description || '',
    is_pick_up_centre: centre?.is_pick_up_centre || true,
    is_active: centre?.is_active || true,
    longitude: centre?.longitude || 10.099,
    latitude: centre?.latitude || 123.243,
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
          setFieldValue('address.street', comps[comps.length - 1].short_name);
          setFieldValue('address.city', comps[comps.length - 1].short_name);
          setFieldValue('address.area', comps[2].short_name);
          setFieldValue('address.province', comps[1].short_name);
          setFieldValue('address.country', comps[0].short_name);
        })
        .catch(error => {
          // do smth with this error
        });
    };

  // create the colletion
  const { mutate: createLocation, isLoading: isCreatingLocation } = useMutation(
    (payload: LocationType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newLocation: LocationType) => {
        setCentreId(newLocation.centre_id);
        qc.setQueryData(['location', newLocation.centre_id], newLocation);
        toast('Location created successfully');
      },
      onError: (e: ResponseError) => {
        toast('Location creation failed due to ' + e.message);
      },
    },
  );

  // update the collection
  const { mutate: updateLocation, isLoading: isUpdatingLocation } = useMutation(
    (payload: LocationType) =>
      request(`${requestURL}/${centreId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newLocation: LocationType) => {
        setCentreId(newLocation.centre_id);
        qc.setQueryData(['location', newLocation.centre_id], newLocation);
      },
      onError: (e: ResponseError) => {},
    },
  );

  return (
    <div>
      <Loading open={isCreatingLocation || isUpdatingLocation} />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          if (!centreId || centreId === '') {
            createLocation({ ...values });
          } else {
            updateLocation({ ...values });
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
              <h2 className="text-2xl text-gray-500 font-bold mb-5">
                Locations
              </h2>
              <section>
                <h3 className="text-xl leading-snug text-gray-500 font-bold mb-1">
                  Shipping Locations
                </h3>
                <div className="text-sm">
                  These are the places where you ship your orders from
                  <br />
                  (Could be from a warehouse, your home, a fulfilment partner)
                </div>

                <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
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
                <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
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
                <section className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="address.country"
                    >
                      Country
                    </label>
                    <select
                      id="address.country"
                      name="address.country"
                      autoComplete="country"
                      className="form-select block"
                      value={values.address?.country}
                      onChange={handleChange}
                    >
                      <option value="">Please Select</option>
                      <option value="GH">Ghana</option>
                      <option value="NG">Nigeria</option>
                      <option value="RW">Rwanda</option>
                      <option value="KY">Kenya</option>
                      <option value="SA">South Africa</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="address.city"
                    >
                      City
                    </label>
                    <input
                      id="address.city"
                      name="address.city"
                      className="form-input w-full"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address?.city}
                      placeholder="Kumasi"
                    />
                  </div>
                </section>
                <div className="sm:flex sm:w-1/2 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="address.province"
                    >
                      Province or Region
                    </label>
                    <input
                      id="address.province"
                      name="address.province"
                      className="form-input w-full"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
              <div className="flex flex-col px-6 py-5 md:border-t md:border-gray-200">
                <div className="flex self-end">
                  <button
                    onClick={() => handleShow(false)}
                    className="btn border-teal-600 hover:border-gray-700 text-gray-600 bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleSubmit();
                    }}
                    className="btn bg-purple-600 bg-opacity-100 rounded  text-white ml-3"
                  >
                    Save
                  </button>
                </div>
              </div>
            </footer>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default LocationsForm;
