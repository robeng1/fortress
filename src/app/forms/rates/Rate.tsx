import React, { useState } from 'react';
import { Formik } from 'formik';
import { LocationType } from 'app/models/inventory/inventory-type';
import { useAtom } from 'jotai';
import { shopAtom } from 'store/shop';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { request, ResponseError } from 'utils/request';
import { fortressURL } from 'app/endpoints/urls';
import { WeightBasedRateType } from 'app/models/rates/weight-based-rate';
import { ItemBasedRateType } from 'app/models/rates/item-based-rate';
import { WeightBandedRateType } from 'app/models/rates/weight-banded-rate';
import { PriceBandedRateType } from 'app/models/rates/price-banded-rate';
import colourStyles from 'app/forms/product/selectStyles';
import { modelOptions, ShippingRateModelOption } from 'app/data/select';
import { sToCurrency } from 'app/utils/money';

const animatedComponents = makeAnimated();

export interface RateType {
  shop_id?: string;
  model?: ShippingRateModelOption;
  name?: string;
  description?: string;
  cities?: string[];
  weight_based?: WeightBasedRateType;
  item_based?: ItemBasedRateType;
  weight_banded?: WeightBandedRateType;
  price_banded?: PriceBandedRateType;
  price_per_order_amt: string;
  price_per_weight_amt: string;
  price_per_item_amt: string;
  free_shipping_threshold: string;
}

function RatesForm({ handleShow, id }) {
  const queryClient = useQueryClient();
  const [shop] = useAtom(shopAtom);
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/centres`;
  const [centreId, setCentreId] = useState(id);

  const initialValues: RateType = {
    shop_id: shop?.shop_id,
    name: '',
    model: undefined,
    description: '',
    cities: [],
    weight_based: {},
    weight_banded: {},
    item_based: {},
    price_banded: {},
    price_per_order_amt: '0.00',
    price_per_weight_amt: '0.00',
    price_per_item_amt: '0.00',
    free_shipping_threshold: '0.00',
  };

  // create the colletion
  const {
    mutate: createRate,
    // isLoading: isCreatingCollection,
    // isError: collectionCreationFailed,
    // error: collectionCreationError,
  } = useMutation(
    (payload: LocationType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newLocation: LocationType) => {
        setCentreId(newLocation.centre_id);
        queryClient.setQueryData(
          ['location', newLocation.centre_id],
          newLocation,
        );
      },
      onError: (e: ResponseError) => {},
    },
  );

  // update the collection
  const {
    mutate: updateRate,
    // isLoading: isUpdatingCollection,
    // isError: collectionUpdateFailed,
    // error: collectionUpdateError,
  } = useMutation(
    (payload: LocationType) =>
      request(`${requestURL}/${centreId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newLocation: LocationType) => {
        setCentreId(newLocation.centre_id);
        queryClient.setQueryData(
          ['location', newLocation.centre_id],
          newLocation,
        );
      },
      onError: (e: ResponseError) => {},
    },
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          if (!centreId || centreId === '') {
            createRate({ ...values });
          } else {
            updateRate({ ...values });
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
              <h2 className="text-2xl text-gray-800 font-bold mb-5">Rates</h2>
              <section>
                <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
                  Shipping Rates
                </h3>
                <div className="text-sm">
                  Delight customers with free and low shipping rates
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
                      placeholder="E.g. Accra Central Rates-1"
                      required
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 sm:w-full mt-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    className="form-input w-full"
                    type="text"
                    placeholder="E.g. Ashanti Regional Rates-2"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 sm:w-full mt-2">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="model"
                    >
                      Model
                    </label>
                    <Select
                      id="model"
                      name="model"
                      closeMenuOnSelect={true}
                      defaultValue={values.model}
                      value={values.model}
                      isSearchable
                      onChange={option =>
                        setFieldValue(
                          'model',
                          option as ShippingRateModelOption,
                        )
                      }
                      components={animatedComponents}
                      options={modelOptions}
                      styles={{
                        input: base => ({
                          ...base,
                          'input:focus': {
                            boxShadow: 'none',
                          },
                        }),
                        ...colourStyles,
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </section>
              {values.model && values.model.value === 'WEIGHT_BASED' && (
                <section className="sm:flex w-full sm:items-center align-middle sm:w-1/2 items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full md:w-1/3 sm:w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="price-per-order"
                    >
                      Price per order
                    </label>
                    <input
                      id="price_per_order_amt"
                      name="price_per_order_amt"
                      onChange={handleChange}
                      onBlur={event =>
                        setFieldValue(
                          'price_per_order_amt',
                          sToCurrency(event.currentTarget.value).toString(),
                        )
                      }
                      value={values.price_per_order_amt}
                      className="form-input w-full"
                      type="text"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="sm:mt-3 self-center text-lg">
                    <h1>+</h1>
                  </div>
                  <div className="w-full md:w-1/3 sm:w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="price-per-weight_amt"
                    >
                      Price per gram
                    </label>
                    <input
                      id="price_per_weight_amt"
                      name="price_per_weight_amt"
                      onChange={handleChange}
                      onBlur={event =>
                        setFieldValue(
                          'price_per_weight_amt',
                          sToCurrency(event.currentTarget.value).toString(),
                        )
                      }
                      value={values.price_per_weight_amt}
                      className="form-input w-full"
                      type="text"
                      placeholder="1.00"
                    />
                  </div>
                </section>
              )}
              {values.model && values.model.value === 'ITEM_BASED' && (
                <>
                  <section className="sm:flex w-full sm:items-center align-middle sm:w-1/2 items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="w-full md:w-1/3 sm:w-full">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="price-per-order"
                      >
                        Price per order
                      </label>
                      <input
                        id="price_per_order_amt"
                        name="price_per_order_amt"
                        onChange={handleChange}
                        onBlur={event =>
                          setFieldValue(
                            'price_per_order_amt',
                            sToCurrency(event.currentTarget.value).toString(),
                          )
                        }
                        value={values.price_per_order_amt}
                        className="form-input w-full"
                        type="text"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="sm:mt-3 self-center text-lg">
                      <h1>+</h1>
                    </div>
                    <div className="w-full md:w-1/3 sm:w-full">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="price-per-item_amt"
                      >
                        Price per item
                      </label>
                      <input
                        id="price_per_item_amt"
                        name="price_per_item_amt"
                        onChange={handleChange}
                        onBlur={event =>
                          setFieldValue(
                            'price_per_item_amt',
                            sToCurrency(event.currentTarget.value).toString(),
                          )
                        }
                        value={values.price_per_item_amt}
                        className="form-input w-full"
                        type="text"
                        placeholder="1.00"
                      />
                    </div>
                  </section>
                  <section>
                    <div className="w-full md:w-1/2 sm:w-full">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="free-shipping-threshold"
                      >
                        Free shipping at
                      </label>
                      <input
                        id="free_shipping_threshold"
                        name="free_shipping_threshold"
                        onChange={handleChange}
                        onBlur={event =>
                          setFieldValue(
                            'free_shipping_threshold',
                            sToCurrency(event.currentTarget.value).toString(),
                          )
                        }
                        value={values.free_shipping_threshold}
                        className="form-input w-full"
                        type="text"
                        placeholder="1.00"
                      />
                    </div>
                  </section>
                </>
              )}
              {values.model && values.model.value === 'WEIGHT_BANDED' && (
                <section>Render weight banded model form</section>
              )}
              {values.model && values.model.value === 'PRICE_BANDED' && (
                <section>Render price banded model form</section>
              )}
              <div className="w-full md:w-1/2 sm:w-full mt-2">
                <div className="w-full">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="cities"
                  >
                    Regions/Cities
                  </label>
                  <Select
                    id="cities"
                    name="cities"
                    closeMenuOnSelect={true}
                    isMulti
                    isClearable
                    defaultValue={values.cities}
                    value={values.cities}
                    isSearchable
                    onChange={option =>
                      setFieldValue('cities', option as ShippingRateModelOption)
                    }
                    components={animatedComponents}
                    options={modelOptions}
                    styles={{
                      input: base => ({
                        ...base,
                        'input:focus': {
                          boxShadow: 'none',
                        },
                      }),
                      ...colourStyles,
                    }}
                    className="w-full"
                  />
                </div>
              </div>
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

export default RatesForm;
