import * as React from 'react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Formik } from 'formik';
import { fortressURL } from 'endpoints/urls';
import { DiscountType } from 'typings/discount/discount-type';
import { request, ResponseError } from 'utils/request';
import useShop from 'hooks/use-shop';
import { initialValues } from './values';
import { discountToValues, valuesToDiscount } from './utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loading } from 'components/blocks/backdrop';
import { ABSOLUTE, ALL_PRODUCTS, BUY_X_GET_Y, COUNT, COVERAGE, FIXED_PRICE, FREE, MULTIBUY, NONE, PERCENTAGE, SITE, SPECIFIC_COLLECTIONS, SPECIFIC_PRODUCTS, VALUE, VOUCHER } from './consts';
import ProductSelector from 'components/blocks/product-selector';
import CollectionSelector from 'components/blocks/collection-selector';
import { useOnboarding } from 'hooks/use-onboarding';
import InputHeader from 'components/blocks/input-header';

const DiscountForm = ({ id }) => {
  const location = useLocation();
  const { pathname } = location;
  useOnboarding(pathname);
  const navigate = useNavigate();
  const klient = useQueryClient();
  const { shop } = useShop();
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/offers`;
  const [discountId, setDiscountId] = useState(id);

  // query for getting the discount, TODO: create a hook for this?
  const { data: discount, isLoading } = useQuery<DiscountType>(
    ['discount', discountId],
    async () => await request(`${requestURL}/${discountId}`),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId,
      keepPreviousData: true,
    },
  );

  // TODO: hook this up since it's already baked in the backend
  // const [image, setImage] = useState(discount?.image?.image_url);

  // this is only useful for controlling which queries should be
  // enabled to prevent react-query from running all the quries
  const [isBx, setIsBx] = useState<boolean>(false);

  // create the discount, TODO: should be moved into a hook
  const { mutate: createDiscount, isLoading: isCreatingDiscount } = useMutation(
    (payload: DiscountType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newDiscount: DiscountType) => {
        setDiscountId(newDiscount.discount_id);
        klient.setQueryData(['discount', discountId], newDiscount);
        toast.success('Discount created successfully');
      },
      onError: (e: ResponseError) => {
        toast.error(e.message);
      },
    },
  );

  // update the update TODO: should be moved into a hook
  const { mutate: updateDiscount, isLoading: isUpdatingDiscount } = useMutation(
    (payload: DiscountType) =>
      request(`${requestURL}/${discountId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newDiscount: DiscountType) => {
        setDiscountId(newDiscount.discount_id);
        klient.setQueryData(['discount', discountId], newDiscount);
        toast('Discount updated successfully');
      },
      onError: (e: ResponseError) => {
        toast(e.message);
      },
    },
  );

  const initialVals = {
    ...initialValues,
    ...discountToValues(discount, shop),
  };

  return (
    <div className="w-full">
      <div>
        <Loading open={isCreatingDiscount || isUpdatingDiscount || isLoading} />
        <Formik
          enableReinitialize
          initialValues={initialVals}
          onSubmit={(values, { setSubmitting }) => {
            if (discount) {
              updateDiscount({
                ...discount,
                ...valuesToDiscount({ ...values }, shop),
              });
            } else {
              createDiscount({
                ...valuesToDiscount({ ...values }, shop),
              });
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            /* and other goodies */
          }) => (
            <div className="flex-grow w-full mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-2">
                <div className="col-span-3 md:col-span-2">
                  <section className="rounded bg-white shadow p-3">
                    <div className="flex items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <InputHeader label='Title' tooltipContent='This will be displayed in the customer&apos;s cart' />
                        <input
                          id="title"
                          name="title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                          className="form-input w-full"
                          type="text"
                          autoComplete="discount-title"
                          placeholder="X-mas Sales"
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <InputHeader label='Discount Type' tooltipContent='Manual discounts require the customer to enter a code to activate, automatic gets applied automatically to the customer&apos;s cart provided the necessary conditons are met' />
                        <select
                          name="type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.type}
                          id="type"
                          className="form-select block"
                        >
                          <option value="">Please Select</option>
                          <option value={SITE}>Automatic</option>
                          <option value={VOUCHER}>Manual</option>
                        </select>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <section className="rounded bg-white shadow overflow-hidden p-3">
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="sm:w-full mt-1">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="incentive_type"
                        >
                          Type
                        </label>
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="incentive_type"
                              className="form-radio"
                              onChange={e => {
                                setFieldValue('incentive_type', PERCENTAGE);
                                setIsBx(false);
                              }}
                              checked={values.incentive_type === PERCENTAGE}
                              value={values.incentive_type}
                            />
                            <span className="text-sm ml-2">Percentage</span>
                          </label>
                        </div>
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="incentive_type"
                              className="form-radio"
                              onChange={e => {
                                setFieldValue(
                                  'incentive_type',
                                  ABSOLUTE,
                                );
                                setIsBx(false);
                              }}
                              checked={
                                values.incentive_type === ABSOLUTE
                              }
                              value={values.incentive_type}
                            />
                            <span className="text-sm ml-2">Fixed amount</span>
                          </label>
                        </div>
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="incentive_type"
                              className="form-radio"
                              onChange={e => {
                                setFieldValue('incentive_type', MULTIBUY);
                                setIsBx(false);
                              }}
                              checked={values.incentive_type === MULTIBUY}
                              value={values.incentive_type}
                            />
                            <span className="text-sm ml-2">Multibuy</span>
                          </label>
                        </div>
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="incentive_type"
                              className="form-radio"
                              onChange={e => {
                                setFieldValue('incentive_type', FIXED_PRICE);
                                setIsBx(false);
                              }}
                              checked={values.incentive_type === FIXED_PRICE}
                              value={values.incentive_type}
                            />
                            <span className="text-sm ml-2">Fixed price</span>
                          </label>
                        </div>
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="incentive_type"
                              className="form-radio"
                              onChange={e => {
                                setFieldValue('incentive_type', BUY_X_GET_Y);
                                setIsBx(true);
                              }}
                              checked={values.incentive_type === BUY_X_GET_Y}
                              value={values.incentive_type}
                            />
                            <span className="text-sm ml-2">Buy X Get Y</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <section
                    className={`rounded bg-white shadow overflow-hidden p-3 mb-10 ${values.incentive_type === BUY_X_GET_Y
                      ? 'block'
                      : 'hidden'
                      }`}
                  >
                    <h2 className="block text-lg font-semibold mb-1">
                      Customer buys
                    </h2>
                    <div className="m-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="buy_x_get_y_condition_type"
                          className="form-radio"
                          onChange={e =>
                            setFieldValue('buy_x_get_y_condition_type', COUNT)
                          }
                          checked={
                            values.buy_x_get_y_condition_type === COUNT
                          }
                          value={values.buy_x_get_y_condition_type}
                        />
                        <span className="text-sm ml-2">
                          Minimum quantity of items
                        </span>
                      </label>
                    </div>
                    <div className="m-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="buy_x_get_y_condition_type"
                          className="form-radio"
                          onChange={e =>
                            setFieldValue('buy_x_get_y_condition_type', VALUE)
                          }
                          checked={
                            values.buy_x_get_y_condition_type === VALUE
                          }
                          value={values.buy_x_get_y_condition_type}
                        />
                        <span className="text-sm ml-2">
                          Minimum purchase amount
                        </span>
                      </label>
                    </div>
                    <div className="m-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="buy_x_get_y_condition_type"
                          className="form-radio"
                          onChange={e =>
                            setFieldValue(
                              'buy_x_get_y_condition_type',
                              COVERAGE,
                            )
                          }
                          checked={
                            values.buy_x_get_y_condition_type === COVERAGE
                          }
                          value={values.buy_x_get_y_condition_type}
                        />
                        <span className="text-sm ml-2">
                          Minimum quantity of distinct items
                        </span>
                      </label>
                    </div>

                    {/* TODO: radios for customer to choose value type */}
                    <div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="buy_x_get_y_condition_value"
                          >
                            {values.buy_x_get_y_condition_type === COUNT ||
                              values.buy_x_get_y_condition_type === COVERAGE
                              ? 'Quantity'
                              : 'Amount'}
                          </label>
                          <div
                            className={`relative ${values.buy_x_get_y_condition_type === COUNT ||
                              values.buy_x_get_y_condition_type ===
                              COVERAGE ||
                              values.buy_x_get_y_condition_type === ''
                              ? 'hidden'
                              : 'block'
                              }`}
                          >
                            <input
                              className="form-input w-full pl-12"
                              type="text"
                              id="buy_x_get_y_condition_value"
                              name="buy_x_get_y_condition_value"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.buy_x_get_y_condition_value}
                            />
                            <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                              <span className="text-sm text-gray-400 font-medium px-3">
                                GHS
                              </span>
                            </div>
                          </div>
                          <div
                            className={`relative ${values.buy_x_get_y_condition_type === VALUE ||
                              values.buy_x_get_y_condition_type === ''
                              ? 'hidden'
                              : 'block'
                              }`}
                          >
                            <input
                              id="buy_x_get_y_condition_value"
                              name="buy_x_get_y_condition_value"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.buy_x_get_y_condition_value}
                              className="form-input w-full pr-8"
                              step={1}
                              min={1}
                              type="number"
                              placeholder="1"
                            />
                            {/* <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                            <span className="text-sm text-gray-400 font-medium px-3">
                              products
                            </span>
                          </div> */}
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="w-full">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="buy_x_get_y_condition_range_type"
                            >
                              Any Items from
                            </label>
                            <select
                              name="buy_x_get_y_condition_range_type"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.buy_x_get_y_condition_range_type}
                              id="buy_x_get_y_condition_range_type"
                              className="form-select block w-2/3"
                            >
                              <option value="specific_products">
                                Specific products
                              </option>
                              <option value="specific_collections">
                                Specific collections
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        {values.buy_x_get_y_condition_range_type ===
                          SPECIFIC_PRODUCTS ? (
                          <div className="w-full">
                            <ProductSelector
                              id="quick-find-modal-crp"
                              searchId="quick-find-crp"
                              queryKey="products-opt-search"
                              onChange={(items: string[]) => {
                                setFieldValue('buy_x_get_y_condition_range_keys', items)
                              }}
                              value={values.buy_x_get_y_condition_range_keys}
                              queryEnabled={!!shop?.shop_id}
                              shopId={shop?.shop_id}
                            />
                          </div>
                        ) : (
                          <CollectionSelector
                            id="quick-find-modal-crc"
                            searchId="quick-find-crc"
                            queryKey="collections-opt-search"
                            onChange={(items: string[]) => {
                              setFieldValue('buy_x_get_y_condition_range_keys', items)
                            }}
                            value={values.buy_x_get_y_condition_range_keys}
                            queryEnabled={!!shop?.shop_id}
                            shopId={shop?.shop_id}
                          />
                        )}
                      </div>
                    </div>
                  </section>
                  <section
                    className={`rounded bg-white shadow overflow-hidden p-3 mb-10 ${values.incentive_type === BUY_X_GET_Y
                      ? 'block'
                      : 'hidden'
                      }`}
                  >
                    <h2 className="block text-lg font-semibold mb-1">
                      Customer gets
                    </h2>
                    <div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="buy_x_get_y_ben_max_affected_items"
                          >
                            Quantity
                          </label>
                          <input
                            id="buy_x_get_y_ben_max_affected_items"
                            name="buy_x_get_y_ben_max_affected_items"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.buy_x_get_y_ben_max_affected_items}
                            className="form-input w-1/2"
                            step={1}
                            min={1}
                            type="number"
                            placeholder="1"
                          />
                        </div>
                        <div className="w-full">
                          <div className="w-full">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="buy_x_get_y_ben_range_type"
                            >
                              Any Items from
                            </label>
                            <select
                              name="buy_x_get_y_ben_range_type"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.buy_x_get_y_ben_range_type}
                              id="buy_x_get_y_ben_range_type"
                              className="form-select block w-2/3"
                            >
                              <option value="specific_products">
                                Specific products
                              </option>
                              <option value="specific_collections">
                                Specific collections
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        {values.buy_x_get_y_ben_range_type ===
                          SPECIFIC_PRODUCTS ? (
                          <ProductSelector
                            id="quick-find-modal-brp"
                            searchId="quick-find-brp"
                            queryKey="products-opt-search"
                            onChange={(items: string[]) => {
                              setFieldValue('buy_x_get_y_ben_range_keys', items)
                            }}
                            value={values.buy_x_get_y_ben_range_keys}
                            queryEnabled={!!shop?.shop_id}
                            shopId={shop?.shop_id}
                          />
                        ) : (
                          <CollectionSelector
                            id="quick-find-modal-brc"
                            searchId="quick-find-brc"
                            queryKey="collections-opt-search"
                            onChange={(items: any[]) => {
                              setFieldValue('buy_x_get_y_ben_range_keys', items)
                            }}
                            value={values.buy_x_get_y_ben_range_keys}
                            queryEnabled={!!shop?.shop_id}
                            shopId={shop?.shop_id}
                          />
                        )}
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="applies_to"
                          >
                            AT A DISCOUNTED VALUE
                          </label>
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="buy_x_get_y_discounted_value_type"
                                className="form-radio"
                                onChange={e =>
                                  setFieldValue(
                                    'buy_x_get_y_discounted_value_type',
                                    PERCENTAGE,
                                  )
                                }
                                checked={
                                  values.buy_x_get_y_discounted_value_type ===
                                  PERCENTAGE
                                }
                                value={values.buy_x_get_y_discounted_value_type}
                              />
                              <span className="text-sm ml-2">Percentage</span>
                            </label>
                          </div>
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="buy_x_get_y_discounted_value_type"
                                className="form-radio"
                                onChange={e =>
                                  setFieldValue(
                                    'buy_x_get_y_discounted_value_type',
                                    ABSOLUTE,
                                  )
                                }
                                checked={
                                  values.buy_x_get_y_discounted_value_type ===
                                  ABSOLUTE
                                }
                                value={values.buy_x_get_y_discounted_value_type}
                              />
                              <span className="text-sm ml-2">
                                Fixed discount
                              </span>
                            </label>
                          </div>
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="buy_x_get_y_discounted_value_type"
                                className="form-radio"
                                onChange={e =>
                                  setFieldValue(
                                    'buy_x_get_y_discounted_value_type',
                                    FREE,
                                  )
                                }
                                checked={
                                  values.buy_x_get_y_discounted_value_type ===
                                  FREE
                                }
                                value={values.buy_x_get_y_discounted_value_type}
                              />
                              <span className="text-sm ml-2">Free</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`relative w-1/2 ${values.buy_x_get_y_discounted_value_type === FREE ||
                          values.buy_x_get_y_condition_type === ''
                          ? 'hidden'
                          : 'block'
                          }`}
                      >
                        <input
                          id="buy_x_get_y_discounted_value"
                          name="buy_x_get_y_discounted_value"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.buy_x_get_y_discounted_value}
                          className={`form-input w-full pr-8 ${(values.buy_x_get_y_discounted_value_type ===
                            FIXED_PRICE ||
                            values.buy_x_get_y_discounted_value_type ===
                            ABSOLUTE) &&
                            'pl-12'
                            }`}
                          // step={1}
                          // min={1}
                          type="text"
                        />
                        {values.buy_x_get_y_discounted_value_type ===
                          PERCENTAGE && (
                            <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                              <span className="text-sm text-gray-400 font-medium px-3">
                                %
                              </span>
                            </div>
                          )}
                        {(values.buy_x_get_y_discounted_value_type ===
                          FIXED_PRICE ||
                          values.buy_x_get_y_discounted_value_type ===
                          ABSOLUTE ||
                          values.buy_x_get_y_discounted_value_type ===
                          ABSOLUTE) && (
                            <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                              <span className="text-sm text-gray-400 font-medium px-3">
                                GHS
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </section>
                  <section className="rounded bg-white overflow-hidden p-3 mb-10">
                    <div>
                      <section
                        className={`rounded bg-white overflow-hidden p-3 ${values.incentive_type === BUY_X_GET_Y ||
                          values.incentive_type === MULTIBUY
                          ? 'hidden'
                          : 'block'
                          }`}
                      >
                        <div className="sm:w-1/2 mb-4">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="value"
                          >
                            Value
                          </label>
                          <div className={`relative`}>
                            <input
                              id="value"
                              name="value"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.value}
                              className="form-input w-full pr-8"
                              type="text"
                            />
                            {values.incentive_type === PERCENTAGE && (
                              <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                                <span className="text-sm text-gray-400 font-medium px-3">
                                  %
                                </span>
                              </div>
                            )}
                            {(values.incentive_type === FIXED_PRICE ||
                              values.incentive_type === ABSOLUTE) && (
                                <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                                  <span className="text-sm text-gray-400 font-medium px-3">
                                    GHS
                                  </span>
                                </div>
                              )}
                          </div>
                        </div>

                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          <div className="w-full">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="applies_to"
                            >
                              APPLIES TO
                            </label>
                            <div className="m-3">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="applies_to"
                                  className="form-radio"
                                  onChange={e =>
                                    setFieldValue('applies_to', ALL_PRODUCTS)
                                  }
                                  checked={values.applies_to === ALL_PRODUCTS}
                                  value={values.applies_to}
                                />
                                <span className="text-sm ml-2">
                                  All products
                                </span>
                              </label>
                            </div>

                            <div className="m-3">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="applies_to"
                                  className="form-radio"
                                  onChange={e =>
                                    setFieldValue(
                                      'applies_to',
                                      SPECIFIC_PRODUCTS,
                                    )
                                  }
                                  checked={
                                    values.applies_to === SPECIFIC_PRODUCTS
                                  }
                                  value={values.applies_to}
                                />
                                <span className="text-sm ml-2">
                                  Specific products
                                </span>
                              </label>
                            </div>
                            <div className="m-3">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="applies_to"
                                  className="form-radio"
                                  onChange={e =>
                                    setFieldValue(
                                      'applies_to',
                                      SPECIFIC_COLLECTIONS,
                                    )
                                  }
                                  checked={
                                    values.applies_to === SPECIFIC_COLLECTIONS
                                  }
                                  value={values.applies_to}
                                />
                                <span className="text-sm ml-2">
                                  Specific collections
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`${values.applies_to === ALL_PRODUCTS ||
                            values.applies_to === ''
                            ? 'hidden'
                            : 'block'
                            }`}
                        >
                          <div
                            className={`sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5`}
                          >
                            {values.applies_to === SPECIFIC_PRODUCTS ? (
                              <ProductSelector
                                id="quick-find-modal-ip"
                                searchId="quick-find-ip"
                                queryKey="products-opt-search"
                                onChange={(items: string[]) => {
                                  setFieldValue('included_products', items)
                                }}
                                value={values.included_products}
                                queryEnabled={!!shop?.shop_id}
                                shopId={shop?.shop_id}
                              />
                            ) : (
                              <CollectionSelector
                                id="quick-find-modal-ic"
                                searchId="quick-find-modal-ic"
                                queryKey="collections-opt-search"
                                onChange={(items: any[]) => {
                                  setFieldValue('included_collections', items)
                                }}
                                value={values.included_collections}
                                queryEnabled={!!shop?.shop_id}
                                shopId={shop?.shop_id}
                              />
                            )}
                          </div>
                        </div>
                      </section>
                      <div
                        className={`sm:w-full mt-6 ${values.incentive_type === BUY_X_GET_Y
                          ? 'hidden'
                          : 'block'
                          }`}
                      >
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="condition_type"
                        >
                          Requirements
                        </label>
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="condition_type"
                              className="form-radio"
                              onChange={e =>
                                setFieldValue('condition_type', NONE)
                              }
                              checked={
                                values.condition_type === NONE ? true : false
                              }
                            />
                            <span className="text-sm ml-2">None</span>
                          </label>
                        </div>

                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="condition_type"
                              className="form-radio"
                              onChange={e =>
                                setFieldValue('condition_type', VALUE)
                              }
                              checked={
                                values.condition_type === VALUE ? true : false
                              }
                            />
                            <span className="text-sm ml-2">
                              Minimum purchase amount
                            </span>
                          </label>
                        </div>
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="condition_type"
                              className="form-radio"
                              onChange={e =>
                                setFieldValue('condition_type', COUNT)
                              }
                              checked={
                                values.condition_type === COUNT ? true : false
                              }
                            />
                            <span className="text-sm ml-2">
                              Minimum quantity of items
                            </span>
                          </label>
                        </div>
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="condition_type"
                              className="form-radio"
                              onChange={e =>
                                setFieldValue('condition_type', COVERAGE)
                              }
                              checked={
                                values.condition_type === COVERAGE
                                  ? true
                                  : false
                              }
                            />
                            <span className="text-sm ml-2">
                              Minimum quantity of distinct eligible items
                            </span>
                          </label>
                        </div>
                        <div className="w-1/2">
                          {!(values.condition_type === NONE) && (
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="condition_value_*"
                            >
                              {values.condition_type === COUNT ||
                                values.condition_type === COVERAGE
                                ? 'Quantity'
                                : 'Amount'}
                            </label>
                          )}
                          <div
                            className={`relative ${values.condition_type === COUNT ||
                              values.condition_type === COVERAGE ||
                              values.condition_type === '' ||
                              values.condition_type === NONE
                              ? 'hidden'
                              : 'block'
                              }`}
                          >
                            <input
                              id="condition_value_int"
                              className="form-input w-full pl-12"
                              type="text"
                              name="condition_value_int"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.condition_value_int}
                            />
                            <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                              <span className="text-sm text-gray-400 font-medium px-3">
                                GHS
                              </span>
                            </div>
                          </div>
                          <div
                            className={`relative ${values.condition_type === VALUE ||
                              values.condition_type === '' ||
                              values.condition_type === NONE
                              ? 'hidden'
                              : 'block'
                              }`}
                          >
                            <input
                              id="condition_value_money"
                              name="condition_value_money"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.condition_value_money}
                              className="form-input w-full pr-8"
                              step={1}
                              min={1}
                              type="text"
                              placeholder="1"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sm:w-1/2 mt-6">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="customer_eligibility"
                        >
                          Customer Eligibility
                        </label>
                        <select
                          name="customer_eligibility"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.customer_eligibility}
                          id="customer_eligibility"
                          className="form-select block"
                        >
                          <option value="">Please Select</option>
                          <option value="everyone">Everyone</option>
                          <option value="group">
                            Specific group of customers
                          </option>
                          <option value="specific">Specific customers</option>
                        </select>
                      </div>
                      <div>
                        <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1 mt-6">
                          Usage Limits
                        </h2>
                        <div className="flex m-3 items-center w-full">
                          <input
                            id="has_max_global_applications"
                            name="has_max_global_applications"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-checkbox"
                            checked={values.has_max_global_applications}
                            type="checkbox"
                          />
                          <label
                            className="block text-sm ml-2"
                            htmlFor="has_max_global_applications"
                          >
                            Limit the number of times this offer can be applied
                            in total
                          </label>
                        </div>
                        {values.has_max_global_applications ? (
                          <div className="w-1/2">
                            <input
                              id="max_global_applications"
                              name="max_global_applications"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.max_global_applications}
                              className="form-input block m-3"
                              type="number"
                              step={1}
                              min={1}
                              autoComplete="max_global_applications"
                              placeholder="1"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="m-3 flex items-center w-full">
                          <input
                            name="has_max_user_applications"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-checkbox"
                            checked={values.has_max_user_applications}
                            id="has_max_user_applications"
                            type="checkbox"
                          />
                          <label
                            className="block text-sm ml-2"
                            htmlFor="has_max_user_applications"
                          >
                            Limit the number of times this offer can be used per
                            customer
                          </label>
                        </div>
                        {values.has_max_user_applications ? (
                          <div className="w-1/2">
                            <input
                              id="max_user_applications"
                              name="max_user_applications"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.max_user_applications}
                              className="form-input block m-3"
                              type="number"
                              step={1}
                              min={1}
                              autoComplete="max_user_applications"
                              placeholder="1"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="flex m-3 items-center w-full ">
                          <input
                            name="has_max_discount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-checkbox"
                            checked={values.has_max_discount}
                            id="has_max_discount"
                            type="checkbox"
                          />
                          <label
                            className="block text-sm ml-2"
                            htmlFor="has_max_discount"
                          >
                            Limit the total value of this discount
                          </label>
                        </div>
                        {values.has_max_discount ? (
                          <div className="w-1/2">
                            <input
                              id="max_discount"
                              name="max_discount"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.max_discount}
                              className="form-input block m-3"
                              type="number"
                              step={1}
                              min={1}
                              autoComplete="max_discount"
                              placeholder="1"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </section>
                  <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                    <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                      Active Dates
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="sm:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="start_date"
                        >
                          Start Date
                        </label>
                        <input
                          id="start_date"
                          name="start_date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.start_date}
                          className="form-input w-full"
                          type="date"
                          placeholder="RS6TR"
                        />
                      </div>
                      <div className="sm:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="start_time"
                        >
                          Start time
                        </label>
                        <input
                          id="start_time"
                          name="start_time"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.start_time}
                          className="form-input"
                          type="time"
                          placeholder="217328189902301"
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="sm:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="end_date"
                        >
                          End Date
                        </label>
                        <input
                          id="end_date"
                          name="end_date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.end_date}
                          className="form-input w-full"
                          type="date"
                          placeholder="RS6TR"
                        />
                      </div>
                      <div className="sm:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="end_time"
                        >
                          End time
                        </label>
                        <input
                          id="end_time"
                          name="end_time"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.end_time}
                          className="form-input"
                          type="time"
                          placeholder="217328189902301"
                        />
                      </div>
                    </div>
                  </section>
                  {!discountId && values.type === 'voucher' && (
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                        Voucher
                      </h2>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="incentive_type"
                      >
                        Code type
                      </label>
                      <div className="m-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="code_type"
                            className="form-radio"
                            onChange={e => setFieldValue('code_type', 'single')}
                            checked={values.code_type === 'single'}
                            value={values.code_type}
                          />
                          <span className="text-sm ml-2">Single</span>
                        </label>
                      </div>
                      <div className="m-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="code_type"
                            className="form-radio"
                            onChange={e => setFieldValue('code_type', 'set')}
                            checked={values.code_type === 'set'}
                            value={values.code_type}
                          />
                          <span className="text-sm ml-2">Multi</span>
                        </label>
                      </div>
                      {values.code_type === 'single' && (
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          <div className="w-full">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="code"
                            >
                              Code
                            </label>
                            <input
                              id="code"
                              name="code"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.code}
                              className="form-input"
                              type="text"
                              placeholder="SPRNGSALE"
                            />
                          </div>
                        </div>
                      )}
                      {values.code_type === 'set' && (
                        <>
                          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="code_length"
                              >
                                Code Length
                              </label>
                              <input
                                id="code_length"
                                name="code_length"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.code_length}
                                className="form-input"
                                type="number"
                                min={1}
                                step={1}
                                max={10}
                                placeholder="1"
                              />
                            </div>
                          </div>
                          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="number_of_codes"
                              >
                                Number of codes
                              </label>
                              <input
                                id="number_of_codes"
                                name="number_of_codes"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.number_of_codes}
                                className="form-input"
                                type="number"
                                min={1}
                                step={1}
                                placeholder="1"
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <div className="sm:w-1/2 mt-6">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="code_usage"
                        >
                          Usage
                        </label>
                        <select
                          name="code_usage"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.code_usage}
                          id="code_usage"
                          className="form-select w-full block"
                        >
                          <option value="">Please Select</option>
                          <option value="multi_use">
                            Can be used multiple times by multiple customers
                          </option>
                          <option value="single_use">
                            Can be used once by one customer
                          </option>
                          <option value="once_per_customer">
                            Can only be used once per customer
                          </option>
                        </select>
                      </div>
                    </section>
                  )}
                  <section className="hidden rounded bg-white shadow overflow-hidden p-3 mb-10">
                    <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                      Search Engine Preview
                      <p className="text-sm header leading-snug text-gray-500 font-light mb-1">
                        This shows how your product shows up in search results
                        like Google
                      </p>
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="page_title"
                        >
                          Page Title
                        </label>
                        <input
                          id="page_title"
                          name="page_title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.page_title}
                          className="form-input"
                          type="text"
                          autoComplete="product-title"
                          placeholder="wearhebron.com/chilled-beer"
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="page_description"
                        >
                          Page Description
                        </label>
                        <textarea
                          id="page_description"
                          name="page_description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.page_description}
                          className="form-textarea w-full"
                          rows={5}
                          placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full mb-4">
                        <div className="bg-white ml-2">
                          <h2 className="mb-[0px] mt-[25px] font-normal text-purple-700">
                            Wearhebron | Bikershorts
                          </h2>
                          <a
                            href="https://reoplex.com"
                            className="mb-[0px] text-green-600 text-sm"
                          >
                            https://www.wearhebron.com/products/bikershorts
                          </a>
                          <button className="text-green-600">▼</button>
                          <p className="w-full h-12 text-gray-600 line-clamp-2">
                            A mutual exclusion (mutex) is a program object that
                            prevents simultaneous access to a shared resource.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <footer>
                <div className="flex flex-col py-5">
                  <div className="flex self-end">
                    <button
                      onClick={() => navigate('/shop/discounts')}
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
    </div>
  );
};
export default DiscountForm;
