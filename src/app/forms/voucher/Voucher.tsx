import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import moment from 'moment';
import { Loader } from 'app/components/Loader';

import { discountOptions } from 'app/services/options-loaders';
import { useAtom } from 'jotai';
import { shopAtom } from 'store/shop';
import { VoucherType } from 'app/models/voucher/voucher';
import { request, ResponseError } from 'utils/request';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { VoucherSetType } from 'app/models/voucher/voucherset';
import { fortressURL } from 'app/endpoints/urls';
import AsyncCreatableSelect from 'react-select/async-creatable';

// animated components for react select
// const defaultCurrency = 'GHS';

const VoucherForm = ({ handleShow, id, codeType }) => {
  const queryClient = useQueryClient();
  const [shop] = useAtom(shopAtom);
  const vRequestURL = `${fortressURL}/shops/${shop?.shop_id}/vouchers`;
  const vsRequestURL = `${fortressURL}/shops/${shop?.shop_id}/voucher-sets`;

  // query for getting the voucher
  const { data: voucher, isLoading: isVoucherLoading } = useQuery<VoucherType>(
    ['voucher', id],
    async () => await request(`${vRequestURL}/${id}`),
    {
      // The query will not execute until the id exists
      enabled: !!id && codeType === 'single',
      keepPreviousData: true,
    },
  );

  // query for getting the voucher set
  const { data: voucherSet, isLoading: isVoucherSetLoading } =
    useQuery<VoucherType>(
      ['voucherset', id],
      async () => await request(`${vsRequestURL}/${id}`),
      {
        // The query will not execute until the id exists
        enabled: !!id && codeType === 'multi',
        keepPreviousData: true,
      },
    );

  // create the voucher
  const { mutate: createVoucher } = useMutation(
    (payload: VoucherType) =>
      request(vRequestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newVoucher: VoucherType) => {
        // setCollectionId(newCollection.collection_id);
        queryClient.setQueryData(['voucher', id], newVoucher);
      },
      onError: (e: ResponseError) => {},
    },
  );

  // update the voucher
  const { mutate: updateVoucher } = useMutation(
    (payload: VoucherType) =>
      request(`${vRequestURL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newVoucher: VoucherType) => {
        // setCollectionId(newCollection.collection_id);
        queryClient.setQueryData(['voucher', id], newVoucher);
      },
      onError: (e: ResponseError) => {},
    },
  );

  // create the voucherset
  const { mutate: createVoucherSet } = useMutation(
    (payload: VoucherSetType) =>
      request(vsRequestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newVoucherSet: VoucherSetType) => {
        queryClient.setQueryData(['voucherset', id], newVoucherSet);
      },
      onError: (e: ResponseError) => {},
    },
  );

  // update the voucherset
  const { mutate: updateVoucherSet } = useMutation(
    (payload: VoucherSetType) =>
      request(`${vsRequestURL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newVoucherSet: VoucherSetType) => {
        queryClient.setQueryData(['voucherset', id], newVoucherSet);
      },
      onError: (e: ResponseError) => {},
    },
  );

  return (
    <>
      {isVoucherLoading || isVoucherSetLoading ? (
        <Loader />
      ) : (
        <div>
          <Formik
            initialValues={{
              name: '',
              description: '',
              start_date: '',
              start_time: '',
              end_date: '',
              end_time: '',
              discount: null,
              code_type: 'single',
              code: '',
              code_usage: '',
              code_length: 6,
              number_of_codes: 1,
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (voucher || voucherSet) {
                if (values.code_type === 'single') {
                  updateVoucher({
                    ...voucher,
                    ...values,
                    voucher_id: id,
                    start_datetime: moment(
                      values.start_date + ' ' + values.start_time,
                    ).toISOString(),
                    end_datetime: moment(
                      values.end_date + ' ' + values.end_time,
                    ).toISOString(),
                  });
                } else {
                  updateVoucherSet({
                    ...voucherSet,
                    ...values,
                    set_id: id,
                    start_datetime: moment(
                      values.start_date + ' ' + values.start_time,
                    ).toISOString(),
                    end_datetime: moment(
                      values.end_date + ' ' + values.end_time,
                    ).toISOString(),
                  });
                }
              } else {
                if (values.code_type === 'single') {
                  createVoucher({
                    ...values,
                    voucher_id: '',
                    start_datetime: moment(
                      values.start_date + ' ' + values.start_time,
                    ).toISOString(),
                    end_datetime: moment(
                      values.end_date + ' ' + values.end_time,
                    ).toISOString(),
                  });
                } else {
                  createVoucherSet({
                    ...values,
                    set_id: '',
                    start_datetime: moment(
                      values.start_date + ' ' + values.start_time,
                    ).toISOString(),
                    end_datetime: moment(
                      values.end_date + ' ' + values.end_time,
                    ).toISOString(),
                  });
                }
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6">
                  <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
                    <section className="rounded bg-white shadow overflow-hidden p-3">
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            className="form-input w-full"
                            type="text"
                            autoComplete="name"
                            placeholder="X-mas Sales"
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
                            theme="snow"
                            id="description"
                            onChange={e => setFieldValue('description', e)}
                            value={values.description}
                            style={{
                              maxHeight: '14rem',
                            }}
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                  <div>
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
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
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="discount"
                          >
                            Tags
                          </label>
                          <AsyncCreatableSelect
                            id="discount"
                            name="discount"
                            closeMenuOnSelect={true}
                            defaultValue={values.discount}
                            value={values.discount}
                            isClearable
                            isSearchable
                            menuPortalTarget={document.body}
                            onChange={option =>
                              setFieldValue('discount', option)
                            }
                            // isDisabled={isAddingInProgress}
                            loadOptions={discountOptions(shop?.shop_id!)}
                            // onCreateOption={onCreateOption}

                            // styles={{
                            //   input: base => ({
                            //     ...base,
                            //     'input:focus': {
                            //       boxShadow: 'none',
                            //     },
                            //   }),
                            //   ...colourStyles,
                            // }}
                            className="w-full"
                            // cacheUniqs={[cacheUniq]}
                          />
                        </div>
                      </div>
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
                        onClick={e => handleSubmit()}
                        className="btn bg-blue-900 bg-opacity-100 rounded-lg  text-white ml-3"
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
      )}
    </>
  );
};

export default VoucherForm;
