import { useState } from 'react';
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
    <>
      <Formik
        initialValues={{
          title: '',
          description: '',
          is_parent: false,
          shipping_required: false,
          track_quantity: true,
          quantity: 0,
          type: '',
          collections: [],
          stock_records: {},
          images: [],
          tags: [],
          vendor: '',
          channels: [],
          template_suffix: 'product',
          price: '',
          compare_at_price: '',
          cost_per_item: '',
          sku: '',
          barcode: '',
          unlimited: '',
          weight: '',
          length: '',
          wdith: '',
          height: '',
          option_one: '',
          option_one_values: [],
          option_two: '',
          option_two_values: [],
          option_three: '',
          option_three_values: [],
          locations: [],
          comb_options: [],
          //TODO: set the file IDs to the images value after they have been uploaded
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
          <div className="flex-grow">
            <div class="p-8 grid grid-cols-1 divide-y-1 divide-black md:grid-cols-3 gap-y-6 gap-x-6">
              <div class="md:col-span-2">
                <section className="rounded bg-white shadow overflow-hidden p-3">
                  <h2 className="text-sm header  leading-snug text-gray-800 font-bold mb-1">
                    Product Details
                  </h2>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="w-full">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        id="title"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        className="form-input"
                        type="text"
                        autoComplete="product-title"
                        placeholder="Chilled beer"
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        style={{ height: '14rem', marginBottom: '3rem' }}
                      />
                    </div>
                  </div>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="w-full">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="type"
                      >
                        Type
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
                        <option value="SITE">Automatic</option>
                        <option value="VOUCHER">Manual</option>
                      </select>
                    </div>
                  </div>
                </section>
              </div>
              <div class="md:col-span-2">
                <section className="rounded bg-white shadow overflow-hidden p-3">
                  <h2 className="text-sm header  leading-snug text-gray-800 font-bold mb-1">
                    Incentive
                  </h2>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="w-full">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="incentive_type"
                      >
                        Type
                      </label>
                      <select
                        name="incentive_type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.incentive_type}
                        id="incentive_type"
                        className="form-select block"
                      >
                        <option value="">Please Select</option>
                        <option value="Percentage">
                          Discount is a percentage off of the product's value
                        </option>
                        <option value="Absolute">
                          Discount is a fixed amount off of the product's value
                        </option>
                        <option value="MultiBuy">
                          Discount is to give the cheapest product for free
                        </option>
                        <option value="FixedPricePerProduct">
                          Discount is a fixed amount off of each product's value
                          that match condition
                        </option>
                      </select>
                    </div>
                  </div>
                </section>
              </div>
              <div class="md:col-span-2">
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
                        allowMultiple={true}
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
                <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                  <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                    Type
                  </h2>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="sm:w-1/2">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <input
                        id="price"
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        className="form-input"
                        type="text"
                        placeholder="GHS 0.00"
                      />
                    </div>
                    <div className="sm:w-1/2">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="compare_at_price"
                      >
                        Compare at price
                      </label>
                      <input
                        id="compare_at_price"
                        name="compare_at_price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.compare_at_price}
                        className="form-input"
                        type="text"
                        placeholder="GHS 0.00"
                      />
                    </div>
                  </div>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="sm:w-1/2">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="cost_per_item"
                      >
                        Cost per item
                      </label>
                      <input
                        id="cost_per_item"
                        name="cost_per_item"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cost_per_item}
                        className="form-input"
                        type="text"
                        placeholder="GHS 0.00"
                      />
                    </div>
                    <div className="sm:w-1/2">
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
                      />
                    </div>
                  </div>
                </section>
                <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                  <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                    Inventory
                  </h2>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="sm:w-1/2">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="sku"
                      >
                        SKU (Stock Keeping Unit)
                      </label>
                      <input
                        id="sku"
                        name="sku"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sku}
                        className="form-input"
                        type="text"
                        placeholder="RS6TR"
                      />
                    </div>
                    <div className="sm:w-1/2">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="barcode"
                      >
                        Barcode (ISBN, UPC, GTIN, etc)
                      </label>
                      <input
                        id="barcode"
                        name="barcode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.barcode}
                        className="form-input"
                        type="text"
                        placeholder="217328189902301"
                      />
                    </div>
                  </div>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="flex items-center w-full">
                      <input
                        id="track_quantity"
                        name="track_quantity"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.track_quantity}
                        type="checkbox"
                      />
                      <label
                        className="block text-sm ml-2"
                        htmlFor="track_quantity"
                      >
                        Track quantity
                      </label>
                    </div>
                    <div className=" flex items-center w-full">
                      <input
                        name="unlimited"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.unlimited}
                        id="unlimited"
                        type="checkbox"
                      />
                      <label className="block text-sm ml-2" htmlFor="unlimited">
                        Continue selling when out of stock
                      </label>
                    </div>
                  </div>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="sm:w-1/2">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="quantity"
                      >
                        Quantity
                      </label>
                      <input
                        id="quantity"
                        name="quantity"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.quantity}
                        className="form-input"
                        type="number"
                        step={1}
                        min={0}
                        placeholder="10"
                      />
                    </div>
                  </div>
                </section>
                <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                  <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                    Shipping & Delivery
                  </h2>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="flex items-center w-full">
                      <input
                        name="shipping_required"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.shipping_required}
                        id="shipping_required"
                        type="checkbox"
                      />
                      <label
                        className="block text-sm ml-2"
                        htmlFor="shipping_required"
                      >
                        This is a physical product
                      </label>
                    </div>
                  </div>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="sm:w-1/2">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="weight"
                      >
                        Weight
                      </label>
                      <input
                        id="weight"
                        name="weight"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.weight}
                        className="form-input"
                        type="number"
                        step={0.1}
                        min={0}
                        autoComplete="weight"
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
                          className="mb-[0px] text-green-600"
                        >
                          https://www.wearhebron.com/products/bikershorts
                        </a>
                        <button className="text-green-600">▼</button>
                        <p className="w-full h-8 text-gray-600">
                          A mutual exclusion (mutex) is a program object that
                          prevents simultaneous access to a shared resource.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default DiscountForm;
