import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import _ from 'lodash';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Uppy, { UppyFile } from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';
import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cartesian } from 'utils/cartesian';
import ProdutVariantPreview from 'forms/product/Variant';
import { fortressURL } from 'endpoints/urls';

import '@uppy/status-bar/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import colourStyles from 'forms/product/selectStyles';

import { colourOptions, attributeOptions } from 'data/select';
import GoogleDrive from '@uppy/google-drive';
import Webcam from '@uppy/webcam';
import Dropbox from '@uppy/dropbox';
import Instagram from '@uppy/instagram';
import Facebook from '@uppy/facebook';
import OneDrive from '@uppy/onedrive';
import Box from '@uppy/box';

import DropTarget from '@uppy/drop-target';
import {
  ProductImage,
  ProductStructure,
  ProductType,
} from 'models/product/product-type';
import { InventoryType } from 'models/inventory/inventory-type';
import slugify from 'slugify';
import {
  collectionOptions,
  productTypeOptions,
  tagOptions,
} from 'services/options-loaders';
import Creatable from 'react-select/creatable';
import { request, ResponseError } from 'utils/request';
import { useAtom } from 'jotai';
import { shopAtom } from 'store/shop';
import { locationsAtom } from 'store/location';
import { sToM } from 'utils/money';
import AsyncCreatableSelect from 'react-select/async-creatable';

// animated components for react select
const animatedComponents = makeAnimated();
const defaultCurrency = 'GHS';

interface VarOption {
  attribute: Record<string, string>;
  values: Record<string, string>[];
}

interface Values {
  title: string;
  description: string;
  is_parent: boolean;
  shipping_required: boolean;
  track_quantity: boolean;
  quantity: number;
  type: unknown;
  collections: string[];
  stock_records: InventoryType[];
  variants: ProductType[];
  locations: string[];
  variation_options: VarOption[];
  images: ProductImage[];
  tags: string[];
  vendor: string;
  channels: string[];
  template_suffix: string;
  price: string;
  compare_at_price: string;
  cost_per_item: string;
  sku: string;
  barcode: string;
  unlimited: boolean;
  weight: string;
  length: string;
  wdith: string;
  height: string;
  files: string[];
  page_title: string;
  page_description: string;
}

const ProductSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  quantity: Yup.number().positive('Must be positive').required('Required'),
  // type: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
});

const ProductForm = ({ handleShow, id }) => {
  const queryClient = useQueryClient();
  const [shop] = useAtom(shopAtom);
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/products`;
  const [productId, setProductId] = useState(id);

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItems, setSelectedItems] = useState<unknown>([]);
  const [showVariants, setShowVariants] = useState(false);
  const [images, setImages] = useState([]);
  const [locations] = useAtom(locationsAtom);

  // query for getting the product
  const { data: product } = useQuery<ProductType>(
    ['product', productId],
    async () => await request(`${requestURL}/${productId}`),
    {
      // The query will not execute until the productId exists
      enabled: !!productId,
      keepPreviousData: true,
    },
  );
  const initialValues: Values = {
    title: '',
    description: '',
    is_parent: false,
    shipping_required: false,
    track_quantity: true,
    quantity: 1,
    type: '',
    collections: [],
    stock_records: [],
    variants: [],
    variation_options: [],
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
    unlimited: true,
    weight: '',
    length: '',
    wdith: '',
    height: '',
    locations: Object.keys(locations || {}),
    files: [],
    page_title: '',
    page_description: '',
  };
  const flattenProduct = (d: ProductType | undefined): Values => {
    if (!d) {
      return initialValues;
    }
    return initialValues;
  };
  const cleanProduct = (d: Values): ProductType => {
    const p: ProductType = {
      shop_id: shop?.shop_id!,
      product_id: productId,
      title: d.title,
      description: d.description,
      tags: d.tags,
      channels: d.channels,
      shipping_required: d.shipping_required,
      upc: d.barcode,
      sku: d.sku,
      images: images,
      page_title: d.page_title,
      page_description: d.page_description,
      vendor: d.vendor,
      stock_records: [],
      collections: [],
      variants: [],
    };
    if (d.is_parent) {
      p.structure = ProductStructure.PARENT;
      p.variants = d.variants.map(v => {
        v.structure = ProductStructure.CHILD;
        v.shop_id = shop?.shop_id!;
        // v.stock_records = d.stock_records[v.title!];
        return v;
      });
    } else {
      p.structure = ProductStructure.STANDALONE;
      p.stock_records = Object.keys(locations ?? {}).map(id => {
        const record: InventoryType = {
          variant_id: productId || '',
          product_id: productId || '',
          shop_id: shop?.shop_id,
          num_in_stock: d.quantity,
          // TODO: centreId && centreSku should be replaced with correct on
          centre_id: id,
          centre_sku: slugify(d.title),
          cost_per_item: sToM(d.cost_per_item, shop?.currency?.iso_code),
          price_excl_tax: sToM(d.price, shop?.currency?.iso_code),
          compare_at_price: sToM(d.compare_at_price, shop?.currency?.iso_code),
          unlimited: d.unlimited,
          track_quantity: d.track_quantity,
          taxable: false,
        };
        return record;
      });
    }
    return p;
  };

  // create the product
  const {
    mutate: createProduct,
    // isLoading: isCreatingProduct,
    // isError: productCreationFailed,
    // error: productCreationError,
  } = useMutation(
    (payload: ProductType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newProduct: ProductType) => {
        setProductId(newProduct.product_id);
        queryClient.setQueryData(['product', productId], newProduct);
        toast('Product created successfully');
      },
      onError: (e: ResponseError) => {
        toast('Product creation failed due to ' + e.message);
      },
    },
  );

  // update the collection
  const {
    mutate: updateProduct,
    // isLoading: isUpdatingProduct,
    // isError: productUpdateFailed,
    // error: productUpdateError,
  } = useMutation(
    (payload: ProductType) =>
      request(`${requestURL}/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newProduct: ProductType) => {
        setProductId(newProduct.product_id);
        queryClient.setQueryData(['product', productId], newProduct);
      },
      onError: (e: ResponseError) => {},
    },
  );
  const onUploadComplete = result => {
    console.log('successful files:', result.successful);
    console.log('failed files:', result.failed);
    const urls = result.successful.map(f => {
      return { image_url: f.uploadURL };
    });
    // const url = result.successful[0].uploadURL;
    // const fileName = file.name;
    setImages(urls);
    // const li = document.createElement('li');
    // const a = document.createElement('a');
    // a.href = url;
    // a.target = '_blank';
    // a.appendChild(document.createTextNode(fileName));
    // li.appendChild(a);

    // document.querySelector(elForUploadedFiles).appendChild(li);
  };
  const uppy = React.useMemo(() => {
    return new Uppy({
      id: 'product',
      autoProceed: false,
      restrictions: {
        maxFileSize: 15 * 1024 * 1024,
        maxNumberOfFiles: 6,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*'],
      },
      onBeforeUpload: (files: {
        [key: string]: UppyFile<Record<string, unknown>>;
      }): { [key: string]: UppyFile<Record<string, unknown>> } | boolean => {
        const datename = Date.now();
        for (var prop in files) {
          files[
            prop
          ].name = `products/${shop?.shop_id}/images/${files[prop].name}_${datename}`;
          files[
            prop
          ].meta.name = `products/${shop?.shop_id}/images/${files[prop].meta.name}_${datename}`;
        }
        return files;
      },
    })
      .use(Webcam) // `id` defaults to "Webcam". Note: no `target` option!
      .use(GoogleDrive, {
        companionUrl: 'https://companion.reoplex.com',
      })
      .use(Dropbox, {
        companionUrl: 'https://companion.reoplex.com',
      })
      .use(Box, {
        companionUrl: 'https://companion.reoplex.com',
      })
      .use(Instagram, {
        companionUrl: 'https://companion.reoplex.com',
      })
      .use(Facebook, {
        companionUrl: 'https://companion.reoplex.com',
      })
      .use(OneDrive, {
        companionUrl: 'https://companion.reoplex.com',
      })
      .use(DropTarget, { target: document.body })
      .on('complete', onUploadComplete)
      .use(Tus, { endpoint: 'https://api.reoplex.com/storage/files/' });
  }, [shop?.shop_id]);
  const addFiles = files => {
    files.forEach(e => {
      uppy.addFile({
        name: e.name,
        type: e.type,
        data: e.blob, // changed blob -> data
      });
    });

    Object.keys(uppy.state.files).forEach(fileID => {
      // https://uppy.io/docs/uppy/#uppy-setFileState-fileID-state
      uppy.setFileState(fileID, {
        progress: { uploadComplete: true, uploadStarted: true },
      });
    });
  };

  React.useEffect(() => {
    product &&
      product.images?.forEach(img => {
        img.image?.image_url &&
          fetch(img.image?.image_url)
            .then(response => response.blob()) // returns a Blob
            .then(blob => {
              addFiles([
                {
                  name: img?.caption,
                  type: blob.type,
                  data: blob, // changed blob -> data
                },
              ]);
            });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  React.useEffect(() => {
    return () => uppy.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectedItems = (selectedItems: unknown[]) => {
    setSelectedItems([...selectedItems]);
  };

  // passed down to variants table for updating price
  const updatePrice =
    (
      values: Values,
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
      ) => void,
    ) =>
    (index: number, newValue: string) => {
      const variants = values.variants;
      const va = values.variants[index];
      va.stock_records![0].price_excl_tax = sToM(
        newValue,
        shop?.currency?.iso_code,
      );
      variants[index] = va;
      setFieldValue('variants', variants);
    };

  // passed down to variants table for updating quantity of child products
  const updateQuantity =
    (
      values: Values,
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
      ) => void,
    ) =>
    (index: number, newValue: number) => {
      const variants = values.variants;
      const va = values.variants[index];
      va.stock_records![0].num_in_stock = newValue;
      variants[index] = va;
      setFieldValue('variants', variants);
    };

  // validates variation options before allowing variants to be
  // generated from options
  const validateVarOptions = (options: VarOption[]): boolean => {
    let isValid = options.length > 0;
    options.forEach(opt => {
      if (_.isEmpty(opt.attribute) || _.isEmpty(opt.values)) isValid = false;
    });
    return isValid;
  };
  const setChildren = (
    values: Values,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => void,
  ) => {
    const variationOptions = values.variation_options;
    const attributeValues = variationOptions.map(v => v.values);
    const labels = attributeValues.map(vl => vl.map(a => a.label));
    const titles = cartesian(...labels).map((v: string[] | string) =>
      typeof v === 'string' ? v : v.join('-'),
    );
    const untouchedTitles = titles.filter(
      (t: string) => !values.variants.some(v => v.title === t),
    );
    const products: ProductType[] = untouchedTitles.map((t: string) => {
      const p: ProductType = {
        title: t,
        shop_id: shop?.shop_id!,
        product_id: productId || '',
        structure: ProductStructure.CHILD,
      };
      p.stock_records = Object.keys(locations ?? {}).map((centreId: string) => {
        const record: InventoryType = {
          variant_id: productId || '',
          product_id: productId || '',
          num_in_stock: values.quantity,
          // TODO: centreId && centreSku should be replaced with correct on
          centre_id: centreId,
          centre_sku: slugify(t),
          cost_per_item: sToM(values.cost_per_item, shop?.currency?.iso_code),
          price_excl_tax: sToM(values.price, shop?.currency?.iso_code),
          compare_at_price: sToM(
            values.compare_at_price,
            shop?.currency?.iso_code,
          ),
          unlimited: values.unlimited,
          track_quantity: values.track_quantity,
          taxable: false,
        };
        return record;
      });
      return p;
    });
    setFieldValue('variants', [...values.variants, ...products]);
  };
  const handleSubmit = values => {
    const p = cleanProduct({ ...values });
    console.log(p);
    if (!productId || productId === '') {
      createProduct(p);
    } else {
      updateProduct(p);
    }
  };
  return (
    <>
      <Formik
        initialValues={{ ...flattenProduct(product) }}
        validationSchema={ProductSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit({
            ...values,
          });
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
          <div>
            <div className="flex-grow w-full mx-auto">
              <div className="grid grid-cols-1 divide-y-1 divide-black md:grid-cols-3 gap-y-6 gap-x-2">
                <div className="md:col-span-2">
                  <section className="rounded bg-white shadow p-3">
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
                    {touched.title && errors.title && (
                      <div className="text-xs mt-1 text-red-500">
                        {errors.title}
                      </div>
                    )}
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
                          id="description"
                          value={values.description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {touched.description && errors.description && (
                      <div className="text-xs mt-1 text-red-500">
                        {errors.description}
                      </div>
                    )}
                  </section>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-1 md:gap-0 md:content-start md:gap-y-6 md:row-span-2">
                  <div className="col-span-2 md:col-span-1">
                    <section className="rounded bg-white shadow p-3">
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
                          <AsyncCreatableSelect
                            menuPortalTarget={document.body}
                            isSearchable
                            cacheOptions
                            value={values.type}
                            loadOptions={productTypeOptions}
                            onChange={option => setFieldValue('type', option)}
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
                            // cacheUniqs={[cacheUniq]}
                          />
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
                          <AsyncCreatableSelect
                            value={values.collections}
                            menuPortalTarget={document.body}
                            isMulti
                            cacheOptions
                            closeMenuOnSelect={false}
                            onChange={option =>
                              setFieldValue('collections', option)
                            }
                            placeholder="Select collections"
                            // isDisabled={isAddingInProgress}
                            loadOptions={collectionOptions(shop?.shop_id!)}
                            // onCreateOption={onCreateOption}
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
                            // cacheUniqs={[cacheUniq]}
                          />
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
                          <AsyncCreatableSelect
                            id="tags"
                            name="tags"
                            closeMenuOnSelect={true}
                            defaultValue={values.tags}
                            value={values.tags}
                            isClearable
                            isSearchable
                            menuPortalTarget={document.body}
                            isMulti
                            onChange={option => setFieldValue('tags', option)}
                            loadOptions={tagOptions(shop?.shop_id!)}
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
                            // cacheUniqs={[cacheUniq]}
                          />
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="col-span-2 md:col-span-1 w-full mt-4">
                    <section className="rounded bg-white shadow p-3">
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
                          <Select
                            id="channels"
                            name="channels"
                            closeMenuOnSelect={true}
                            defaultValue={values.channels}
                            value={values.channels}
                            isClearable
                            isSearchable
                            isMulti
                            onChange={option =>
                              setFieldValue('channels', option)
                            }
                            components={animatedComponents}
                            options={colourOptions}
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
                  </div>

                  <div className="col-span-2 md:col-span-1 mt-4">
                    <section className="rounded bg-white shadow p-3 sm:mb-10">
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
                        <Dashboard
                          uppy={uppy}
                          proudlyDisplayPoweredByUppy={false}
                          showProgressDetails={true}
                          width={'100%'}
                          theme="light"
                          height={"300px"}
                          note="Images and video only, 2-6 files, up to 1 MB"
                          metaFields={[
                            {
                              id: 'name',
                              name: 'Name',
                              placeholder: 'file name',
                            },
                            {
                              id: 'caption',
                              name: 'Caption',
                              placeholder: 'describe what the image is about',
                            },
                            {
                              id: 'alt',
                              name: 'Alt',
                              placeholder: 'describe what the image is about',
                            },
                          ]}
                          plugins={[
                            // 'Webcam',
                            // 'Instagram',
                            // 'GoogleDrive',
                            // 'Dropbox',
                            // 'Box',
                            // 'ImageEditor',
                          ]}
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
                          className="form-input w-full md:w-min"
                          type="text"
                          placeholder="GHS 0.00"
                        />
                        {touched.price && errors.price && (
                          <div className="text-xs mt-1 text-red-500">
                            {errors.price}
                          </div>
                        )}
                      </div>

                      <div className="sm:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="compare_at_price w-full md:w-min"
                        >
                          Compare at price
                        </label>
                        <input
                          id="compare_at_price"
                          name="compare_at_price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.compare_at_price}
                          className="form-input w-full md:w-min"
                          type="text"
                          placeholder="GHS 0.00"
                        />
                        {touched.compare_at_price &&
                          errors.compare_at_price && (
                            <div className="text-xs mt-1 text-red-500">
                              {errors.compare_at_price}
                            </div>
                          )}
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
                          className="form-input w-full md:w-min"
                          type="text"
                          placeholder="GHS 0.00"
                        />
                        {touched.cost_per_item && errors.cost_per_item && (
                          <div className="text-xs mt-1 text-red-500">
                            {errors.cost_per_item}
                          </div>
                        )}
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
                          className="form-input w-full md:w-min"
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
                          className="form-input w-full md:w-min"
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
                          checked={values.track_quantity}
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
                          checked={values.unlimited}
                          id="unlimited"
                          className="form-checkbox"
                          type="checkbox"
                        />
                        <label
                          className="block text-sm ml-2"
                          htmlFor="unlimited"
                        >
                          Continue selling when out of stock
                        </label>
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="">
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
                          className="form-input w-full md:w-min"
                          type="number"
                          step={1}
                          min={0}
                          placeholder="10"
                        />
                        {touched.quantity && errors.quantity && (
                          <div className="text-xs mt-1 text-red-500">
                            {errors.quantity}
                          </div>
                        )}
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
                          checked={values.shipping_required}
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

                  <section className="rounded bg-white shadow overflow-hidden relative p-3 mb-10">
                    <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-8">
                      Variants
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="flex items-center w-full">
                        <input
                          name="is_parent"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.is_parent}
                          id="is_parent"
                          className="form-checkbox"
                          type="checkbox"
                        />
                        <label
                          className="block text-sm ml-2"
                          htmlFor="is_parent"
                        >
                          This product has multiple options, like different
                          sizes or colors
                        </label>
                      </div>
                    </div>
                    {values.is_parent ? (
                      <>
                        <h2 className="text-sm uppercase leading-snug text-gray-800 font-medium mb-1 mt-5">
                          Options
                        </h2>
                        {values.variation_options.map((op, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between mt-5">
                              <h1 className="mb-0">Option {index + 1}</h1>
                              <button
                                onClick={() => {
                                  let opts = values.variation_options;
                                  opts.splice(index, 1);
                                  setFieldValue('variation_options', opts);
                                }}
                                type="button"
                                className="rounded-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 mr-3 mb-3"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                              <div className="sm:w-2/5 md:w-2/5">
                                <label
                                  className="block text-sm font-medium mb-1"
                                  htmlFor="option"
                                >
                                  Attribute name
                                </label>
                                <Creatable
                                  closeMenuOnSelect={true}
                                  defaultValue={op.attribute}
                                  value={op.attribute}
                                  isClearable
                                  isSearchable
                                  menuPortalTarget={document.body}
                                  onChange={option => {
                                    let opt = values.variation_options[index];
                                    opt.attribute = option as Record<
                                      string,
                                      string
                                    >;

                                    let opts = values.variation_options;
                                    opts[index] = opt;
                                    setFieldValue('variation_options', opts);
                                  }}
                                  components={animatedComponents}
                                  options={attributeOptions.filter(
                                    attr =>
                                      !values.variation_options.some(
                                        opt =>
                                          attr.value === opt.attribute?.value,
                                      ),
                                  )}
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
                              <div className="sm:w-3/5 md:w-3/5">
                                <label
                                  className="block text-sm font-medium mb-1"
                                  htmlFor="values"
                                >
                                  Attribute values
                                </label>
                                <Creatable
                                  closeMenuOnSelect={true}
                                  defaultValue={op.values}
                                  value={op.values}
                                  isClearable
                                  menuPortalTarget={document.body}
                                  isSearchable
                                  isMulti
                                  onChange={option => {
                                    let opt = values.variation_options[index];
                                    opt.values = option as Record<
                                      string,
                                      string
                                    >[];
                                    let opts = values.variation_options;
                                    opts[index] = opt;
                                    setFieldValue('variation_options', opts);
                                  }}
                                  components={animatedComponents}
                                  options={colourOptions}
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
                        ))}
                        <div className="mt-5">
                          <button
                            onClick={() => {
                              setFieldValue('variation_options', [
                                ...values.variation_options,
                                {
                                  attribute: null,

                                  values: [],
                                },
                              ]);
                            }}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3"
                          >
                            <span className="ml-2">Add Option</span>
                          </button>
                        </div>
                        <div>
                          <div className="rounded bg-white shadow p-3 mt-6 mb-10">
                            {(
                              productId &&
                              validateVarOptions(values.variation_options)
                            )(
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  if (!showVariants) {
                                    setChildren(values, setFieldValue);
                                  }
                                  setShowVariants(!showVariants);
                                }}
                                className="rounded-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 mr-3 mb-3"
                              >
                                Edit Variants
                              </button>,
                            )}
                            {(!productId ||
                              !validateVarOptions(
                                values.variation_options,
                              )) && (
                              <div className="m-1.5">
                                {/* Start */}
                                <button
                                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed shadow-none"
                                  disabled
                                >
                                  Edit Variants
                                </button>
                                {/* End */}
                              </div>
                            )}
                            {showVariants && (
                              <>
                                <h2 className="text-sm uppercase text-left leading-snug text-gray-800 font-medium mb-2">
                                  East Coast Warehouse
                                </h2>
                                <ProdutVariantPreview
                                  selectedItems={handleSelectedItems}
                                  productVariants={values.variants}
                                  updatePrice={updatePrice(
                                    values,
                                    setFieldValue,
                                  )}
                                  updateQuantity={updateQuantity(
                                    values,
                                    setFieldValue,
                                  )}
                                  currency={
                                    shop?.currency?.iso_code || defaultCurrency
                                  }
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </section>
                  <section className=" hidden rounded bg-white shadow overflow-hidden p-3 mb-10">
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
                          rows={5}
                          placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5 pr-9">
                      <div className="w-full mb-2">
                        <div className="bg-white">
                          <h2 className="mb-[0px] mt-[25px] font-normal text-sm text-blue-700">
                            Wearhebron | Bikershorts
                          </h2>
                          <a
                            href="https://reoplex.com"
                            className="mb-[0px] text-green-600 text-sm pr-9"
                          >
                            https://www.wearhebron.com/products/bikershorts
                          </a>

                          <p className="w-full text-sm md:h-12 text-gray-600 line-clamp-2">
                            A mutual exclusion (mutex) is a program object that
                            prevents simultaneous access to a shared resource.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <footer className="sticky bottom-0 self-end">
                <div className="flex flex-col py-5 border-t border-gray-200">
                  <div className="flex self-end">
                    <button
                      onClick={() => handleShow(false, '')}
                      className="btn border-gray-200 hover:border-gray-300 text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleSubmit();
                      }}
                      type="submit"
                      className="btn bg-blue-600 bg-opacity-100 rounded-lg  text-white ml-3"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ProductForm;
