import * as React from 'react';
import Divider from '@mui/material/Divider';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

import { Formik } from 'formik';
import ReactQuill from 'react-quill';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'css/filepond.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const DiscountForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          description: '',
          page_title: '',
          page_description: '',
          type: 'site',
          all_products: false,
          specific_products: false,
          included_products: [],
          excluded_products: [],
          included_collections: [],
          incentive_type: '',
          buy_x_get_y_cond_value: '',
          conditon_value_money: '',
          buy_x_get_y_cond_range_type: '',
          buy_x_get_y_cond_range_values: '',
          buy_x_get_y_cond_value_type: 'quantity',
          buy_x_get_y_ben_range_type: '',
          buy_x_get_y_ben_range_values: '',
          buy_x_get_y_ben_value_int: '',
          buy_x_get_y_discounted_value_type: '',
          requirements: '',
          value: '',
          applies_to: '',
          exclusive: true,
          customer_eligibility: '',
          has_max_global_applications: false,
          has_max_user_applications: false,
          has_max_discount: false,
          max_basket_applications: 1,
          max_discount: '',
          max_user_applications: '',
          max_global_applications: '',
          start_date: '',
          start_time: '',
          end_date: '',
          end_time: '',
          files: [],
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
          <div className="flex-grow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6">
              <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
                <section className="rounded bg-white shadow overflow-hidden p-3">
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="w-full">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="title"
                      >
                        Discount Title
                      </label>
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
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <ReactQuill
                        theme="snow"
                        name="description"
                        onChange={e => setFieldValue('description', e)}
                        value={values.description}
                        style={{
                          maxHeight: '14rem',
                        }}
                      />
                    </div>
                  </div>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="w-full">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="type"
                      >
                        Discount Type
                      </label>
                      <select
                        name="type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.type}
                        id="type"
                        className="form-select block"
                      >
                        <option value="">Please Select</option>
                        <option value="site">Automatic</option>
                        <option value="voucher">Manual</option>
                      </select>
                    </div>
                  </div>
                </section>
              </div>
              <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
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
                            onChange={e =>
                              setFieldValue('incentive_type', 'percentage')
                            }
                            checked={values.incentive_type === 'percentage'}
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
                            onChange={e =>
                              setFieldValue('incentive_type', 'fixed_amount')
                            }
                            checked={values.incentive_type === 'fixed_amount'}
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
                            onChange={e =>
                              setFieldValue('incentive_type', 'multibuy')
                            }
                            checked={values.incentive_type === 'multibuy'}
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
                            onChange={e =>
                              setFieldValue('incentive_type', 'fixed_price')
                            }
                            checked={values.incentive_type === 'fixed_price'}
                            value={values.incentive_type}
                          />
                          <span className="text-sm ml-2">Fixed Price</span>
                        </label>
                      </div>
                      <div className="m-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="incentive_type"
                            className="form-radio"
                            onChange={e =>
                              setFieldValue(
                                'incentive_type',
                                'fixed_price_per_product',
                              )
                            }
                            checked={
                              values.incentive_type ===
                              'fixed_price_per_product'
                            }
                            value={values.incentive_type}
                          />
                          <span className="text-sm ml-2">
                            Fixed price per product
                          </span>
                        </label>
                      </div>
                      <div className="m-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="incentive_type"
                            className="form-radio"
                            onChange={e =>
                              setFieldValue('incentive_type', 'buy-x-get-y')
                            }
                            checked={values.incentive_type === 'buy-x-get-y'}
                            value={values.incentive_type}
                          />
                          <span className="text-sm ml-2">Buy-X-Get-Y</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
                <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                  <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                    Cover Image
                  </h2>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="w-full">
                      <FilePond
                        files={values.files}
                        onupdatefiles={fileItems => {
                          setFieldValue('files', [
                            ...values.files,
                            ...fileItems,
                          ]);
                        }}
                        credits={{}}
                        allowMultiple={false}
                        maxFiles={1}
                        server={null}
                        instantUpload={false}
                        id="files"
                        name="files"
                        key="files"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                      />
                    </div>
                  </div>
                </section>
                <section
                  className={`rounded bg-white shadow overflow-hidden p-3 mb-10 ${
                    values.incentive_type === 'buy-x-get-y' ? 'block' : 'hidden'
                  }`}
                >
                  <h2 className="block text-lg font-semibold mb-1">
                    Customer buys
                  </h2>
                  <div className="m-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="buy_x_get_y_cond_value_type"
                        className="form-radio"
                        onChange={e =>
                          setFieldValue(
                            'buy_x_get_y_cond_value_type',
                            'quantity',
                          )
                        }
                        checked={
                          values.buy_x_get_y_cond_value_type === 'quantity'
                        }
                        value={values.buy_x_get_y_cond_value_type}
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
                        name="buy_x_get_y_cond_value_type"
                        className="form-radio"
                        onChange={e =>
                          setFieldValue('buy_x_get_y_cond_value_type', 'amount')
                        }
                        checked={
                          values.buy_x_get_y_cond_value_type === 'amount'
                        }
                        value={values.buy_x_get_y_cond_value_type}
                      />
                      <span className="text-sm ml-2">
                        Minimum purchase amount
                      </span>
                    </label>
                  </div>

                  {/* TODO: radios for customer to choose value type */}
                  <div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="buy_x_get_y_cond_value"
                        >
                          {values.buy_x_get_y_cond_value_type === 'quantity'
                            ? 'Quantity'
                            : 'Amount'}
                        </label>
                        <div
                          className={`relative ${
                            values.buy_x_get_y_cond_value_type === 'quantity' ||
                            values.buy_x_get_y_cond_value_type === ''
                              ? 'hidden'
                              : 'block'
                          }`}
                        >
                          <input
                            id="prefix"
                            className="form-input w-full pl-12"
                            type="text"
                          />
                          <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                            <span className="text-sm text-gray-400 font-medium px-3">
                              GHS
                            </span>
                          </div>
                        </div>
                        <div
                          className={`relative ${
                            values.buy_x_get_y_cond_value_type === 'amount' ||
                            values.buy_x_get_y_cond_value_type === ''
                              ? 'hidden'
                              : 'block'
                          }`}
                        >
                          <input
                            id="buy_x_get_y_cond_value"
                            name="buy_x_get_y_cond_value"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.buy_x_get_y_cond_value}
                            className="form-input w-full pr-8"
                            step={1}
                            min={1}
                            type="text"
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
                            htmlFor="buy_x_get_y_cond_range_type"
                          >
                            Any Items from
                          </label>
                          <select
                            name="buy_x_get_y_cond_range_type"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.buy_x_get_y_cond_range_type}
                            id="buy_x_get_y_cond_range_type"
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
                      {values.buy_x_get_y_cond_range_type ===
                      'specific_products' ? (
                        <div className="w-full">
                          <div className="w-full">
                            <div className="flex border-1 rounded">
                              <input
                                type="text"
                                className="form-input w-full"
                                placeholder="Search products..."
                              />
                              <button className="flex items-center justify-center px-4 border-l">
                                <svg
                                  className="w-6 h-6 text-gray-600"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full">
                          <div className="w-full">
                            <div className="flex border-1 rounded">
                              <input
                                type="text"
                                className="form-input w-full"
                                placeholder="Search collections..."
                              />
                              <button className="flex items-center justify-center px-4 border-l">
                                <svg
                                  className="w-6 h-6 text-gray-600"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                <section
                  className={`rounded bg-white shadow overflow-hidden p-3 mb-10 ${
                    values.incentive_type === 'buy-x-get-y' ? 'block' : 'hidden'
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
                          htmlFor="buy_x_get_y_ben_value_int"
                        >
                          Quantity
                        </label>
                        <input
                          id="buy_x_get_y_ben_value_int"
                          name="buy_x_get_y_ben_value_int"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.buy_x_get_y_ben_value_int}
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
                      'specific_products' ? (
                        <div className="w-full">
                          <div className="w-full">
                            <div className="flex border-1 rounded">
                              <input
                                type="text"
                                className="form-input w-full"
                                placeholder="Search products..."
                              />
                              <button className="flex items-center justify-center px-4 border-l">
                                <svg
                                  className="w-6 h-6 text-gray-600"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full">
                          <div className="w-full">
                            <div className="flex border-1 rounded">
                              <input
                                type="text"
                                className="form-input w-full"
                                placeholder="Search collections..."
                              />
                              <button className="flex items-center justify-center px-4 border-l">
                                <svg
                                  className="w-6 h-6 text-gray-600"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
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
                                  'percentage',
                                )
                              }
                              checked={
                                values.buy_x_get_y_discounted_value_type ===
                                'percentage'
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
                                  'free',
                                )
                              }
                              checked={
                                values.buy_x_get_y_discounted_value_type ===
                                'free'
                              }
                              value={values.buy_x_get_y_discounted_value_type}
                            />
                            <span className="text-sm ml-2">Free</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`relative w-1/2 ${
                        values.buy_x_get_y_discounted_value_type === 'free' ||
                        values.buy_x_get_y_cond_value_type === ''
                          ? 'hidden'
                          : 'block'
                      }`}
                    >
                      <input
                        id="buy_x_get_y_cond_value"
                        name="buy_x_get_y_cond_value"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.buy_x_get_y_cond_value}
                        className="form-input w-full pr-8"
                        step={1}
                        min={1}
                        type="text"
                        placeholder="1"
                      />
                      <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                        <span className="text-sm text-gray-400 font-medium px-3">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="rounded bg-white overflow-hidden p-3 mb-10">
                  <div className="sm:col-span-3 md:col-span-3">
                    <section
                      className={`rounded bg-white overflow-hidden p-3 ${
                        values.incentive_type === 'buy-x-get-y' ||
                        values.incentive_type === 'multibuy'
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
                          {values.incentive_type === 'percentage' && (
                            <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                              <span className="text-sm text-gray-400 font-medium px-3">
                                %
                              </span>
                            </div>
                          )}
                          {(values.incentive_type === 'fixed_price' ||
                            values.incentive_type === 'fixed_amount') && (
                            <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                              <span className="text-sm text-gray-400 font-medium px-3">
                                GHS
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Divider />
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
                                  setFieldValue('applies_to', 'all_products')
                                }
                                checked={values.applies_to === 'all_products'}
                                value={values.applies_to}
                              />
                              <span className="text-sm ml-2">All products</span>
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
                                    'specific_products',
                                  )
                                }
                                checked={
                                  values.applies_to === 'specific_products'
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
                                    'specific_collections',
                                  )
                                }
                                checked={
                                  values.applies_to === 'specific_collections'
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
                        className={`${
                          values.applies_to === 'all_products' ||
                          values.applies_to === ''
                            ? 'hidden'
                            : 'block'
                        }`}
                      >
                        <div
                          className={`sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5`}
                        >
                          {values.applies_to === 'specific_products' ? (
                            <div className="w-full">
                              <div className="w-full">
                                <div className="flex border-1 rounded">
                                  <input
                                    type="text"
                                    className="form-input w-full"
                                    placeholder="Search products..."
                                  />
                                  <button className="flex items-center justify-center px-4 border-l">
                                    <svg
                                      className="w-6 h-6 text-gray-600"
                                      fill="currentColor"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full">
                              <div className="w-full">
                                <div className="flex border-1 rounded">
                                  <input
                                    type="text"
                                    className="form-input w-full"
                                    placeholder="Search collections..."
                                  />
                                  <button className="flex items-center justify-center px-4 border-l">
                                    <svg
                                      className="w-6 h-6 text-gray-600"
                                      fill="currentColor"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                    <div
                      className={`sm:w-full mt-6 ${
                        values.incentive_type === 'buy-x-get-y'
                          ? 'hidden'
                          : 'block'
                      }`}
                    >
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="min_requirements"
                      >
                        Requirements
                      </label>
                      <div className="m-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="min_requirements"
                            className="form-radio"
                            onChange={e =>
                              setFieldValue('min_requirements', 'none')
                            }
                            value={
                              values.requirements === 'none' ? true : false
                            }
                          />
                          <span className="text-sm ml-2">None</span>
                        </label>
                      </div>

                      <div className="m-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="min_requirements"
                            className="form-radio"
                            onChange={e =>
                              setFieldValue('min_requirements', 'value')
                            }
                            value={
                              values.requirements === 'value' ? true : false
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
                            name="min_requirements"
                            className="form-radio"
                            onChange={e =>
                              setFieldValue('min_requirements', 'count')
                            }
                            value={
                              values.requirements === 'count' ? true : false
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
                            name="min_requirements"
                            className="form-radio"
                            onChange={e =>
                              setFieldValue('min_requirements', 'coverage')
                            }
                            value={
                              values.requirements === 'coverage' ? true : false
                            }
                          />
                          <span className="text-sm ml-2">
                            Minimum quantity of distinct eligible items
                          </span>
                        </label>
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
                      <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1 mt-6">
                        Usage Limits
                      </h2>
                      <div className="flex m-3 items-center w-full">
                        <input
                          id="has_max_global_applications"
                          name="has_max_global_applications"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-checkbox"
                          value={values.has_max_global_applications}
                          type="checkbox"
                        />
                        <label
                          className="block text-sm ml-2"
                          htmlFor="has_max_global_applications"
                        >
                          Limit the number of times this offer can be applied in
                          total
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
                          value={values.has_max_user_applications}
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
                      <div className="flex m-3 items-center w-full">
                        <input
                          name="has_max_discount"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-checkbox"
                          value={values.has_max_discount}
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
                  <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
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
                <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                  <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                    Search Engine Preview
                    <p className="text-sm header leading-snug text-gray-800 font-light mb-1">
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
                        type="text"
                        multiple
                        rows={5}
                        placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
                      />
                    </div>
                  </div>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="w-full mb-4">
                      <div className="bg-white ml-2">
                        <h2 className="mb-[0px] mt-[25px] font-normal text-blue-700">
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
              <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                <div className="flex self-end md:self-center">
                  <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
                    Cancel
                  </button>
                  <button className="btn bg-blue-900 bg-opacity-100 rounded-lg  text-white ml-3">
                    Save Changes
                  </button>
                </div>
              </div>
            </footer>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default DiscountForm;
