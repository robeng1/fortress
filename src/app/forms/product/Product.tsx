import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import _ from 'lodash';
import Select from 'react-select';
// import { AsyncPaginate } from 'react-select-async-paginate';
import makeAnimated from 'react-select/animated';
import Uppy, { UppyFile } from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';
import Webcam from '@uppy/webcam';
import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import { cartesian } from 'app/utils/cartesian';
import ProdutVariantPreview from 'app/forms/product/Variant';

import '@uppy/status-bar/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import colourStyles from 'app/forms/product/selectStyles';

import { colourOptions, attributeOptions } from 'app/data/select';
import GoogleDrive from '@uppy/google-drive';
import Dropbox from '@uppy/dropbox';
import Instagram from '@uppy/instagram';
import Facebook from '@uppy/facebook';
import OneDrive from '@uppy/onedrive';
import { useProductSlice } from 'app/features/product';
import { useDispatch, useSelector } from 'react-redux';
import { selectShop } from 'app/features/settings/selectors';
import { checkIfLoading } from 'app/features/ui/selectors';
import { selectProductById } from 'app/features/product/selectors';

import Box from '@uppy/box';
import DropTarget from '@uppy/drop-target';
import {
  ProductImage,
  ProductStructure,
  ProductType,
} from 'app/models/product/product-type';
import { InventoryType } from 'app/models/inventory/inventory-type';
import money from 'app/utils/money';
import { useInventorySlice } from 'app/features/inventory';
import { selectLocations } from 'app/features/inventory/selectors';
import slugify from 'slugify';
import {
  loadCollectionsAsOptions,
  loadProductTypesAsOptions,
  loadTagsAsOptions,
} from 'app/services/options-loaders';
import type { ReactElement } from 'react';
import type { GroupBase } from 'react-select';
import Creatable from 'react-select/creatable';
import type { CreatableProps } from 'react-select/creatable';

import { withAsyncPaginate } from 'react-select-async-paginate';
import type {
  UseAsyncPaginateParams,
  ComponentProps,
} from 'react-select-async-paginate';

type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean,
> = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

type AsyncPaginateCreatableType = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false,
>(
  props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>,
) => ReactElement;

const CreatableAsyncPaginate = withAsyncPaginate(
  Creatable,
) as AsyncPaginateCreatableType;
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
  type: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
});

const ProductForm = ({ handleShow, productId }) => {
  const { actions } = useProductSlice();
  const dispatch = useDispatch();
  if (productId) {
    dispatch(actions.getProduct(productId));
  }

  const { actions: inventoryActions } = useInventorySlice();
  // reload the locations if they do not exist already
  // dispatch(inventoryActions.loadLoactions());

  const shop = useSelector(selectShop);
  const locations = useSelector(selectLocations);
  const product = useSelector(state => selectProductById(state, productId));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isLoading = useSelector(state =>
    checkIfLoading(state, actions.getProduct.type),
  );
  useEffect(() => {
    dispatch(inventoryActions.loadLoactions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: Values = {
    title: '',
    description: '',
    is_parent: false,
    shipping_required: false,
    track_quantity: true,
    quantity: 0,
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
      shop_id: shop.shop_id!,
      product_id: productId,
      title: d.title,
      description: d.description,
      tags: d.tags,
      channels: d.channels,
      shipping_required: d.shipping_required,
      upc: d.barcode,
      sku: d.sku,
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
        v.shop_id = shop.shop_id!;
        // v.stock_records = d.stock_records[v.title!];
        return v;
      });
    } else {
      p.structure = ProductStructure.STANDALONE;
      const record: InventoryType = {
        variant_id: productId || '',
        product_id: productId || '',
        num_in_stock: d.quantity,
        // TODO: centreId && centreSku should be replaced with correct on
        centre_id: '',
        centre_sku: '',
        cost_per_item: money.parseDouble(
          d.cost_per_item,
          shop.currency?.iso_code || defaultCurrency,
        ),
        price_excl_tax: money.parseDouble(
          d.price,
          shop.currency?.iso_code || defaultCurrency,
        ),
        compare_at_price: money.parseDouble(
          d.compare_at_price,
          shop.currency?.iso_code || defaultCurrency,
        ),
        unlimited: d.unlimited,
        track_quantity: d.track_quantity,
        taxable: false,
      };
      p.stock_records = [record];
    }
    return p;
  };

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItems, setSelectedItems] = useState<unknown>([]);
  const [showVariants, setShowVariants] = useState(false);
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
          ].name = `products/${shop.shop_id}/images/${files[prop].name}_${datename}`;
          files[
            prop
          ].meta.name = `products/${shop.shop_id}/images/${files[prop].meta.name}_${datename}`;
        }
        return files;
        // Promise.resolve();
        // return true;
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
      .use(Tus, { endpoint: 'https://storage.reoplex.com/files/' });
  }, [shop.shop_id]);

  uppy.on('complete', result => {
    console.log('successful files:', result.successful);
    console.log('failed files:', result.failed);
  });

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
      va.stock_records![0].price_excl_tax = money.parseDouble(
        newValue,
        shop.currency?.iso_code || defaultCurrency,
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
        shop_id: shop.shop_id!,
        product_id: productId || '',
        structure: ProductStructure.CHILD,
      };
      p.stock_records = values.locations.map((locationId: string) => {
        const record: InventoryType = {
          variant_id: productId || '',
          product_id: productId || '',
          num_in_stock: values.quantity,
          // TODO: centreId && centreSku should be replaced with correct on
          centre_id: locationId,
          centre_sku: slugify(t),
          cost_per_item: money.parseDouble(
            values.cost_per_item,
            shop.currency?.iso_code || defaultCurrency,
          ),
          price_excl_tax: money.parseDouble(
            values.price,
            shop.currency?.iso_code || defaultCurrency,
          ),
          compare_at_price: money.parseDouble(
            values.compare_at_price,
            shop.currency?.iso_code || defaultCurrency,
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

  return (
    <>
      <Formik
        initialValues={{ ...flattenProduct(product) }}
        validationSchema={ProductSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (productId) {
            dispatch(actions.createProduct(cleanProduct({ ...values })));
          } else {
            dispatch(actions.updateProduct(cleanProduct({ ...values })));
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
          <div className="flex-grow mb-6">
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
                        id="description"
                        theme="snow"
                        // name="description"
                        onChange={e => setFieldValue('description', e)}
                        value={values.description}
                        style={{
                          paddingBottom: '1rem',
                        }}
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
                        <CreatableAsyncPaginate
                          // SelectComponent={Creatable}
                          menuPortalTarget={document.body}
                          isSearchable
                          // isDisabled={isAddingInProgress}
                          value={values.type}
                          loadOptions={loadProductTypesAsOptions}
                          // onCreateOption={onCreateOption}
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
                        <CreatableAsyncPaginate
                          id="collections"
                          name="collections"
                          closeMenuOnSelect={true}
                          defaultValue={values.collections}
                          value={values.collections}
                          isClearable
                          isSearchable
                          menuPortalTarget={document.body}
                          isMulti
                          onChange={option =>
                            setFieldValue('collections', option)
                          }
                          // isDisabled={isAddingInProgress}
                          loadOptions={loadCollectionsAsOptions(shop.shop_id!)}
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
                        <CreatableAsyncPaginate
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
                          // isDisabled={isAddingInProgress}
                          loadOptions={loadTagsAsOptions(shop.shop_id!)}
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
                          onChange={option => setFieldValue('channels', option)}
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
                        note="Images and video only, 2–6 files, up to 1 MB"
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
                          'Webcam',
                          'Instagram',
                          'GoogleDrive',
                          'Dropbox',
                          'Box',
                          'ImageEditor',
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
                      {touched.compare_at_price && errors.compare_at_price && (
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
                      <label className="block text-sm ml-2" htmlFor="unlimited">
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
                      <label className="block text-sm ml-2" htmlFor="is_parent">
                        This product has multiple options, like different sizes
                        or colors
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
                          {validateVarOptions(values.variation_options) && (
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
                            </button>
                          )}
                          {!validateVarOptions(values.variation_options) && (
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
                                updatePrice={updatePrice(values, setFieldValue)}
                                updateQuantity={updateQuantity(
                                  values,
                                  setFieldValue,
                                )}
                                currency={
                                  shop.currency?.iso_code || defaultCurrency
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
            <footer>
              <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                <div className="flex self-end md:self-center">
                  <button
                    onClick={() => handleShow(false, '')}
                    className="btn border-gray-200 hover:border-gray-300 text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={e => handleSubmit}
                    className="btn bg-purple-900 bg-opacity-100 rounded-lg  text-white ml-3"
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
};

export default ProductForm;
