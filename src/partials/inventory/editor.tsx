import ModalBasic from "components/modal-basic"
import { fortressURL } from "endpoints/urls"
import { Formik } from "formik"
import useShop from "hooks/use-shop"
import toast from "react-hot-toast"
import React from "react"
import { useMutation, useQuery } from "react-query"
import {
  InventoryType,
  InventoryViewType,
} from "typings/inventory/inventory-type"
import { ProductType } from "typings/product/product-type"
import { request, ResponseError } from "utils/request"
import StockManger from "./stock-manager"
import InputHeader from "components/blocks/input-header"

type VariantEditorProps = {
  handleClick?: (e: any) => void
  isChecked?: boolean
  product: InventoryViewType
  isOpen: boolean
  handleOpen: () => void
  handleClose: () => void
}

const VariantEditor: React.FC<VariantEditorProps> = ({
  product,
  isChecked,
  handleClick,
  isOpen,
  handleClose,
  handleOpen,
}) => {
  const { shop } = useShop()
  const isVariant = product.product_id !== product.variant_id
  const url = isVariant
    ? `${fortressURL}/shops/${shop?.shop_id}/products/${product.product_id}/variants/${product.variant_id}`
    : `${fortressURL}/shops/${shop?.shop_id}/products/${product.product_id}`

  const { data: variant } = useQuery<InventoryType>(
    ["variant-manager", product.variant_id],
    async () => await request(url),
    {
      // The query will not execute until the productId exists
      enabled: isOpen,
      keepPreviousData: true,
    }
  )
  const { mutateAsync: update, isLoading: isUpdating } = useMutation(
    (payload: ProductType) =>
      request(url, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newVariant: ProductType) => {
        // klient.invalidateQueries(['domains']);
        toast.success("Updated successfully")
      },
      onError: (e: ResponseError) => {
        toast.error(e.message)
      },
    }
  )
  const initialValues: ProductType = {
    product_id: "",
    upc: "",
    shop_id: "",
    attributes: "",
    title: "",
    description: "",
    created_at: "",
    updated_at: "",
    image: "",
    sku: "",
    track_stock: true,
    categories: [],
    status: "",
    item_condition: "",
    swatch_image_url: "",
    material: "",
    product_type_id: "",
    is_discountable: true,
    is_public: false,
    parent_id: "",
    shipping_required: true,
    variant_id: "",
    handle: "",
    vendor: "",
    channels: [],
    inheritance_id: "",
    product_status: "",
    template_suffix: "",
    bucket: "",
    tags: [],
    page_title: "",
    page_description: "",
    stock_records: [],
    variant_rank: 1,
    position: 1,
    ean: "",
    allow_backorder: true,
    hs_code: "",
    mid_code: "",
    deleted_at: "",
    metadata: "",
    weight: "",
    length: "",
    height: "",
    width: "",
    profile_id: "",
    ...variant,
    images: [],
  }
  return (
    <>
      <div className="m-1.5">
        <ModalBasic
          id="inventory-modal"
          modalOpen={isOpen}
          setModalOpen={(state) =>
            state === true ? handleOpen() : handleClose()
          }
          title={`Edit ${product.title}`}
        >
          <div className="px-2 py-2">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                toast.promise(update({ ...values, images: [] }), {
                  loading: "Updating product",
                  success: null,
                  error: null,
                })
                setSubmitting(false)
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                isSubmitting,
              }) => (
                <>
                  <div className="space-y-3">
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                        Inventory Codes
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
                            className="form-input w-full md:w-min bg-slate-100"
                            type="text"
                            placeholder="RS6TR"
                          />
                        </div>
                        <div className="sm:w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="upc"
                          >
                            UPC Barcode (ISBN, UPC, GTIN, etc)
                          </label>
                          <input
                            id="upc"
                            name="upc"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.upc}
                            className="form-input w-full md:w-min bg-slate-100"
                            type="text"
                            placeholder="217328189902301"
                          />
                        </div>
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="sm:w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="ean"
                          >
                            EAN
                          </label>
                          <input
                            id="ean"
                            name="ean"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ean}
                            className="form-input w-full md:w-min bg-slate-100"
                            type="text"
                            placeholder="217328189902301"
                          />
                        </div>
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="flex items-center w-full">
                          <input
                            name="allow_backorder"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.allow_backorder}
                            id="allow_backorder"
                            className="form-checkbox mr-2"
                            type="checkbox"
                          />
                          <InputHeader
                            label="Allow backorders"
                            tooltipContent="Customers can still order even if this product is out of stock"
                          />
                        </div>
                        <div className="flex items-center w-full">
                          <input
                            name="track_stock"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.track_stock}
                            id="track_stock"
                            className="form-checkbox mr-2"
                            type="checkbox"
                          />
                          <InputHeader
                            label="Manage inventory"
                            tooltipContent="Customers can still order even if this product is out of stock"
                          />
                        </div>
                        <div className="flex items-center w-full">
                          <input
                            name="is_discountable"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.is_discountable}
                            id="is_discountable"
                            className="form-checkbox mr-2"
                            type="checkbox"
                          />
                          <InputHeader
                            label="Is discountable"
                            tooltipContent="Whether this product should be included in a discount"
                          />
                        </div>
                      </div>
                    </section>
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      {values.stock_records?.map((record, index) => (
                        <StockManger
                          key={index}
                          stock={record}
                          currency={shop?.currency?.iso_code!}
                          onChange={(stk: InventoryType) => {
                            const stocks = values.stock_records
                            if (stocks) {
                              stocks[index] = stk
                              setFieldValue("stock_records", stocks)
                            }
                          }}
                        />
                      ))}
                    </section>
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                        Dimensions
                      </h2>
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
                            className="form-input w-full bg-slate-100"
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
                            className="form-input w-full bg-slate-100"
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
                            className="form-input w-full bg-slate-100"
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
                            className="form-input w-full bg-slate-100"
                            type="number"
                            step={0.1}
                            min={0}
                            autoComplete="width"
                          />
                        </div>
                      </div>
                    </section>
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                        Customs
                      </h2>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full md:w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="mid_code"
                          >
                            MID Code
                          </label>
                          <input
                            id="mid_code"
                            name="mid_code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mid_code}
                            className="form-input w-full bg-slate-100"
                            type="text"
                          />
                        </div>
                        <div className=" w-full md:w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="hs_code"
                          >
                            HS code
                          </label>
                          <input
                            id="hs_code"
                            name="hs_code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.hs_code}
                            className="form-input w-full bg-slate-100"
                            type="text"
                          />
                        </div>
                        <div className=" w-full md:w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="material"
                          >
                            Material
                          </label>
                          <input
                            id="material"
                            name="material"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.material}
                            className="form-input w-full bg-slate-100"
                            type="text"
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                  <footer className="self-end">
                    <div className="flex flex-col py-5">
                      <div className="flex self-end">
                        <button
                          onClick={handleClose}
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
                </>
              )}
            </Formik>
          </div>
        </ModalBasic>
      </div>
    </>
  )
}
export default VariantEditor
