import InputHeader from "components/blocks/input-header"
import { Formik } from "formik"
import React, { useState } from "react"
import { InventoryType } from "typings/inventory/inventory-type"
import { mToCurrency, stom } from "utils/money"

type StockMangerProps = {
  onChange: (e: InventoryType) => void
  currency: string
  stock: InventoryType
}

interface Values {
  compare_at_price: string
  price_excl_tax: string
  cost_per_item: string
  num_in_stock: number
}

const StockManger: React.FC<StockMangerProps> = ({
  stock,
  currency,
  onChange,
}) => {
  const initialValues: Values = {
    compare_at_price: mToCurrency(stock?.compare_at_price).toString(),
    price_excl_tax: mToCurrency(stock?.price_excl_tax).toString(),
    cost_per_item: mToCurrency(stock?.cost_per_item).toString(),
    num_in_stock: stock.num_in_stock ?? 1,
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
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
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
            <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
              Pricing &amp; Inventory
            </h2>
            <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className="sm:w-1/2">
                <InputHeader
                  label="Price"
                  tooltipContent="The actual selling price of this product"
                />
                <input
                  id="price"
                  name="price"
                  onChange={handleChange}
                  onBlur={(e) => {
                    const val = e.target.value as string
                    if (val) {
                      const num = Number.parseFloat(val)
                      if (!isNaN(num)) {
                        setFieldValue("price_excl_tax", num.toFixed(2))
                        onChange({
                          ...stock,
                          price_excl_tax: stom(num, currency),
                        })
                      } else {
                        setFieldValue("price_excl_tax", "0.00")
                      }
                    } else {
                      setFieldValue("price_excl_tax", "0.00")
                    }
                  }}
                  value={values.price_excl_tax}
                  className="form-input w-full md:w-min bg-slate-100"
                  type="text"
                  placeholder="GHS 0.00"
                />
                {touched.price_excl_tax && errors.price_excl_tax && (
                  <div className="text-xs mt-1 text-red-500">
                    {errors.price_excl_tax}
                  </div>
                )}
              </div>

              <div className="sm:w-1/2">
                <InputHeader
                  label="Compare at price"
                  tooltipContent="The original listing price of this product. This is normally displayed as a strikethrough along with the price"
                />
                <input
                  id="compare_at_price"
                  name="compare_at_price"
                  onChange={handleChange}
                  onBlur={(e) => {
                    const val = e.target.value as string
                    if (val) {
                      const num = Number.parseFloat(val)
                      if (!isNaN(num)) {
                        setFieldValue("compare_at_price", num.toFixed(2))
                        onChange({
                          ...stock,
                          compare_at_price: stom(num, currency),
                        })
                      } else {
                        setFieldValue("compare_at_price", "0.00")
                      }
                    } else {
                      setFieldValue("compare_at_price", "0.00")
                    }
                  }}
                  value={values.compare_at_price}
                  className="form-input w-full md:w-min bg-slate-100"
                  type="text"
                  placeholder="GHS 0.00"
                />
                {touched.compare_at_price && errors.compare_at_price && (
                  <div className="text-xs mt-1 text-red-500">
                    {errors.compare_at_price}
                  </div>
                )}
              </div>
            </div>
            <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className="sm:w-1/2">
                <InputHeader
                  label="Cost per item"
                  tooltipContent="The cost of this product. This isn't shown to the customer but helps Reoplex to calculate your margins and give you excellent accounting service"
                />
                <input
                  id="cost_per_item"
                  name="cost_per_item"
                  onChange={handleChange}
                  onBlur={(e) => {
                    const val = e.target.value as string
                    if (val) {
                      const num = Number.parseFloat(val)
                      if (!isNaN(num)) {
                        setFieldValue("cost_per_item", num.toFixed(2))
                        onChange({
                          ...stock,
                          cost_per_item: stom(num, currency),
                        })
                      } else {
                        setFieldValue("cost_per_item", "0.00")
                      }
                    } else {
                      setFieldValue("cost_per_item", "0.00")
                    }
                  }}
                  value={values.cost_per_item}
                  className="form-input w-full md:w-min bg-slate-100"
                  type="text"
                  placeholder="GHS 0.00"
                />
                {touched.cost_per_item && errors.cost_per_item && (
                  <div className="text-xs mt-1 text-red-500">
                    {errors.cost_per_item}
                  </div>
                )}
              </div>
              <div className="sm:w-1/2">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="num_in_stock"
                >
                  Quantity
                </label>
                <input
                  id="num_in_stock"
                  name="num_in_stock"
                  onChange={handleChange}
                  onBlur={(e) => {
                    onChange({ ...stock, num_in_stock: values.num_in_stock })
                  }}
                  value={values.num_in_stock}
                  className="form-input w-full md:w-min bg-slate-100"
                  type="number"
                  step={1}
                  min={0}
                  placeholder="10"
                />
                {touched.num_in_stock && errors.num_in_stock && (
                  <div className="text-xs mt-1 text-red-500">
                    {errors.num_in_stock}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </Formik>
    </>
  )
}

export default StockManger
