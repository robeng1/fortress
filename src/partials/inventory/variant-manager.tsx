import ModalBasic from 'components/modal-basic';
import { fortressURL } from 'endpoints/urls';
import { Formik } from 'formik';
import useModal from 'hooks/use-modal';
import useShop from 'hooks/use-shop';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { InventoryType, InventoryViewType } from 'typings/inventory/inventory-type';
import { ProductType } from 'typings/product/product-type';
import { pesosRawMoney } from 'utils/money';
import { request, ResponseError } from 'utils/request';
import { proxyURL } from 'utils/urlsigner';
import StockManger from './stock-manager';

type VariantManagerProps = {
  handleClick: (e: any) => void
  isChecked: boolean,
  product: InventoryViewType
}

const VariantManager: React.FC<VariantManagerProps> = ({ product, isChecked, handleClick }) => {
  const { shop } = useShop();
  const { isOpen, handleOpen, handleClose } = useModal(false);
  const isVariant = product.product_id !== product.variant_id
  const url = isVariant ? `${fortressURL}/shops/${shop?.shop_id}/products/${product.product_id}/variants/${product.variant_id}` : `${fortressURL}/shops/${shop?.shop_id}/products/${product.product_id}`;

  const { data: variant } = useQuery<InventoryType>(
    ['variant-manager', product.variant_id],
    async () => await request(url),
    {
      // The query will not execute until the productId exists
      enabled: isOpen,
      keepPreviousData: true,
    },
  );
  const { mutate: update, isLoading: isUpdating } = useMutation(
    (payload: ProductType) =>
      request(url, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newVariant: ProductType) => {
        // klient.invalidateQueries(['domains']);
        // toast('Domain updated successfully');
      },
      onError: (e: ResponseError) => {
        // toast(e.message);
      },
    },
  );
  const initialValues: ProductType = {
    product_id: '',
    upc: '',
    shop_id: '',
    attributes: '',
    title: '',
    description: '',
    created_at: '',
    updated_at: '',
    image: '',
    sku: '',
    track_stock: true,
    categories: [],
    status: '',
    item_condition: '',
    swatch_image_url: '',
    material: '',
    product_type_id: '',
    is_discountable: true,
    is_public: false,
    parent_id: '',
    shipping_required: true,
    variant_id: '',
    handle: '',
    vendor: '',
    channels: [],
    inheritance_id: '',
    product_status: '',
    template_suffix: '',
    bucket: '',
    tags: [],
    page_title: '',
    page_description: '',
    stock_records: [],
    variant_rank: 1,
    position: 1,
    ean: '',
    allow_backorder: true,
    hs_code: '',
    mid_code: '',
    deleted_at: '',
    metadata: '',
    weight: '',
    length: '',
    height: '',
    width: '',
    profile_id: '',
    ...variant,
  }
  const sku = product.sku && product.sku !== "" ? product.sku : product.centre_sku
  return (
    <>
      <tr>
        <td className="px-2 first:pl-3 last:pr-3 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                id={product.variant_id}
                className="form-checkbox"
                type="checkbox"
                onChange={handleClick}
                checked={isChecked}
              />
            </label>
          </div>
        </td>
        <td className="px-2 first:pl-3 last:pr-3 py-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-8 h-8 flex-shrink-0 mr-2 sm:mr-3">
              <img
                className="rounded"
                src={proxyURL(product.image_url, 50, 50)}
                alt={product.title}
              />
            </div>
            <div onClick={handleOpen} className="font-medium text-gray-800 hover:underline cursor-pointer">{product.title}</div>
          </div>
        </td>
        <td className="px-2 first:pl-3 last:pr-3 py-2 whitespace-nowrap">
          <div
            className={`inline-flex font-medium rounded-full text-left py-0.5 `}
          >
            {sku}
          </div>
        </td>
        <td className="px-2 first:pl-3 last:pr-3 py-2 whitespace-nowrap">
          <div
          >{product.num_allocated}</div>
        </td>
        <td className="px-2 first:pl-3 last:pr-3 py-2 whitespace-nowrap">
          <div
          >{pesosRawMoney(product.price_excl_tax)}</div>
        </td>
        <td className="px-2 first:pl-3 last:pr-3 py-2 whitespace-nowrap">
          <div
          >{product.num_in_stock}</div>
        </td>
      </tr>
      <div className="m-1.5">
        <ModalBasic
          id="inventory-modal"
          modalOpen={isOpen}
          setModalOpen={state =>
            state === true ? handleOpen() : handleClose()
          }
          title={`Edit ${product.title}`}
        >
          <div className="px-2 py-2">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                update({ ...values })
                setSubmitting(false);
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
                            className="form-checkbox"
                            type="checkbox"
                          />
                          <label
                            className="block text-sm ml-2"
                            htmlFor="allow_backorder"
                          >
                            Allow backorders
                          </label>
                        </div>
                        <div className="flex items-center w-full">
                          <input
                            name="track_stock"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.track_stock}
                            id="track_stock"
                            className="form-checkbox"
                            type="checkbox"
                          />
                          <label
                            className="block text-sm ml-2"
                            htmlFor="track_stock"
                          >
                            Track stock
                          </label>
                        </div>
                      </div>
                    </section>
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      {values.stock_records?.map((record, index) => <StockManger key={index} stock={record} onChange={(stk: InventoryType) => {
                        const rcs = values.stock_records
                        if (rcs) {
                          rcs[index] = stk
                          setFieldValue("stock_records", rcs)
                        }
                      }} />)}
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
                          onClick={e => {
                            e.stopPropagation();
                            handleSubmit();
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
  );
}

export default VariantManager;
