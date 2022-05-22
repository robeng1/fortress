import React, { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { useAtom } from 'jotai';
import { useMutation, useQueryClient } from 'react-query';
import { ShopType } from 'typings/settings/shop-type';
import { request, ResponseError } from 'utils/request';
import { fortressURL } from 'endpoints/urls';
import { uidAtom } from 'store/authorization-atom';
import toast from 'react-hot-toast';
import useShop from 'hooks/use-shop';
import { Loading } from 'components/blocks/backdrop';
import SimpleImageDropzone from 'components/single-image-dropzone';
import { useUpload } from 'hooks/use-upload';
import { proxyURL } from 'utils/urlsigner';
import { useHasSale } from 'hooks/use-has-sale';

function StorePanel() {
  const klient = useQueryClient();
  const { shop } = useShop();
  const hasSale = useHasSale()
  const [accountId] = useAtom(uidAtom);
  const requestURL = `${fortressURL}/shops`;
  const [image, setImage] = useState(shop?.image);
  const { upload } = useUpload();

  const [isDirty, setIsDirty] = useState(false);

  const onImageChange = (files: File[]) => {
    if (files.length < 1) return;
    const pickf = files[0];
    setImage(pickf['preview'] ?? '');
    setIsDirty(true);
    upload(files).then(bundle => {
      // const statuses = bundle.transloadit; // Array of Assembly statuses
      const assemblyResults = bundle.results;
      if (assemblyResults) {
        const url = assemblyResults[0].ssl_url;
        setImage(url);
        setIsDirty(false);
      }
    });
  };
  // update the shop
  const { mutate: updateShop, isLoading: isUpdatingShop } = useMutation(
    (payload: ShopType) =>
      request(`${requestURL}/${shop?.shop_id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newShop: ShopType) => {
        klient.setQueryData(['shop', accountId], newShop);
        toast.success('Shop data updated succesffully');
      },
      onError: (e: ResponseError) => {
        toast.error(e.message);
      },
    },
  );

  useEffect(() => {
    setImage(shop?.image)
  }, [shop])
  

  return (
    <div>
      <Loading open={isUpdatingShop || isDirty} />
      <Formik
        enableReinitialize
        initialValues={{
          business_display_name: shop?.business_display_name || '',
          email: shop?.email || '',
          phone: shop?.phone || '',
          business_name: shop?.business_name || '',
          image: shop?.image,
          address: {
            street: '',
            city: '',
            area: '',
            province: '',
            country: '',
            ...shop?.address,
          },
          currency: {
            name: shop?.currency?.name ?? '',
            iso_code: shop?.currency?.iso_code ?? 'GHS',
            symbol: shop?.currency?.name ?? '',
          },
        }}
        onSubmit={(values, { setSubmitting }) => {
          updateShop({ ...shop, ...values, image });
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div className="flex-grow">
            {/* Panel body */}
            <div className="md:p-6 p-4 space-y-6">
              <h2 className="text-2xl text-gray-700 font-bold mb-5">
                My Store
              </h2>
              {/* Picture */}
              <section>
                <div className="flex items-center">
                  <div className="store-image-upload-progress-indicator"></div>
                  <SimpleImageDropzone
                    onChange={onImageChange}
                    label={'Shop logo'}
                    value={image ? proxyURL(image, 255, 255) : undefined}
                    height={255}
                    width={255}
                  />
                </div>
              </section>
              {/* Business Profile */}
              <section>
                <h2 className="text-xl leading-snug text-gray-700 font-bold mb-1">
                  General Details
                </h2>
                <div className="text-sm">
                  General information about your Business
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="business_display_name"
                    >
                      Name
                    </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="business_display_name"
                      name="business_display_name"
                      className="form-input w-full"
                      value={values.business_display_name}
                      type="text"
                      autoComplete="business name"
                      placeholder="Rocketship"
                    />
                  </div>
                </div>

                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="md:w-4/5">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="email"
                      name="email"
                      value={values.email}
                      className="form-input w-full"
                      type="email"
                      autoComplete="email"
                      placeholder="romeo@reoplex.com"
                    />
                  </div>
                  <div className="md:w-4/5">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      className="form-input w-full"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="tel"
                      autoComplete="phone"
                      placeholder="+233246493078"
                    />
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-xl leading-snug text-gray-700 font-bold mb-1">
                  Legal Details
                </h2>
                <div className="text-sm">
                  Registration information about your business.
                  <br /> Only fill this if your business is registered.
                  <br /> The address you use here will appear on your invoices
                </div>

                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="business_name"
                    >
                      Legal Name
                    </label>
                    <input
                      id="business_name"
                      name="business_name"
                      value={values.business_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-input w-full"
                      type="text"
                      placeholder="Rocketship LLC."
                    />
                  </div>
                </div>
                {/* TODO: make this location search */}
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="address.street"
                    >
                      Street Address
                    </label>
                    <input
                      id="address.street"
                      name="address.street"
                      className="form-input w-full"
                      value={values.address.street}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      autoComplete="street-address"
                      placeholder="8th Street"
                    />
                  </div>
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="md:w-4/5">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="address.country"
                    >
                      Country
                    </label>
                    <select
                      id="address.country"
                      name="address.country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address.country}
                      autoComplete="country"
                      className="form-select block w-full"
                    >
                      <option value="">Please Select</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Rewanda">Rwanda</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                    </select>
                  </div>
                  <div className="md:w-4/5">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="address.city"
                    >
                      City
                    </label>
                    <input
                      id="address.city"
                      value={values.address.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="address.city"
                      className="form-input w-full"
                      type="text"
                      placeholder="Accra"
                    />
                  </div>
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="province"
                    >
                      Province or Region
                    </label>
                    <input
                      id="address.province"
                      name="address.province"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-input w-full"
                      type="text"
                      value={values.address.province}
                      autoComplete="region"
                      placeholder="Greater Accra"
                    />
                  </div>
                  {/* <div className="sm:w-1/3">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="post-code"
                    >
                      Digital Address/Postal code
                    </label>
                    <input
                      id="post-code"
                      className="form-input w-full"
                      type="text"
                      autoComplete="postal-code"
                      placeholder="G7HSED23"
                    />
                  </div> */}
                </div>
              </section>
              {/* Currency */}
              <section>
                <h2 className="text-xl leading-snug text-gray-700 font-bold mb-1">
                  Currency
                </h2>
                <div className="text-sm">
                  This is the primary currency your products will be sold in
                  {/* <br /> You can enable more currencies later.{' '} */}
                  <br />
                  <b>
                    Multi currency is enabled for all stores by default and
                    exchange rates may apply
                  </b>
                  .
                  <br /> Primary currency cannot be changed after first sale
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="md:w-4/5">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="currency.iso_code"
                    >
                      Currency
                    </label>
                    <select
                      id="currency.iso_code"
                      name="currency.iso_code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.currency.iso_code}
                      className="form-select w-full"
                      placeholder="GHS"
                      disabled={hasSale}
                    >
                      <option value="">Please select</option>
                      <option value="GHS">GHS</option>
                      <option value="NGN">NGN</option>
                      <option value="ZAR">ZAR</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
            {/* Panel footer */}
            <footer>
              <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                <div className="flex self-end">
                  <button className="btn border-teal-600 hover:border-gray-700 text-gray-600 bg-white">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={e => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className="btn bg-purple-600 bg-opacity-100 rounded  text-white ml-3"
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
  );
}

export default StorePanel;
