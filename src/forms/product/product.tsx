import React, { useEffect, useRef, useState } from "react"
import isEmpty from "lodash/isEmpty"
import toast from "react-hot-toast"
import { useQuery, useMutation, useQueryClient } from "react-query"
import * as Yup from "yup"
import _ from "lodash"
import makeAnimated from "react-select/animated"
import { Formik } from "formik"
import { cartesian } from "utils/cartesian"
import ProdutVariantPreview from "forms/product/variant"
import { fortressURL } from "endpoints/urls"
import { attributeOptions } from "data/select"
import {
  ProductStructure,
  ProductStructureStr,
  ProductType,
} from "typings/product/product-type"
import { InventoryType } from "typings/inventory/inventory-type"
import slugify from "slugify"
import { productTypeOptions } from "services"
import Creatable from "react-select/creatable"
import { request, ResponseError } from "utils/request"
import { mToCurrency, stom as stom } from "utils/money"
import ReactSelectCreatable from "react-select/async-creatable"
import useCentres from "hooks/use-location"
import useShop from "hooks/use-shop"
import { useLocation, useNavigate } from "react-router-dom"
import TagInput from "components/blocks/tag-input"
import { Loading } from "components/blocks/backdrop"
import TextArea from "components/blocks/text-area"
import Images from "./images"
import { AttrOption, SelectOption, Values, VarOption } from "./values"
import { b64Encode, base64Decode, decodeBuf, encodeBuf } from "utils/buff"
import { useOnboarding } from "hooks/use-onboarding"
import InputHeader from "components/blocks/input-header"
import CollectionSelect from "./blocks/collection-select"

const SIMPLE_PRODUCT_VIEW = "SIMPLE_PRODUCT_VIEW"
const COMPLEX_PRODUCT_VIEW = "COMPLEX_PRODUCT_VIEW"

// animated components for react select
const animatedComponents = makeAnimated()
const defaultCurrency = "GHS"

const ProductSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
})

const ProductForm = ({ id }) => {
  const location = useLocation()
  const { pathname } = location
  useOnboarding(pathname)
  const klient = useQueryClient()
  const navigate = useNavigate()
  const { shop } = useShop()
  const { locations } = useCentres()
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/products`
  const showVariantButtonRef = useRef<HTMLButtonElement>(null)

  const [formView, setFormView] = React.useState<string>(SIMPLE_PRODUCT_VIEW)
  const [images, setImages] = React.useState<string[]>([])
  const [isSavingImages, setIsSavingImages] = React.useState<boolean>(false)

  const handleUpload = (images: string[]) => setImages(images)

  const [productId, setProductId] = useState(id)
  const [selectedItems, setSelectedItems] = useState<unknown>([])
  const [showVariants, setShowVariants] = useState(false)

  // query for getting the product, TODO: move into a hook
  const { data: product, isLoading: isLoadingProduct } = useQuery<ProductType>(
    ["product", productId],
    async () => await request(`${requestURL}/${productId}`),
    {
      // The query will not execute until the productId exists
      enabled: !!productId && !!shop,
      keepPreviousData: true,
    }
  )

  const record: InventoryType | undefined =
    product?.stock_records && product?.stock_records.length > 0
      ? product?.stock_records[0]
      : undefined

  const productToValuesMapper = (d: ProductType | undefined): Values => {
    const vals: Values = {
      title: d?.title || "",
      description: d?.description ?? "",
      is_parent: !isEmpty(d?.variants),
      shipping_required: d?.shipping_required || true,
      track_quantity: d?.track_stock || true,
      quantity: !isEmpty(record) ? record?.num_in_stock || 1 : 1,
      stock_records: d?.stock_records || [],
      variants: d?.variants || [],
      variation_options: [],
      images: d?.images || [],
      tags: d?.tags ?? [],
      vendor: d?.vendor || shop?.business_name || "",
      channels: [],
      collection_fks: d?.collection_fks,
      template_suffix: "product",
      price: !isEmpty(record)
        ? mToCurrency(record?.price_excl_tax).toString()
        : "",
      compare_at_price: !isEmpty(record)
        ? mToCurrency(record?.compare_at_price).toString()
        : "",
      cost_per_item: !isEmpty(record)
        ? mToCurrency(record?.cost_per_item).toString()
        : "",
      sku: d?.sku || "",
      barcode: d?.upc || "",
      unlimited: d?.track_stock || true,
      weight: d?.weight || "",
      length: d?.length || "",
      width: d?.width || "",
      height: d?.height || "",
      locations: locations?.map((loc) => loc.centre_id!),
      page_title: d?.page_title || "",
      page_description: d?.description || "",
    }
    if (!d) {
      return vals
    }
    // set the product type
    if (d.categories && d.categories.length > 0) {
      const _type = d.categories[0]
      vals.type = { label: _type, key: _type }
    }

    // set product attributes
    if (d.structure === ProductStructureStr.PARENT && d.attributes) {
      const attrs: AttrOption[] = base64Decode(d.attributes) as AttrOption[]
      vals.variation_options = attrs.map((attr) => {
        return {
          attribute: { label: attr.name, value: attr.name.toLowerCase() },
          values: attr.values.map((v) => {
            return v
          }),
        }
      })
    }
    return vals
  }

  const valuesToProductMapper = (d: Values): ProductType => {
    const p: ProductType = {
      ...product,
      shop_id: shop?.shop_id!,
      product_id: productId,
      title: d.title,
      description: d.description,
      channels: d.channels,
      shipping_required: d.shipping_required,
      upc: d.barcode,
      sku: d.sku,
      tags: d.tags,
      weight: d.weight?.toString() ?? "",
      height: d.height?.toString() ?? "",
      length: d.length?.toString() ?? "",
      width: d.width?.toString() ?? "",
      images: images.map((url) => {
        return {
          url: url,
          alt: d.title,
          shop_id: shop?.shop_id,
        }
      }),
      page_title: d.page_title,
      page_description: d.page_description,
      vendor: d.vendor ?? "",
      stock_records: [],
      collection_fks: d.collection_fks,
      variants: [],
    }
    if (d.type) p.categories = [d.type.key ?? d.type.label]

    if (d.is_parent) {
      p.structure = ProductStructure.PARENT
      p.variants = d.variants.map((v) => {
        v.structure = ProductStructure.CHILD
        v.shop_id = shop?.shop_id!
        return v
      })
    } else {
      p.structure = ProductStructure.STANDALONE
      if (product) {
        p.stock_records = product.stock_records?.map((stock) => {
          const records: InventoryType = {
            ...stock,
            num_in_stock: d.quantity,
            centre_sku: slugify(d.title),
            cost_per_item: stom(d.cost_per_item, shop?.currency?.iso_code),
            price_excl_tax: stom(d.price, shop?.currency?.iso_code),
            compare_at_price: stom(
              d.compare_at_price,
              shop?.currency?.iso_code
            ),
            unlimited: d.unlimited,
            track_quantity: d.track_quantity,
            taxable: false,
          }
          return records
        })
      } else {
        p.stock_records = (locations ?? []).map((loc) => {
          const record: InventoryType = {
            variant_id: productId || "",
            product_id: productId || "",
            shop_id: shop?.shop_id,
            num_in_stock: d.quantity,
            centre_id: loc.centre_id ?? "",
            centre_sku: slugify(d.title),
            cost_per_item: stom(d.cost_per_item, shop?.currency?.iso_code),
            price_excl_tax: stom(d.price, shop?.currency?.iso_code),
            compare_at_price: stom(
              d.compare_at_price,
              shop?.currency?.iso_code
            ),
            unlimited: d.unlimited,
            track_quantity: d.track_quantity,
            taxable: false,
          }
          return record
        })
      }
    }
    if (d.variation_options.length > 0) {
      p.attributes = b64Encode(
        d.variation_options.map((vo) => {
          return {
            name: vo.attribute.label,
            values: vo.values.map((v) => v),
          }
        })
      )
    }
    return p
  }

  const { mutate: createProduct, isLoading: isCreatingProduct } = useMutation(
    (payload: ProductType) =>
      request(requestURL, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newProduct: ProductType) => {
        setProductId(newProduct.product_id)
        klient.setQueryData(["product", productId], newProduct)
        toast.success("Product created successfully")
      },
      onError: (e: ResponseError) => {
        toast.error(e.message)
      },
    }
  )

  const { mutate: updateProduct, isLoading: isUpdatingProduct } = useMutation(
    (payload: ProductType) =>
      request(`${requestURL}/${productId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newProduct: ProductType) => {
        setProductId(newProduct.product_id)
        klient.setQueryData(["product", productId], newProduct)
        toast.success("Product updated successfully")
      },
      onError: (e: ResponseError) => {
        toast.error(e.message)
      },
    }
  )

  const handleSelectedItems = (selectedItems: unknown[]) => {
    setSelectedItems([...selectedItems])
  }

  // passed down to variants table for updating price. TODO: move into a diff file
  const updatePrice =
    (
      values: Values,
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
      ) => void
    ) =>
    (index: number, newValue: string) => {
      const variants = values.variants
      const va = values.variants[index]
      va.stock_records![0].price_excl_tax = stom(
        newValue,
        shop?.currency?.iso_code
      )
      variants[index] = va
      setFieldValue("variants", variants)
    }

  // passed down to variants table for updating quantity of child
  // TODO: move into a diff file
  const updateQuantity =
    (
      values: Values,
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
      ) => void
    ) =>
    (index: number, newValue: number) => {
      const variants = values.variants
      const va = values.variants[index]
      va.stock_records![0].num_in_stock = newValue
      variants[index] = va
      setFieldValue("variants", variants)
    }

  // validates variation options before allowing variants to be
  // generated from options
  const validateVarOptions = (options: VarOption[], func?: any): boolean => {
    let isValid = options.length > 0
    options.forEach((opt) => {
      if (_.isEmpty(opt.attribute) || _.isEmpty(opt.values)) isValid = false
    })
    if (isValid && func) {
      func()
    }
    return isValid
  }

  // TODO: move into a diff file
  const createVars = (
    values: Values,
    setFieldValue?: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    const old = product?.variants ?? []

    const variationOptions = values.variation_options

    const attributes = variationOptions.map((v) => v.attribute)
    const attributeValues = variationOptions.map((v) => v.values)

    const labels = attributeValues.map((label) => label.map((a) => a.trim()))

    const titles = cartesian(...labels).map((v: string[] | string) =>
      typeof v === "string" ? v : v.join("-").trim()
    )

    const variants: ProductType[] = titles.map((title: string) => {
      const foundv = old.find((child) => child.title === title)
      let variant: ProductType
      if (foundv) {
        variant = foundv
      } else {
        variant = {
          title: title,
          shop_id: shop?.shop_id!,
          product_id: productId || "",
          structure: ProductStructure.CHILD,
          weight: values.weight.toString(),
          height: values.height.toString(),
          length: values.length.toString(),
          width: values.width.toString(),
          track_stock: values.track_quantity,
        }
        variant.attributes = b64Encode(
          variant.title?.split("-").map((opt, i) => {
            return { name: attributes[i].label, value: opt }
          })
        )
        variant.stock_records = (locations ?? []).map(({ centre_id }) => {
          const record: InventoryType = {
            variant_id: productId || "",
            product_id: productId || "",
            shop_id: shop?.shop_id,
            num_in_stock: values.quantity,
            // TODO: centreId && centreSku should be replaced with correct on
            centre_id: centre_id ?? "",
            centre_sku: slugify(title),
            cost_per_item: stom(values.cost_per_item, shop?.currency?.iso_code),
            price_excl_tax: stom(values.price, shop?.currency?.iso_code),
            compare_at_price: stom(
              values.compare_at_price,
              shop?.currency?.iso_code
            ),
            unlimited: values.unlimited,
            track_quantity: values.track_quantity,
            taxable: false,
          }
          return record
        })
      }
      return variant
    })
    // setFieldValue('variants', [...values.variants, ...vars]);
    if (setFieldValue) {
      setFieldValue("variants", [...variants])
    } else {
      return variants
    }
  }

  const handleSubmit = (values: Values) => {
    if (values.is_parent && _.isEmpty(values.variants)) {
      values.variants = createVars(values) || []
    }
    const p = valuesToProductMapper({ ...values })
    if (!productId || productId === "") {
      createProduct(p)
    } else {
      updateProduct(p)
    }
  }
  const initvals = productToValuesMapper(product)

  useEffect(() => {
    if (isLoadingProduct) {
      toast.loading("Fetching data", { id: "product-fetching" })
    } else {
      toast.dismiss("product-fetching")
    }
  }, [isLoadingProduct])

  // TODO: break form page into sections
  return (
    <>
      <Loading
        open={
          isCreatingProduct ||
          isUpdatingProduct ||
          isSavingImages ||
          isLoadingProduct
        }
      />
      <Formik
        enableReinitialize
        initialValues={{ ...initvals }}
        validationSchema={ProductSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit({
            ...values,
          })
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
          <div>
            <div className="flex-grow w-full mx-auto">
              <div className="grid grid-cols-1 divide-y-1 divide-black md:grid-cols-3 gap-y-6 gap-x-2">
                <div className="md:col-span-2">
                  <section className="rounded bg-white shadow p-3">
                    <h2 className="text-sm header  leading-snug text-gray-500 font-bold mb-1">
                      General
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="title"
                        >
                          Name
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
                        <TextArea
                          name="description"
                          id="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                      <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                        Organization
                      </h2>
                      {/* <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <InputHeader
                            label="Collection"
                            tooltipContent="Choose a product category"
                          />
                          <ReactSelectCreatable
                            isSearchable
                            closeMenuOnSelect={true}
                            closeMenuOnScroll={true}
                            cacheOptions
                            placeholder="Search category"
                            value={values.type}
                            loadOptions={productTypeOptions}
                            onChange={(option) => setFieldValue("type", option)}
                            className="w-full"
                          />
                        </div>
                      </div> */}
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
                          <InputHeader
                            label="Collections"
                            tooltipContent="Collections are a way to group products into categories. Eg. Men, Women, Shoes, Shirts. They give you total control over how you group products in your store. You have to create some before they show here when you search."
                          />
                          <CollectionSelect
                            value={values.collection_fks ?? []}
                            multi={true}
                            onChange={(option) =>
                              setFieldValue(
                                "collection_fks",
                                option as string[]
                              )
                            }
                            shop_id={shop?.shop_id!}
                          />
                        </div>
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <InputHeader
                            label="Tags"
                            tooltipContent="Words that when searched, this products should be included in the search results, separated by commas"
                          />
                          <TagInput
                            values={values.tags ?? []}
                            placeholder="Separate each tag with a comma"
                            onChange={(option) =>
                              setFieldValue("tags", option as string[])
                            }
                            className="w-full"
                          />
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="col-span-2 md:col-span-1 w-full mt-4">
                    {/* <section className="rounded bg-white shadow p-3">
                      <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
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
                          <ReactSelect
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
                            options={{}}
                            styles={{
                              ...customSelectStyles,
                            }}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </section> */}
                  </div>

                  {/* <div className="col-span-2 md:col-span-1 mt-4">
                    <section className="rounded bg-white shadow p-3 sm:mb-10">
                      <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
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
                            <option value="product">product</option>
                          </select>
                        </div>
                      </div>
                    </section>
                  </div> */}
                </div>
                <div className="md:col-span-2">
                  <section className="bg-white shadow overflow-hidden p-3 mb-10">
                    <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                      Images (You can add up to 10)
                    </h2>
                    <Images
                      product={product}
                      handleUpload={handleUpload}
                      handleIsSaving={setIsSavingImages}
                    />
                  </section>
                  <section className="rounded bg-white shadow overflow-hidden relative p-3 mb-10">
                    <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-8">
                      Options
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
                          This product has optons, like color or size
                        </label>
                      </div>
                    </div>
                    {values.is_parent ? (
                      <>
                        <h2 className="text-sm uppercase leading-snug text-gray-500 font-medium mb-1 mt-5">
                          Options
                        </h2>
                        {values.variation_options.map((op, index) => (
                          <div key={index}>
                            <div className="flex items-center justify-between mt-5">
                              <h1 className="mb-0">Option {index + 1}</h1>
                              <button
                                onClick={() => {
                                  let opts = values.variation_options
                                  opts.splice(index, 1)
                                  setFieldValue("variation_options", opts)
                                  if (
                                    validateVarOptions(values.variation_options)
                                  ) {
                                    createVars(values, setFieldValue)
                                  }
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
                                  Option name
                                </label>
                                <Creatable
                                  closeMenuOnSelect={true}
                                  defaultValue={op.attribute}
                                  value={op.attribute}
                                  isClearable
                                  isSearchable
                                  onChange={(option) => {
                                    let opt = values.variation_options[index]
                                    opt.attribute = option as Record<
                                      string,
                                      string
                                    >

                                    let opts = values.variation_options
                                    opts[index] = opt
                                    setFieldValue("variation_options", opts)
                                  }}
                                  components={animatedComponents}
                                  options={attributeOptions.filter(
                                    (attr) =>
                                      !values.variation_options.some(
                                        (opt) =>
                                          attr.value === opt.attribute?.value
                                      )
                                  )}
                                  className="w-full"
                                />
                              </div>
                              <div className="sm:w-3/5 md:w-3/5">
                                <label
                                  className="block text-sm font-medium mb-1"
                                  htmlFor="values"
                                >
                                  Option values
                                </label>
                                <TagInput
                                  values={op.values}
                                  onChange={(options) => {
                                    let opt = values.variation_options[index]
                                    opt.values = options as string[]
                                    let opts = values.variation_options
                                    opts[index] = opt
                                    setFieldValue("variation_options", opts)
                                    if (
                                      validateVarOptions(
                                        values.variation_options
                                      )
                                    ) {
                                      createVars(values, setFieldValue)
                                    }
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
                              setFieldValue("variation_options", [
                                ...values.variation_options,
                                {
                                  attribute: null,

                                  values: [],
                                },
                              ])
                            }}
                            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3"
                          >
                            <span className="ml-2">Add Option</span>
                          </button>
                        </div>
                        <div>
                          <div className="rounded bg-white shadow p-3 mt-6 mb-10">
                            {validateVarOptions(values.variation_options) && (
                              <>
                                <h2 className="text-sm capitalize text-left leading-snug text-gray-500 font-medium mb-2">
                                  {locations && locations[0].name}
                                </h2>
                                <ProdutVariantPreview
                                  selectedItems={handleSelectedItems}
                                  productVariants={values.variants}
                                  updatePrice={updatePrice(
                                    values,
                                    setFieldValue
                                  )}
                                  updateQuantity={updateQuantity(
                                    values,
                                    setFieldValue
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
                  {!values.is_parent && (
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                        Pricing
                      </h2>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="sm:w-1/2">
                          <InputHeader
                            label="Price"
                            tooltipContent="The actual selling price of this product. This is what the customer pays at checkout"
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
                                  setFieldValue("price", num.toFixed(2))
                                } else {
                                  setFieldValue("price", "0.00")
                                }
                              } else {
                                setFieldValue("price", "0.00")
                              }
                            }}
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

                        {/* <div className="sm:w-1/2">
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
                                  setFieldValue(
                                    "compare_at_price",
                                    num.toFixed(2)
                                  )
                                } else {
                                  setFieldValue("compare_at_price", "0.00")
                                }
                              } else {
                                setFieldValue("compare_at_price", "0.00")
                              }
                            }}
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
                      </div> */}
                        {/* <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
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
                                } else {
                                  setFieldValue("cost_per_item", "0.00")
                                }
                              } else {
                                setFieldValue("cost_per_item", "0.00")
                              }
                            }}
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
                        </div>*/}
                      </div>
                    </section>
                  )}

                  <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                    <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
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
                    {!values.is_parent && (
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
                    )}
                  </section>
                  <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                    <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                      Packaging &amp; Shipping
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
                      <div className="w-full md:w-1/2">
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
                          className="form-input w-full"
                          type="number"
                          step={0.1}
                          min={0}
                          autoComplete="weight"
                        />
                      </div>
                      <div className=" w-full md:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="height"
                        >
                          Height
                        </label>
                        <input
                          id="height"
                          name="height"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.height}
                          className="form-input w-full"
                          type="number"
                          step={0.1}
                          min={0}
                          autoComplete="height"
                        />
                      </div>
                      <div className=" w-full md:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="length"
                        >
                          Length
                        </label>
                        <input
                          id="length"
                          name="length"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.length}
                          className="form-input w-full"
                          type="number"
                          step={0.1}
                          min={0}
                          autoComplete="length"
                        />
                      </div>
                      <div className=" w-full md:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="width"
                        >
                          Width
                        </label>
                        <input
                          id="width"
                          name="width"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.width}
                          className="form-input w-full"
                          type="number"
                          step={0.1}
                          min={0}
                          autoComplete="width"
                        />
                      </div>
                    </div>
                  </section>

                  <section className=" hidden rounded bg-white shadow overflow-hidden p-3 mb-10">
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
              <footer className="self-end">
                <div className="flex flex-col py-5">
                  <div className="flex self-end">
                    <button
                      onClick={(e) => navigate("/shop/products")}
                      className="btn border-teal-600 hover:border-gray-700 text-gray-600 bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSubmit()
                      }}
                      type="button"
                      className="btn bg-purple-600 bg-opacity-100 rounded  text-white ml-3"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default ProductForm
