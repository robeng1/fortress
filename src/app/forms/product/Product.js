import { useState } from 'react';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import ModalBasic from 'app/components/ModalBasic';
import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import VariantPreviewTable from './Variant';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'css/filepond.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ProductForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedItems, setSelectedItems] = useState([]);
  const [variantModalOpen, setVariantModalOpen] = useState(false);

  const handleSelectedItems = selectedItems => {
    setSelectedItems([...selectedItems]);
  };
  const filteredOpts = (options, alreadySelected) =>
    Object.keys(options)
      .filter(key => !alreadySelected.includes(key))
      .reduce((obj, key) => {
        obj[key] = options[key];
        return obj;
      }, {});

  let options = {
    size: 'Size',
    color: 'Color',
    scent: 'Scent',
    flavour: 'Flavour',
    material: 'Material',
    model: 'Model',
    style: 'Style',
  };
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
            <div className="grid grid-cols-1 divide-y-1 divide-black md:grid-cols-3 gap-y-6 gap-x-6">
              <div className="md:col-span-2">
                <section className="rounded bg-white shadow overflow-auto p-3">
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
                        className="form-input w-full"
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
                        id="description"
                        theme="snow"
                        name="description"
                        onChange={e => setFieldValue('description', e)}
                        value={values.description}
                        style={{
                          paddingBottom: '1rem',
                        }}
                      />
                    </div>
                  </div>
                </section>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-1 md:gap-0 md:content-start md:gap-y-6 md:row-span-2">
                <div className="rounded-lg p-4">
                  <section>
                    <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                      Organization
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="type"
                        >
                          Product Type
                        </label>
                        <select
                          name="type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.type}
                          id="type"
                          className="form-select block w-full"
                        >
                          <option value="">Please Select</option>
                          <option value="GH">Ghana</option>
                          <option value="NG">Nigeria</option>
                          <option value="RW">Rwanda</option>
                          <option value="KY">Kenya</option>
                          <option value="SA">South Africa</option>
                        </select>
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="vendor"
                        >
                          Vendor
                        </label>
                        <input
                          id="vendor"
                          name="vendor"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.vendor}
                          className="form-input w-full"
                          type="text"
                          autoComplete="vendor"
                          placeholder="Nike"
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="collections"
                        >
                          Collections
                        </label>
                        <select
                          id="collections"
                          name="collections"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.collections}
                          className="form-select block w-full"
                        >
                          <option value="">Please Select</option>
                          <option value="GH">Ghana</option>
                          <option value="NG">Nigeria</option>
                          <option value="RW">Rwanda</option>
                          <option value="KY">Kenya</option>
                          <option value="SA">South Africa</option>
                        </select>
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="tags"
                        >
                          Tags
                        </label>
                        <select
                          id="tags"
                          name="tags"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tags}
                          className="form-select block w-full"
                        >
                          <option value="">Please Select</option>
                          <option value="GH">Ghana</option>
                          <option value="NG">Nigeria</option>
                          <option value="RW">Rwanda</option>
                          <option value="KY">Kenya</option>
                          <option value="SA">South Africa</option>
                        </select>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="rounded-lg p-4">
                  <section className="sm:mb-10">
                    <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                      Availability
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="channels"
                        >
                          Channels
                        </label>
                        <select
                          id="channels"
                          name="channels"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.channels}
                          className="form-select block w-full"
                        >
                          <option value="">Please Select</option>
                          <option value="GH">Store</option>
                          <option value="NG">Facebook</option>
                          <option value="RW">Instagram</option>
                          <option value="KY">TikTok</option>
                        </select>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="rounded-lg p-4">
                  <section className="sm:mb-10">
                    <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                      Theme Templates
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="template_suffix"
                        >
                          Template
                        </label>
                        <select
                          id="template_suffix"
                          name="template_suffix"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.template_suffix}
                          className="form-select block w-full"
                        >
                          <option value="">Please Select</option>
                          <option value="GH">Ghana</option>
                          <option value="NG">Nigeria</option>
                          <option value="product">product</option>
                        </select>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="md:col-span-2">
                <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                  <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                    Product Images
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
                        allowMultiple={true}
                        maxFiles={6}
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
                    Pricing
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
                        className="form-checkbox"
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
                        className="form-checkbox"
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
                        className="form-checkbox"
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
                  <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-8">
                    Variants
                  </h2>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="flex items-center w-full">
                      <input
                        name="is_parent"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.is_parent}
                        id="is_parent"
                        className="form-checkbox"
                        type="checkbox"
                      />
                      <label className="block text-sm ml-2" htmlFor="is_parent">
                        This product has multiple options, like different sizes
                        or colors
                      </label>
                    </div>
                  </div>
                  {values.is_parent ? (
                    <>
                      <div className="w-full block border-1 border-black mt-4"></div>
                      <h2 className="text-sm uppercase leading-snug text-gray-800 font-medium mb-1">
                        Options
                      </h2>
                      <div>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          <div className="sm:w-1/5 md:w-1/5">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="option_one"
                            >
                              Option 1
                            </label>
                            <select
                              id="option_one"
                              name="option_one"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.option_one}
                              className="form-select block"
                            >
                              {Object.entries(
                                filteredOpts(options, [
                                  values.option_two,
                                  values.option_three,
                                ]),
                              ).map(([k, v], i) => (
                                <option key={`${k}-${i}-option_one`} value={k}>
                                  {v}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="sm:w-4/5 md:w-4/5">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="option_one_values"
                            >
                              Option 1 Values
                            </label>
                            <input
                              id="option_one_values"
                              name="option_one_values"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.option_one_values}
                              className="form-input capitalize"
                              type="text"
                              placeholder="Red, Yellow"
                            />
                          </div>
                        </div>

                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          <div className="sm:w-1/5 md:w-1/5">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="option_two"
                            >
                              Option 2
                            </label>
                            <select
                              id="option_two"
                              name="option_two"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.option_two}
                              className="form-select block"
                            >
                              {Object.entries(
                                filteredOpts(options, [
                                  values.option_one,
                                  values.option_three,
                                ]),
                              ).map(([k, v], i) => (
                                <option key={`${k}-${i}-option_two`} value={k}>
                                  {v}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="sm:w-4/5 md:w-4/5">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="option_two_values"
                            >
                              Option 2 Values
                            </label>
                            <input
                              id="option_two_values"
                              name="option_two_values"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.option_two_values}
                              className="form-input capitalize"
                              type="text"
                              placeholder="Red, Yellow"
                            />
                          </div>
                        </div>
                        <div className="rounded bg-white shadow p-3 mt-4 mb-10">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              setVariantModalOpen(true);
                            }}
                            className="text-sm uppercase leading-snug text-gray-800 font-bold mb-5"
                          >
                            Edit Variants
                          </button>
                          <ModalBasic
                            id="feedback-modal"
                            modalOpen={variantModalOpen}
                            setModalOpen={setVariantModalOpen}
                            title="Variants"
                          >
                            <h2 className="text-sm uppercase text-center leading-snug text-gray-800 font-medium mb-5">
                              East Coast Warehouse
                            </h2>
                            <VariantPreviewTable
                              headings={[
                                values.option_one,
                                values.option_two,
                                // values.option_three,
                              ]}
                              selectedItems={handleSelectedItems}
                            />
                            <h2 className="text-sm uppercase text-justify leading-snug text-gray-800 font-medium mt-5 mb-5">
                              Home Office
                            </h2>
                            <VariantPreviewTable
                              headings={[
                                values.option_one,
                                values.option_two,
                                // values.option_three,
                              ]}
                              selectedItems={handleSelectedItems}
                            />
                          </ModalBasic>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
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
                        Page Meta Title
                      </label>
                      <input
                        id="page_title"
                        name="page_title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.page_title}
                        className="form-input w-full"
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
                        Page Meta Description
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

export default ProductForm;
