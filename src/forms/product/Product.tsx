import React, { useRef, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import _ from 'lodash';
import makeAnimated from 'react-select/animated';
import Uppy, { UppyFile } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import Transloadit from '@uppy/transloadit';
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

import colourStyles from 'forms/product/Styles';

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
import { mToCurrency, pesosRawMoney, sToM, sToCurrency } from 'utils/money';
import AsyncCreatableSelect from 'react-select/async-creatable';
import useCentres from 'hooks/use-location';
import useShop from 'hooks/use-shop';
import { useNavigate } from 'react-router-dom';

// animated components for react select
const animatedComponents = makeAnimated();
const defaultCurrency = 'GHS';

interface VarOption {
  attribute: Record<string, string>;
  values: Record<string, string>[];
}

interface AttrOption {
  name: string;
  values: string[];
}

interface Values {
  title: string;
  description: string;
  is_parent: boolean;
  shipping_required: boolean;
  track_quantity: boolean;
  quantity: number;
  type?: { key: string; label: string };
  collections: string[];
  stock_records: InventoryType[];
  variants: ProductType[];
  locations: string[] | undefined;
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
  width: string;
  height: string;
  files: string[];
  page_title: string;
  page_description: string;
}

const ProductSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  // quantity: Yup.number().positive('Must be positive').required('Required'),
  // type: Yup.string().required('Required'),
  // price: Yup.string().required('Required'),
});

const ProductForm = ({ id }) => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { shop } = useShop();
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/products`;
  const [productId, setProductId] = useState(id);

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedItems, setSelectedItems] = useState<unknown>([]);
  const [showVariants, setShowVariants] = useState(false);
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const { locations } = useCentres();

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
  const record: InventoryType | undefined =
    product?.stock_records && product?.stock_records.length > 0
      ? product?.stock_records[0]
      : undefined;

  const initialValues: Values = {
    title: product?.title || '',
    description: product?.description || '',
    is_parent: !isEmpty(product?.variants),
    shipping_required: product?.shipping_required || true,
    track_quantity: product?.track_stock || true,
    quantity: !isEmpty(record) ? record?.num_in_stock || 1 : 1,
    type: undefined,
    collections: [],
    stock_records: product?.stock_records || [],
    variants: product?.variants || [],
    variation_options: [],
    images: product?.images || [],
    tags: product?.tags || [],
    vendor: product?.vendor || '',
    channels: [],
    template_suffix: 'product',
    price: !isEmpty(record)
      ? mToCurrency(record?.price_excl_tax).toString()
      : '',
    compare_at_price: !isEmpty(record)
      ? mToCurrency(record?.compare_at_price).toString()
      : '',
    cost_per_item: !isEmpty(record)
      ? mToCurrency(record?.cost_per_item).toString()
      : '',
    sku: product?.sku || '',
    barcode: product?.upc || '',
    unlimited: product?.track_stock || true,
    weight: product?.weight || '',
    length: product?.length || '',
    width: product?.width || '',
    height: product?.height || '',
    locations: locations?.map(loc => loc.centre_id!),
    files: [],
    page_title: product?.page_title || '',
    page_description: product?.description || '',
  };
  const productToValuesMapper = (d: ProductType | undefined): Values => {
    if (!d) {
      return initialValues;
    }
    if (d.structure === ProductStructure.PARENT) {
      const attrs: AttrOption[] = JSON.parse(d.attributes as string);
      initialValues.variation_options = attrs.map(attr => {
        return {
          attribute: { label: attr.name, value: attr.name.toLowerCase() },
          values: attr.values.map(v => {
            return { label: v, value: v.toLowerCase() };
          }),
        };
      });
    }
    return initialValues;
  };

  const valuesToProductMapper = (d: Values): ProductType => {
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
      weight: d.weight,
      height: d.height,
      length: d.length,
      width: d.width,
      images: images.map(img => {
        return {
          image: { image_url: img.url },
          alt: img.name,
          shop_id: shop?.shop_id,
        };
      }),
      page_title: d.page_title,
      page_description: d.page_description,
      vendor: d.vendor,
      stock_records: [],
      collections: [],
      variants: [],
    };
    if (d.type) p.categories = [d.type.key];
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
      p.stock_records = (locations ?? []).map(loc => {
        const record: InventoryType = {
          variant_id: productId || '',
          product_id: productId || '',
          shop_id: shop?.shop_id,
          num_in_stock: d.quantity,
          // TODO: centreId && centreSku should be replaced with correct on
          centre_id: loc.centre_id!,
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
    p.attributes = JSON.stringify(
      d.variation_options.map(vo => {
        return {
          name: vo.attribute.label,
          values: vo.values.map(v => v.label),
        };
      }),
    );
    return p;
  };

  // create the product
  const { mutate: createProduct, isLoading: isCreatingProduct } = useMutation(
    (payload: ProductType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newProduct: ProductType) => {
        setProductId(newProduct.product_id);
        qc.setQueryData(['product', productId], newProduct);
        toast('Product created successfully');
      },
      onError: (e: ResponseError) => {
        toast(e.message);
      },
    },
  );

  // update the collection
  const { mutate: updateProduct, isLoading: isUpdatingProduct } = useMutation(
    (payload: ProductType) =>
      request(`${requestURL}/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newProduct: ProductType) => {
        setProductId(newProduct.product_id);
        qc.setQueryData(['product', productId], newProduct);
      },
      onError: (e: ResponseError) => {},
    },
  );
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
      onBeforeUpload: files => {
        const updatedFiles = {};
        Object.keys(files).forEach(fileId => {
          updatedFiles[fileId] = {
            ...files[fileId],
            name: `reoplex_${shop?.shop_id || 'shop_demo'}_p_${
              files[fileId].name
            }`,
          };
        });
        return updatedFiles;
      },
    })
      .use(Webcam)
      .use(GoogleDrive, {
        companionUrl: Transloadit.COMPANION,
        companionAllowedHosts: Transloadit.COMPANION_PATTERN,
      })
      .use(Dropbox, {
        companionUrl: Transloadit.COMPANION,
        companionAllowedHosts: Transloadit.COMPANION_PATTERN,
      })
      .use(Box, {
        companionUrl: Transloadit.COMPANION,
        companionAllowedHosts: Transloadit.COMPANION_PATTERN,
      })
      .use(Instagram, {
        companionUrl: Transloadit.COMPANION,
        companionAllowedHosts: Transloadit.COMPANION_PATTERN,
      })
      .use(Facebook, {
        companionUrl: Transloadit.COMPANION,
        companionAllowedHosts: Transloadit.COMPANION_PATTERN,
      })
      .use(OneDrive, {
        companionUrl: Transloadit.COMPANION,
        companionAllowedHosts: Transloadit.COMPANION_PATTERN,
      })
      .use(DropTarget, { target: document.body })
      .use(Transloadit, {
        service: 'https://api2.transloadit.com',
        params: {
          auth: {
            key: 'd6650968a1064588ae29f3d0f6a70ef5',
          },
          template_id: '24f76f542f784c4cba84bf1e347a84fb',
        },

        waitForEncoding: true,
        waitForMetadata: true,
        alwaysRunAssembly: true,
      })
      .on('file-removed', (file, reason) => {
        if (reason === 'removed-by-user') {
          // remove file from s3
          // sendDeleteRequestForFile(file);
        }
      })
      .on('transloadit:complete', assembly => {
        setImages([
          ...images,
          ...assembly.results[':original'].map(item => ({
            name: item.basename,
            url: item.ssl_url,
          })),
        ]);
      });
  }, [shop?.shop_id]);

  const addFiles = files => {
    files.forEach(e => {
      uppy.addFile({
        name: e.name,
        type: e.type,
        data: e.blob, // changed blob -> data
      });
    });

    uppy.getFiles().forEach(file => {
      // https://uppy.io/docs/uppy/#uppy-setFileState-fileID-state
      uppy.setFileState(file.id, {
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
            })
            .catch(e => {});
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
  const validateVarOptions = (options: VarOption[], func?: any): boolean => {
    let isValid = options.length > 0;
    options.forEach(opt => {
      if (_.isEmpty(opt.attribute) || _.isEmpty(opt.values)) isValid = false;
    });
    if (isValid && func) func();
    return isValid;
  };

  const generate = (
    values: Values,
    setFieldValue?: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => void,
  ) => {
    const variationOptions = values.variation_options;

    const attributes = variationOptions.map(v => v.attribute);
    const attributeValues = variationOptions.map(v => v.values);

    const labels = attributeValues.map(vl => vl.map(a => a.label));

    const titles = cartesian(...labels).map((v: string[] | string) =>
      typeof v === 'string' ? v : v.join('-'),
    );

    const variants: ProductType[] = titles.map((t: string) => {
      const variant: ProductType = {
        title: t,
        shop_id: shop?.shop_id!,
        product_id: productId || '',
        structure: ProductStructure.CHILD,
        weight: values.weight,
        height: values.height,
        length: values.length,
        width: values.width,
      };

      variant.attributes = JSON.stringify(
        variant.title?.split('-').map((opt, i) => {
          return { name: attributes[i].label, value: opt };
        }),
      );

      variant.stock_records = (locations ?? []).map(({ centre_id }) => {
        const record: InventoryType = {
          variant_id: productId || '',
          product_id: productId || '',
          num_in_stock: values.quantity,
          // TODO: centreId && centreSku should be replaced with correct on
          centre_id: centre_id!,
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
      return variant;
    });
    // setFieldValue('variants', [...values.variants, ...vars]);
    if (setFieldValue) {
      setFieldValue('variants', [...variants]);
    } else {
      return variants;
    }
  };

  const handleSubmit = (values: Values) => {
    if (values.is_parent && _.isEmpty(values.variants)) {
      values.variants = generate(values) || [];
    }
    const p = valuesToProductMapper({ ...values });
    // console.log(p);
    // console.log(values.variation_options);
    // console.log(p.attributes);
    if (!productId || productId === '') {
      createProduct(p);
    } else {
      updateProduct(p);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isCreatingProduct || isUpdatingProduct}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Formik
        enableReinitialize
        initialValues={{ ...productToValuesMapper(product) }}
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
                          onChange={value =>
                            setFieldValue('description', value)
                          }
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
                            
                            loadOptions={collectionOptions(shop?.shop_id!)}
                            
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

                  {/* <div className="col-span-2 md:col-span-1 w-full mt-4">
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
                  </div> */}
                </div>
                <div className="md:col-span-2">
                  <section className="bg-white shadow overflow-hidden p-3 mb">
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
                          height={'350px'}
                          note="Images and video only, 2-6 files, up to 1 MB"
                          doneButtonHandler={() => ({})}
                          hideProgressAfterFinish={true}
                          showRemoveButtonAfterComplete={true}
                          plugins={
                            [
                              // 'Webcam',
                              // 'Instagram',
                              // 'GoogleDrive',
                              // 'Dropbox',
                              // 'Box',
                              // 'ImageEditor',
                            ]
                          }
                        />
                      </div>
                    </div>
                  </section>
                  {/* <section className="bg-white shadow mb-10 p-3 ">
                    <div className="mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-4">
                      {images.map(img => (
                        <div className="flex md:flex-col items-center text-gray-800">
                          <div className="w-24 md:32 flex-shrink-0 flex items-center justify-center">
                            <img
                              className="mr-2 md:ml-0 object-center object-cover"
                              src={img.url}
                              width="100%"
                              height="100%"
                              alt={img.name}
                            />
                          </div>
                          <div className="text-xs text-light-purple-500">
                            {img.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section> */}
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
                                className="rounded-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 mr-3 mb-3"
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
                            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3"
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
                                    generate(values, setFieldValue);
                                  }
                                  setShowVariants(!showVariants);
                                }}
                                className="rounded-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 mr-3 mb-3"
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
                            {showVariants &&
                              validateVarOptions(values.variation_options) && (
                                <>
                                  <h2 className="text-sm capitalize text-left leading-snug text-gray-800 font-medium mb-2">
                                    {locations && locations[0].name}
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
                                      shop?.currency?.iso_code ||
                                      defaultCurrency
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
                          <h2 className="mb-[0px] mt-[25px] font-normal text-sm text-purple-700">
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
                <div className="flex flex-col py-5">
                  <div className="flex self-end">
                    <button
                      onClick={() => navigate('/shops/products')}
                      className="btn border-gray-200 hover:border-gray-300 text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleSubmit();
                      }}
                      type="button"
                      className="btn bg-purple-600 bg-opacity-100 rounded-lg  text-white ml-3"
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
