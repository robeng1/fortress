import React, { useState } from "react"
import toast from "react-hot-toast"
import { Formik } from "formik"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { useMutation, useQueryClient } from "react-query"
import { request, ResponseError } from "utils/request"
import { fortressURL } from "endpoints/urls"
import { WeightBasedRateType } from "typings/rates/weight-based-rate"
import { ItemBasedRateType } from "typings/rates/item-based-rate"
import { modelOptions, ShippingRateModelOption } from "data/select"
import { sToCurrency } from "utils/money"
import { rateToIB, rateToWB, rawToRate } from "./mappers"
import useShop from "hooks/use-shop"
import { Loading } from "components/blocks/backdrop"
import TagInput from "components/blocks/tag-input"

const animatedComponents = makeAnimated()

export interface RateType {
  shop_id?: string
  model?: ShippingRateModelOption
  name?: string
  description?: string
  cities?: string[]
  price_per_order_amt: string
  price_per_weight_amt: string
  price_per_item_amt: string
  free_shipping_threshold: string
}

function RatesForm({ handleShow, rate }) {
  const queryClient = useQueryClient()
  const { shop } = useShop()
  const wbrRequestURL = `${fortressURL}/shops/${shop?.shop_id}/wbrs`
  const ibrRequestURL = `${fortressURL}/shops/${shop?.shop_id}/ibrs`
  const [rateId, setRateId] = useState(rate?.rate_id)

  const initialValues: RateType = {
    ...rawToRate(rate),
    shop_id: shop?.shop_id,
  }

  // create the weight based rate
  const { mutate: createWBRate, isLoading: isCreatingWBRate } = useMutation(
    (payload: WeightBasedRateType) =>
      request(wbrRequestURL, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newRate: WeightBasedRateType) => {
        setRateId(newRate.rate_id)
        queryClient.invalidateQueries(["weight-based-rates", shop?.shop_id])
        toast.success("Rate created successfully")
      },
      onError: (e: ResponseError) => {
        toast.error("Rate creation failed due to " + e.message)
      },
    }
  )

  // update the weight based rate
  const { mutate: updateWBRate, isLoading: isUpdatingWBRate } = useMutation(
    (payload: WeightBasedRateType) =>
      request(`${wbrRequestURL}/${rateId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newRate: WeightBasedRateType) => {
        setRateId(newRate.rate_id)
        queryClient.invalidateQueries(["weight-based-rates", shop?.shop_id])
        toast("Rate created successfully")
      },
      onError: (e: ResponseError) => {
        toast("Rate creation failed due to " + e.message)
      },
    }
  )

  // create the weight based rate
  const { mutate: createIBRate, isLoading: isCreatingIBRate } = useMutation(
    (payload: ItemBasedRateType) =>
      request(ibrRequestURL, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newRate: ItemBasedRateType) => {
        setRateId(newRate.rate_id)
        queryClient.invalidateQueries(["item-based-rates", shop?.shop_id])
        toast("Rate created successfully")
      },
      onError: (e: ResponseError) => {
        toast("Rate creation failed due to " + e.message)
      },
    }
  )

  // update the item based rate
  const { mutate: updateIBRate, isLoading: isUpdatingIBRate } = useMutation(
    (payload: ItemBasedRateType) =>
      request(`${ibrRequestURL}/${rateId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newRate: ItemBasedRateType) => {
        setRateId(newRate.rate_id)
        queryClient.invalidateQueries(["item-based-rates", shop?.shop_id])
        toast("Rate created successfully")
      },
      onError: (e: ResponseError) => {
        toast("Rate creation failed due to " + e.message)
      },
    }
  )

  return (
    <div>
      <Loading
        open={
          isCreatingIBRate ||
          isUpdatingIBRate ||
          isCreatingWBRate ||
          isUpdatingWBRate
        }
      />
      <Formik
        enableReinitialize
        initialValues={{ ...initialValues }}
        onSubmit={(values, { setSubmitting }) => {
          if (!rateId || rateId === "") {
            if (values.model?.value === "WEIGHT_BASED") {
              createWBRate(rateToWB(values))
            } else {
              createIBRate(rateToIB(values))
            }
          } else {
            if (values.model?.value === "ITEM_BASED") {
              updateWBRate(rateToWB(values))
            } else {
              updateIBRate(rateToIB(values))
            }
          }

          setSubmitting(false)
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
          <div className="w-full flex-grow">
            {/* Panel body */}
            <div className="md:p-6 p-4 space-y-6">
              <h2 className="text-2xl text-gray-500 font-bold mb-5">Rates</h2>
              <section>
                <h3 className="text-xl leading-snug text-gray-500 font-bold mb-1">
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
                      onChange={(option) =>
                        setFieldValue(
                          "model",
                          option as ShippingRateModelOption
                        )
                      }
                      components={animatedComponents}
                      options={modelOptions}
                      className="w-full"
                    />
                  </div>
                </div>
              </section>
              {values.model && values.model.value === "WEIGHT_BASED" && (
                <>
                  <section className="sm:flex w-full sm:items-center md:w-1/2 align-middle items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3">
                    <div className="w-full md:w-1/2 sm:w-full">
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
                        onBlur={(event) =>
                          setFieldValue(
                            "price_per_order_amt",
                            sToCurrency(event.currentTarget.value).toString()
                          )
                        }
                        value={values.price_per_order_amt}
                        className="form-input w-full"
                        type="text"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="md:1/5 self-center text-lg text-center">
                      <h1>+</h1>
                    </div>
                    <div className="w-full md:w-1/2 sm:w-full">
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
                        onBlur={(event) =>
                          setFieldValue(
                            "price_per_weight_amt",
                            sToCurrency(event.currentTarget.value).toString()
                          )
                        }
                        value={values.price_per_weight_amt}
                        className="form-input w-full"
                        type="text"
                        placeholder="1.00"
                      />
                    </div>
                  </section>
                </>
              )}
              {values.model && values.model.value === "ITEM_BASED" && (
                <>
                  <section className="sm:flex w-full sm:items-center md:w-1/2 align-middle items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3">
                    <div className="w-full md:w-2/5 sm:w-full">
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
                        onBlur={(event) =>
                          setFieldValue(
                            "price_per_order_amt",
                            sToCurrency(event.currentTarget.value).toString()
                          )
                        }
                        value={values.price_per_order_amt}
                        className="form-input w-full"
                        type="text"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="self-center w-1/5 text-lg text-center">
                      <h1>+</h1>
                    </div>
                    <div className="w-full md:w-2/5">
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
                        onBlur={(event) =>
                          setFieldValue(
                            "price_per_item_amt",
                            sToCurrency(event.currentTarget.value).toString()
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
                        onBlur={(event) =>
                          setFieldValue(
                            "free_shipping_threshold",
                            sToCurrency(event.currentTarget.value).toString()
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
              {values.model && values.model.value === "WEIGHT_BANDED" && (
                <section>Render weight banded model form</section>
              )}
              {values.model && values.model.value === "PRICE_BANDED" && (
                <section>Render price banded model form</section>
              )}
              <div className="w-full md:w-1/2 sm:w-full">
                <div className="w-full">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="cities"
                  >
                    Regions/Cities
                  </label>
                  <TagInput
                    id="cities"
                    name="cities"
                    placeholder=" Eg. Accra, Kumasi, Kasoa"
                    values={values.cities}
                    onChange={(cities) => setFieldValue("cities", cities)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <footer>
              <div className="flex flex-col px-6 py-5">
                <div className="flex self-end">
                  <button
                    onClick={() => handleShow(false)}
                    className="btn border-teal-600 hover:border-gray-700 text-gray-600 bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSubmit()
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
  )
}

export default RatesForm
