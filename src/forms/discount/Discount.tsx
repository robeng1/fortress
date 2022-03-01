import * as React from 'react';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import union from 'lodash/union';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Divider from '@mui/material/Divider';
import { Formik } from 'formik';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';
import { fortressURL } from 'endpoints/urls';
import DropTarget from '@uppy/drop-target';
import { DiscountType } from 'models/discount/discount-type';
import SelectableResultSearchModal from 'components/common/modal-searcher';
import { request, ResponseError } from 'utils/request';
import useShop from 'hooks/use-shop';
import { initialValues } from './values';
import {
  discountToValues,
  valuesToDiscount,
  handleSelectedResults,
} from './utils';

// styles
import '@uppy/status-bar/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

// TODO: (romeo) refactor duplicated pieces of logic
// FIXME:(romeo) BADLY WRITTEN SPAGHETTI CODE AHEAD. NEEDS REFACTORING & SIMPLICATION
const DiscountForm = ({ handleShow, id }) => {
  const qc = useQueryClient();
  const { shop } = useShop();
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/offers`;
  const [discountId, setDiscountId] = useState(id);

  // query for getting the discount
  const { data: discount, isLoading } = useQuery<DiscountType>(
    ['discount', discountId],
    async () => await request(`${requestURL}/${discountId}`),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId,
      keepPreviousData: true,
    },
  );

  const [image, setImage] = useState(discount?.image?.image_url);

  // for normal offers benefit range
  const [searchInclProductsOpen, setSearchInclProductsOpen] = useState(false);
  const [searchInclCollectionsOpen, setSearchInclCollectionsOpen] =
    useState(false);

  // for condition range
  const [searchBXCRInclProductsOpen, setSearchBXCRInclProductsOpen] =
    useState(false);
  const [searchBXCRInclCollectionsOpen, setSearchBXCRInclCollectionsOpen] =
    useState(false);

  // for benefit range
  const [searchBxBRInclProductsOpen, setSearchBxBRInclProductsOpen] =
    useState(false);
  const [searchBxBRInclCollectionsOpen, setSearchBxBRInclCollectionsOpen] =
    useState(false);

  // this is only useful for controlling which queries should be
  // enabled to prevent react-query from running all the quries
  const [isBx, setIsBx] = useState<boolean>(false);

  // keep track of product & collection IDs included in range for
  // non buy-x-get-y discounts
  const [inclPids, setInclPids] = useState<string[]>([]);
  const [inclCids, setInclCids] = useState<string[]>([]);

  // keep track of product & collection IDs included in range for
  // buy-x-get-y discounts
  // condition ids
  const [bxCondInclPids, setBxCondInclPids] = useState<string[]>([]);
  const [bxCondInclCids, setBxCondInclCids] = useState<string[]>([]);

  // benefit ids
  const [bxBInclPids, setBxBInclPids] = useState<string[]>([]);
  const [bxBInclCids, setBxBInclCids] = useState<string[]>([]);

  // create the discount
  const { mutate: createDiscount, isLoading: isCreatingDiscount } = useMutation(
    (payload: DiscountType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newDiscount: DiscountType) => {
        setDiscountId(newDiscount.discount_id);
        qc.setQueryData(['discount', discountId], newDiscount);
        toast('Discount created successfully');
      },
      onError: (e: ResponseError) => {
        toast(e.message);
      },
    },
  );

  // update the update
  const { mutate: updateDiscount, isLoading: isUpdatingDiscount } = useMutation(
    (payload: DiscountType) =>
      request(`${requestURL}/${discountId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newDiscount: DiscountType) => {
        setDiscountId(newDiscount.discount_id);
        qc.setQueryData(['discount', discountId], newDiscount);
        toast('Discount updated successfully');
      },
      onError: (e: ResponseError) => {
        toast('Discount could not be updated due to' + e.message);
      },
    },
  );

  const onUploadComplete = result => {
    const url = result.successful[0].uploadURL;
    setImage(url);
  };

  const uppy = React.useMemo(() => {
    return new Uppy({
      id: 'discount-form',
      autoProceed: false,
      restrictions: {
        maxFileSize: 15 * 1024 * 1024,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*', 'video/*'],
      },
    })
      .use(DropTarget, { target: document.body })
      .on('complete', onUploadComplete)
      .use(Tus, { endpoint: 'https://storage.reoplex.com/files/' });
  }, []);

  const addFiles = files => {
    files.forEach(e => {
      uppy.addFile({
        name: e.name,
        type: e.type,
        data: e.blob, // changed blob -> data
      });
    });

    Object.keys(uppy.state.files).forEach(fileID => {
      uppy.setFileState(fileID, {
        progress: { uploadComplete: true, uploadStarted: true },
      });
    });
  };

  React.useEffect(() => {
    // assuming the image lives on a server somewhere
    discount?.image?.image_url &&
      discount?.image?.image_url !== '' &&
      discount?.image?.image_url !== undefined &&
      fetch(discount?.image?.image_url)
        .then(response => response.blob()) // returns a Blob
        .then(blob => {
          addFiles([
            {
              name: discount?.slug,
              type: blob.type,
              data: blob, // changed blob -> data
            },
          ]);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discount]);

  React.useEffect(() => {
    return () => uppy.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // options search URLs
  const collectionOptionSearchURL = `${fortressURL}/shops/${shop?.shop_id}/collections/option-search`;
  const productOptionSearchURL = `${fortressURL}/shops/${shop?.shop_id}/products/option-search`;

  const productQueryComposer = (term: string): Record<string, any> => {
    return { limit: 15, term, shop_id: shop?.shop_id, type: 'product' };
  };

  const collectionQueryComposer = (term: string): Record<string, any> => {
    return { limit: 15, term, shop_id: shop?.shop_id, type: 'collection' };
  };

  // queries to display selected products and/or collections
  // gets the selected products for them to be displayed
  const selectedProductsQuery = (products: string[]): Record<string, any> => {
    const filters = products.map(p => `product_id=${p}`);
    const dsl = { filter: [filters] };
    const term = '';
    return { dsl, term };
  };

  // gets the selected collections for them to be displayed
  const selectedCollectionsQuery = (
    collections: string[],
  ): Record<string, any> => {
    const filters = collections.map(c => `collection_id=${c}`);
    const dsl = { filter: [filters] };
    const term = '';
    return { dsl, term };
  };

  // query for getting included products
  const {
    data: { result: includedProducts },
  } = useQuery<any>(
    ['included-products', discountId],
    async () =>
      await request(productOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedProductsQuery(inclPids),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId && inclPids.length > 0 && !isBx,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  // query for getting included collections
  const {
    data: { result: includedCollections },
  } = useQuery<any>(
    ['included-collections', discountId],
    async () =>
      await request(collectionOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedCollectionsQuery(inclCids),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId && inclCids.length > 0 && !isBx,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  // query for getting included products for a condition's range
  const {
    data: { result: condRangeIncludedProducts },
  } = useQuery<any>(
    ['cond-range-included-products', discountId],
    async () =>
      await request(productOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedProductsQuery(bxCondInclPids),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId && bxCondInclPids.length > 0 && isBx,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  // query for getting included collections for a condition's range
  const {
    data: { result: condRangeIncludedCollections },
  } = useQuery<any>(
    ['cond-range-included-collections', discountId],
    async () =>
      await request(collectionOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedCollectionsQuery(bxCondInclCids),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId && bxCondInclCids.length > 0 && isBx,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  // query for getting included products for a condition's range
  const {
    data: { result: benRangeIncludedProducts },
  } = useQuery<any>(
    ['ben-range-included-products', discountId],
    async () =>
      await request(productOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedProductsQuery(bxBInclPids),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId && bxBInclPids.length > 0 && isBx,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  // query for getting included collections for a condition's range
  const {
    data: { result: benRangeIncludedCollections },
  } = useQuery<any>(
    ['ben-range-included-collections', discountId],
    async () =>
      await request(collectionOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedCollectionsQuery(bxBInclCids),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId && bxBInclCids.length > 0 && isBx,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  return (
    <div className="w-full">
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={isCreatingDiscount || isUpdatingDiscount || isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Formik
          initialValues={{
            ...initialValues,
            ...discountToValues(discount),
          }}
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
            <div className="flex-grow w-full mx-auto self-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-2">
                <div className="col-span-3 md:col-span-2">
                  <section className="rounded bg-white shadow p-3">
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
                    {/* <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="description"
                          >
                            Description
                          </label>
                          <Editor
                            initialValue=""
                            init={{
                              skin: false,
                              content_css: false,
                              height: 500,
                              menubar: false,
                              plugins: ['link image', 'table paste'],
                              toolbar:
                                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            }}
                            value={values.description}
                            onEditorChange={content =>
                              setFieldValue('description', content)
                            }
                          />
                        </div>
                      </div> */}
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
                              onChange={e => {
                                setFieldValue('incentive_type', 'percentage');
                                setIsBx(false);
                              }}
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
                              onChange={e => {
                                setFieldValue(
                                  'incentive_type',
                                  'fixed_discount',
                                );
                                setIsBx(false);
                              }}
                              checked={
                                values.incentive_type === 'fixed_discount'
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
                                setFieldValue('incentive_type', 'multibuy');
                                setIsBx(false);
                              }}
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
                              onChange={e => {
                                setFieldValue('incentive_type', 'fixed_price');
                                setIsBx(false);
                              }}
                              checked={values.incentive_type === 'fixed_price'}
                              value={values.incentive_type}
                            />
                            <span className="text-sm ml-2">Fixed price</span>
                          </label>
                        </div>
                        {/* <div className="m-3">
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
                      </div> */}
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="incentive_type"
                              className="form-radio"
                              onChange={e => {
                                setFieldValue('incentive_type', 'buy-x-get-y');
                                setIsBx(true);
                              }}
                              checked={values.incentive_type === 'buy-x-get-y'}
                              value={values.incentive_type}
                            />
                            <span className="text-sm ml-2">Buy X Get Y</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
                  <section
                    className={`rounded bg-white shadow overflow-hidden p-3 mb-10 ${
                      values.incentive_type === 'buy-x-get-y'
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
                            setFieldValue('buy_x_get_y_condition_type', 'count')
                          }
                          checked={
                            values.buy_x_get_y_condition_type === 'count'
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
                            setFieldValue('buy_x_get_y_condition_type', 'value')
                          }
                          checked={
                            values.buy_x_get_y_condition_type === 'value'
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
                              'coverage',
                            )
                          }
                          checked={
                            values.buy_x_get_y_condition_type === 'coverage'
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
                            {values.buy_x_get_y_condition_type === 'count' ||
                            values.buy_x_get_y_condition_type === 'coverage'
                              ? 'Quantity'
                              : 'Amount'}
                          </label>
                          <div
                            className={`relative ${
                              values.buy_x_get_y_condition_type === 'count' ||
                              values.buy_x_get_y_condition_type ===
                                'coverage' ||
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
                            className={`relative ${
                              values.buy_x_get_y_condition_type === 'value' ||
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
                        'specific_products' ? (
                          <div className="w-full">
                            <div className="w-full">
                              <div
                                onClick={e => {
                                  e.stopPropagation();
                                  setSearchBXCRInclProductsOpen(
                                    !searchBXCRInclProductsOpen,
                                  );
                                }}
                                className="flex border-1 rounded"
                              >
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
                              <SelectableResultSearchModal
                                id="quick-find-modal-cr"
                                searchId="quick-find-cr"
                                modalOpen={searchBXCRInclProductsOpen}
                                setModalOpen={setSearchBXCRInclProductsOpen}
                                queryURL={productOptionSearchURL}
                                composeQuery={productQueryComposer}
                                matchKey="key"
                                queryKey="products-opt-search"
                                handleResultSelected={(items: any[]) => {
                                  const keys = items.map(item => item['key']);
                                  const nl = union(keys, bxCondInclPids);
                                  handleSelectedResults(
                                    setFieldValue,
                                    'buy_x_get_y_condition_range_keys',
                                  )(nl);
                                  setBxCondInclPids(nl);
                                  qc.invalidateQueries([
                                    'cond-range-included-products',
                                    discountId,
                                  ]);
                                }}
                                alreadySelected={union(
                                  values.buy_x_get_y_condition_range_keys,
                                  bxCondInclPids,
                                )}
                                placeholder="Products"
                                queryEnabled={!!shop?.shop_id}
                              />
                            </div>
                            <div>
                              {condRangeIncludedProducts.map((product: any) => (
                                <div
                                  key={product.key}
                                  className="flex items-center"
                                >
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                      className="h-10 w-10"
                                      src={product.image_url}
                                      alt={product.label}
                                    />
                                  </div>
                                  <div className="ml-4 flex justify-between">
                                    <div className="text-sm font-medium text-gray-900">
                                      {product.label}
                                    </div>
                                    <div
                                      onClick={e => {
                                        e.stopPropagation();
                                        setBxCondInclPids(previousKeys =>
                                          previousKeys.filter(
                                            k => k !== product.key,
                                          ),
                                        );
                                        qc.invalidateQueries([
                                          'cond-range-included-products',
                                          discountId,
                                        ]);
                                      }}
                                      className="text-sm text-gray-500 cursor-pointer"
                                    >
                                      X
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full">
                            <div className="w-full">
                              <div
                                onClick={e => {
                                  e.stopPropagation();
                                  setSearchBXCRInclCollectionsOpen(
                                    !searchBXCRInclCollectionsOpen,
                                  );
                                }}
                                className="flex border-1 rounded"
                              >
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
                              <SelectableResultSearchModal
                                id="quick-find-modal-cr"
                                searchId="quick-find-cr"
                                modalOpen={searchBXCRInclCollectionsOpen}
                                setModalOpen={setSearchBXCRInclCollectionsOpen}
                                queryURL={collectionOptionSearchURL}
                                composeQuery={collectionQueryComposer}
                                matchKey="key"
                                queryKey="collections-opt-search"
                                handleResultSelected={(items: any[]) => {
                                  const keys = items.map(item => item['key']);
                                  const nl = union(keys, bxCondInclCids);
                                  handleSelectedResults(
                                    setFieldValue,
                                    'buy_x_get_y_condition_range_keys',
                                  )(nl);
                                  setBxCondInclCids(nl);
                                  qc.invalidateQueries([
                                    'cond-range-included-collections',
                                    discountId,
                                  ]);
                                }}
                                alreadySelected={union(
                                  values.buy_x_get_y_condition_range_keys,
                                  bxCondInclCids,
                                )}
                                placeholder="Collections"
                                queryEnabled={!!shop?.shop_id}
                              />
                            </div>
                            <div>
                              {condRangeIncludedCollections.map(
                                (collection: any) => (
                                  <div
                                    key={collection.key}
                                    className="flex items-center"
                                  >
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img
                                        className="h-10 w-10"
                                        src={collection.image_url}
                                        alt={collection.label}
                                      />
                                    </div>
                                    <div className="ml-4 flex justify-between">
                                      <div className="text-sm font-medium text-gray-900">
                                        {collection.label}
                                      </div>
                                      <div
                                        onClick={e => {
                                          e.stopPropagation();
                                          setBxCondInclCids(previousKeys =>
                                            previousKeys.filter(
                                              k => k !== collection.key,
                                            ),
                                          );
                                          qc.invalidateQueries([
                                            'cond-range-included-collections',
                                            discountId,
                                          ]);
                                        }}
                                        className="text-sm text-gray-500 cursor-pointer"
                                      >
                                        X
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                  <section
                    className={`rounded bg-white shadow overflow-hidden p-3 mb-10 ${
                      values.incentive_type === 'buy-x-get-y'
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
                        'specific_products' ? (
                          <div className="w-full">
                            <div className="w-full">
                              <div
                                onClick={e => {
                                  e.stopPropagation();
                                  setSearchBxBRInclProductsOpen(
                                    !searchBxBRInclProductsOpen,
                                  );
                                }}
                                className="flex border-1 rounded"
                              >
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
                              <SelectableResultSearchModal
                                id="quick-find-modal-br"
                                searchId="quick-find-br"
                                modalOpen={searchBxBRInclProductsOpen}
                                setModalOpen={setSearchBxBRInclProductsOpen}
                                queryURL={productOptionSearchURL}
                                composeQuery={productQueryComposer}
                                matchKey="key"
                                queryKey="products-opt-search"
                                handleResultSelected={(items: any[]) => {
                                  const keys = items.map(item => item['key']);
                                  const nl = union(keys, bxBInclPids);
                                  handleSelectedResults(
                                    setFieldValue,
                                    'buy_x_get_y_ben_range_keys',
                                  )(nl);
                                  setBxBInclPids(nl);
                                  qc.invalidateQueries([
                                    'ben-range-included-products',
                                    discountId,
                                  ]);
                                }}
                                alreadySelected={union(
                                  values.buy_x_get_y_ben_range_keys,
                                  bxBInclPids,
                                )}
                                placeholder="Products"
                                queryEnabled={!!shop?.shop_id}
                              />
                            </div>
                            <div>
                              {benRangeIncludedProducts.map((product: any) => (
                                <div
                                  key={product.key}
                                  className="flex items-center"
                                >
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                      className="h-10 w-10"
                                      src={product.image_url}
                                      alt={product.label}
                                    />
                                  </div>
                                  <div className="ml-4 flex justify-between">
                                    <div className="text-sm font-medium text-gray-900">
                                      {product.label}
                                    </div>
                                    <div
                                      onClick={e => {
                                        e.stopPropagation();
                                        setBxBInclPids(previousKeys =>
                                          previousKeys.filter(
                                            k => k !== product.key,
                                          ),
                                        );
                                        qc.invalidateQueries([
                                          'ben-range-included-products',
                                          discountId,
                                        ]);
                                      }}
                                      className="text-sm text-gray-500 cursor-pointer"
                                    >
                                      X
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full">
                            <div className="w-full">
                              <div
                                onClick={e => {
                                  e.stopPropagation();
                                  setSearchBxBRInclCollectionsOpen(
                                    !searchBxBRInclCollectionsOpen,
                                  );
                                }}
                                className="flex border-1 rounded"
                              >
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
                              <SelectableResultSearchModal
                                id="quick-find-modal-br"
                                searchId="quick-find-br"
                                modalOpen={searchBxBRInclCollectionsOpen}
                                setModalOpen={setSearchBxBRInclCollectionsOpen}
                                queryURL={collectionOptionSearchURL}
                                composeQuery={collectionQueryComposer}
                                matchKey="key"
                                queryKey="collections-opt-search"
                                handleResultSelected={(items: any[]) => {
                                  const keys = items.map(item => item['key']);
                                  const nl = union(keys, bxBInclCids);
                                  handleSelectedResults(
                                    setFieldValue,
                                    'buy_x_get_y_ben_range_keys',
                                  )(nl);
                                  setBxBInclCids(nl);
                                  qc.invalidateQueries([
                                    'cond-range-included-collections',
                                    discountId,
                                  ]);
                                }}
                                alreadySelected={union(
                                  values.buy_x_get_y_ben_range_keys,
                                  bxBInclCids,
                                )}
                                placeholder="Collections"
                                queryEnabled={!!shop?.shop_id}
                              />
                            </div>
                            <div>
                              {benRangeIncludedCollections.map(
                                (collection: any) => (
                                  <div
                                    key={collection.key}
                                    className="flex items-center"
                                  >
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img
                                        className="h-10 w-10"
                                        src={collection.image_url}
                                        alt={collection.label}
                                      />
                                    </div>
                                    <div className="ml-4 flex justify-between">
                                      <div className="text-sm font-medium text-gray-900">
                                        {collection.label}
                                      </div>
                                      <div
                                        onClick={e => {
                                          e.stopPropagation();
                                          setBxBInclCids(previousKeys =>
                                            previousKeys.filter(
                                              k => k !== collection.key,
                                            ),
                                          );
                                          qc.invalidateQueries([
                                            'ben-range-included-collections',
                                            discountId,
                                          ]);
                                        }}
                                        className="text-sm text-gray-500 cursor-pointer"
                                      >
                                        X
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
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
                                    'fixed_discount',
                                  )
                                }
                                checked={
                                  values.buy_x_get_y_discounted_value_type ===
                                  'fixed_discount'
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
                          className={`form-input w-full pr-8 ${
                            (values.buy_x_get_y_discounted_value_type ===
                              'fixed_price' ||
                              values.buy_x_get_y_discounted_value_type ===
                                'fixed_discount' ||
                              values.buy_x_get_y_discounted_value_type ===
                                'fixed_discount') &&
                            'pl-12'
                          }`}
                          // step={1}
                          // min={1}
                          type="text"
                        />
                        {values.buy_x_get_y_discounted_value_type ===
                          'percentage' && (
                          <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                            <span className="text-sm text-gray-400 font-medium px-3">
                              %
                            </span>
                          </div>
                        )}
                        {(values.buy_x_get_y_discounted_value_type ===
                          'fixed_price' ||
                          values.buy_x_get_y_discounted_value_type ===
                            'fixed_discount' ||
                          values.buy_x_get_y_discounted_value_type ===
                            'fixed_discount') && (
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
                              values.incentive_type === 'fixed_discount') && (
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
                                  <div
                                    onClick={e => {
                                      e.stopPropagation();
                                      setSearchInclProductsOpen(
                                        !searchInclProductsOpen,
                                      );
                                    }}
                                    className="flex border-1 rounded"
                                  >
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
                                  <SelectableResultSearchModal
                                    id="quick-find-modal-ip"
                                    searchId="quick-find-ip"
                                    modalOpen={searchInclProductsOpen}
                                    setModalOpen={setSearchInclProductsOpen}
                                    queryURL={productOptionSearchURL}
                                    composeQuery={productQueryComposer}
                                    matchKey="key"
                                    queryKey="products-opt-search"
                                    handleResultSelected={(items: any[]) => {
                                      const keys: string[] = items.map(
                                        item => item['key'],
                                      );
                                      const nl = union(keys, inclPids);
                                      handleSelectedResults(
                                        setFieldValue,
                                        'included_products',
                                      )(nl);
                                      setInclPids(nl);
                                      qc.invalidateQueries([
                                        'included-products',
                                        discountId,
                                      ]);
                                    }}
                                    alreadySelected={union(
                                      values.included_products,
                                      inclPids,
                                    )}
                                    placeholder="Products"
                                    queryEnabled={!!shop?.shop_id}
                                  />
                                </div>
                                <div>
                                  {includedProducts.map((product: any) => (
                                    <div
                                      key={product.key}
                                      className="flex items-center"
                                    >
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                          className="h-10 w-10"
                                          src={product.image_url}
                                          alt={product.label}
                                        />
                                      </div>
                                      <div className="ml-4 flex justify-between">
                                        <div className="text-sm font-medium text-gray-900">
                                          {product.label}
                                        </div>
                                        <div
                                          onClick={e => {
                                            e.stopPropagation();
                                            setInclPids(previousKeys =>
                                              previousKeys.filter(
                                                k => k !== product.key,
                                              ),
                                            );
                                            qc.invalidateQueries([
                                              'included-products',
                                              discountId,
                                            ]);
                                          }}
                                          className="text-sm text-gray-500 cursor-pointer"
                                        >
                                          X
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="w-full">
                                <div className="w-full">
                                  <div
                                    onClick={e => {
                                      e.stopPropagation();
                                      setSearchInclCollectionsOpen(
                                        !searchInclCollectionsOpen,
                                      );
                                    }}
                                    className="flex border-1 rounded"
                                  >
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
                                  <SelectableResultSearchModal
                                    id="quick-find-modal"
                                    searchId="quick-find"
                                    modalOpen={searchInclCollectionsOpen}
                                    setModalOpen={setSearchInclCollectionsOpen}
                                    queryURL={collectionOptionSearchURL}
                                    composeQuery={collectionQueryComposer}
                                    matchKey="key"
                                    queryKey="collections-opt-search"
                                    handleResultSelected={(items: any[]) => {
                                      const keys: string[] = items.map(
                                        item => item['key'],
                                      );
                                      const nl = union(keys, inclCids);
                                      handleSelectedResults(
                                        setFieldValue,
                                        'included_collections',
                                      )(nl);
                                      setInclCids(nl);
                                      qc.invalidateQueries([
                                        'included-collections',
                                        discountId,
                                      ]);
                                    }}
                                    alreadySelected={union(
                                      values.included_collections,
                                      inclCids,
                                    )}
                                    placeholder="Collections"
                                    queryEnabled={!!shop?.shop_id}
                                  />
                                </div>
                                <div>
                                  {includedCollections.map(
                                    (collection: any) => (
                                      <div
                                        key={collection.key}
                                        className="flex items-center"
                                      >
                                        <div className="flex-shrink-0 h-10 w-10">
                                          <img
                                            className="h-10 w-10"
                                            src={collection.image_url}
                                            alt={collection.label}
                                          />
                                        </div>
                                        <div className="ml-4 flex justify-between">
                                          <div className="text-sm font-medium text-gray-900">
                                            {collection.label}
                                          </div>
                                          <div
                                            onClick={e => {
                                              e.stopPropagation();
                                              setInclCids(previousKeys =>
                                                previousKeys.filter(
                                                  k => k !== collection.key,
                                                ),
                                              );
                                              qc.invalidateQueries([
                                                'included-collections',
                                                discountId,
                                              ]);
                                            }}
                                            className="text-sm text-gray-500 cursor-pointer"
                                          >
                                            X
                                          </div>
                                        </div>
                                      </div>
                                    ),
                                  )}
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
                                setFieldValue('condition_type', 'none')
                              }
                              checked={
                                values.condition_type === 'none' ? true : false
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
                                setFieldValue('condition_type', 'value')
                              }
                              checked={
                                values.condition_type === 'value' ? true : false
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
                                setFieldValue('condition_type', 'count')
                              }
                              checked={
                                values.condition_type === 'count' ? true : false
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
                                setFieldValue('condition_type', 'coverage')
                              }
                              checked={
                                values.condition_type === 'coverage'
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
                          {!(values.condition_type === 'none') && (
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="condition_value_*"
                            >
                              {values.condition_type === 'count' ||
                              values.condition_type === 'coverage'
                                ? 'Quantity'
                                : 'Amount'}
                            </label>
                          )}
                          <div
                            className={`relative ${
                              values.condition_type === 'count' ||
                              values.condition_type === 'coverage' ||
                              values.condition_type === '' ||
                              values.condition_type === 'none'
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
                            className={`relative ${
                              values.condition_type === 'value' ||
                              values.condition_type === '' ||
                              values.condition_type === 'none'
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
                        <div className="flex m-3 items-center w-full">
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
                  {!discountId && values.type === 'voucher' && (
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
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
                          className="form-select block"
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
                    <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                      Cover Image
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <Dashboard
                          uppy={uppy}
                          proudlyDisplayPoweredByUppy={false}
                          showProgressDetails={true}
                          width="100%"
                          height="400px"
                          theme="light"
                          note="Images and video only, 2–6 files, up to 1 MB"
                          metaFields={[
                            {
                              id: 'alt',
                              name: 'Alt',
                              placeholder: 'describe what the image is about',
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </section>
                  <section className="hidden rounded bg-white shadow overflow-hidden p-3 mb-10">
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
              <footer className="sticky bottom-0">
                <div className="flex flex-col py-5">
                  <div className="flex self-end">
                    <button className="btn border-teal-200 hover:border-gray-300 text-gray-600">
                      Cancel
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleSubmit();
                      }}
                      className="btn bg-blue-600 bg-opacity-100 rounded-lg  text-white ml-3"
                    >
                      Save Changes
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
