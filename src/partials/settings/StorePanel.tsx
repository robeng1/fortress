import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import Uppy from '@uppy/core';
import { ProgressBar } from '@uppy/react';
import DropTarget from '@uppy/drop-target';
import Transloadit from '@uppy/transloadit';
import '@uppy/status-bar/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/core/dist/style.css';
import { useAtom } from 'jotai';
import { useMutation, useQueryClient } from 'react-query';
import { ShopType } from 'models/settings/shop-type';
import { request, ResponseError } from 'utils/request';
import { fortressURL } from 'endpoints/urls';
import { UidAtom } from 'store/authorization-atom';
import { toast } from 'react-toastify';
import useShop from 'hooks/use-shop';
import { Loading } from 'components/common/backdrop';

function StorePanel() {
  const queryClient = useQueryClient();
  const { shop } = useShop();
  const [accountId] = useAtom(UidAtom);
  const requestURL = `${fortressURL}/shops`;

  const [image, setImage] = useState(shop?.image);

  const inputFile = useRef<HTMLInputElement>(null);

  // update the shop
  const { mutate: updateShop, isLoading: isUpdatingShop } = useMutation(
    (payload: ShopType) =>
      request(`${requestURL}/${shop?.shop_id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newShop: ShopType) => {
        queryClient.setQueryData(['shop', accountId], newShop);
        toast('Shop data updated succesffully');
      },
      onError: (e: ResponseError) => {
        toast(e.message);
      },
    },
  );

  const onUploadComplete = result => {
    const url = result.successful[0].uploadURL;
    // const fileName = file.name;
    setImage(url);
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
      id: 'shop-image',
      autoProceed: true,
      restrictions: {
        maxFileSize: 15 * 1024 * 1024,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*'],
      },
      onBeforeUpload: files => {
        const updatedFiles = {};
        Object.keys(files).forEach(fileId => {
          updatedFiles[fileId] = {
            ...files[fileId],
            name: `reoplex_${shop?.shop_id || 'shop_demo'}_lo_${
              files[fileId].name
            }`,
          };
        });
        return updatedFiles;
      },
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
        setImage(assembly.results[':original'][0].ssl_url);
      });
  }, []);

  React.useEffect(() => {
    return () => uppy.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleFileUpload = e => {
    const { files } = e.target;
    if (files && files.length) {
      const file = files[0];
      setImage(URL.createObjectURL(file));
      const filename = file.name;
      uppy.addFile({
        data: file,
        name: filename,
      });
    }
  };
  const onChangeClick = () => {
    if (inputFile !== null) {
      inputFile.current?.click();
    }
  };
  return (
    <div>
      <Loading open={isUpdatingShop} />
      <Formik
        enableReinitialize
        initialValues={{
          business_display_name: shop?.business_display_name || '',
          email: shop?.email || '',
          phone: shop?.phone || '',
          business_name: shop?.business_name || '',
          address: {
            street: '',
            city: '',
            area: '',
            province: '',
            country: '',
            ...shop?.address,
          },
          currency: {
            name: '',
            iso_code: 'GHS',
            symbol: '',
            ...shop?.currency,
          },
        }}
        onSubmit={(values, { setSubmitting }) => {
          updateShop({ ...shop, ...values, image });
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
          <div className="flex-grow">
            {/* Panel body */}
            <div className="md:p-6 p-4 space-y-6">
              <h2 className="text-2xl text-gray-800 font-bold mb-5">
                My Store
              </h2>
              {/* Picture */}
              <section>
                <div className="flex items-center">
                  <div className="store-image-upload-progress-indicator"></div>
                  <div className="mr-4 store-image-drop-area">
                    <img
                      className="w-100 h-100"
                      src={image || 'https://via.placeholder.com/150'}
                      width="150"
                      height="150"
                      alt={shop?.business_display_name}
                    />
                    <input
                      style={{ display: 'none' }}
                      ref={inputFile}
                      onChange={handleFileUpload}
                      type="file"
                    />
                    <ProgressBar
                      uppy={uppy}
                      fixed={true}
                      hideAfterFinish={true}
                    />
                  </div>
                  <button
                    onClick={onChangeClick}
                    className="btn-sm bg-purple-600 self-start hover:bg-purple-600 text-white"
                  >
                    Change
                  </button>
                </div>
              </section>
              {/* Business Profile */}
              <section>
                <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
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
                <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
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
                      <option value="GH">Ghana</option>
                      <option value="NG">Nigeria</option>
                      <option value="RW">Rwanda</option>
                      <option value="KY">Kenya</option>
                      <option value="SA">South Africa</option>
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
                <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">
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
                    >
                      <option value="">Please select</option>
                      <option value="GHS">GHS</option>
                      <option value="NGN">NGN</option>
                      <option value="ZAR">ZAR</option>
                      <option value="RWF">RWF</option>
                      <option value="UGX">UGX</option>
                      <option value="KES">KES</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
            {/* Panel footer */}
            <footer>
              <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                <div className="flex self-end">
                  <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={e => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className="btn bg-purple-600 bg-opacity-100 rounded-lg  text-white ml-3"
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
